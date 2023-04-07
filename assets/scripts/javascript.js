// Automatic Apple Event Countdown Timer

// ------------------------------------------------------------
// Time until Apple Event
// ------------------------------------------------------------

/* 
Scrape the Apple Events https://www.apple.com/apple-events/ page for the calendar link to get the date of the next event
The calendar link is in the format of https://events.apple.com/services/public/params/ical?summary=Apple+Event&location=https://www.apple.com/apple-events/event-stream/&storeUrl=https://www.apple.com/apple-events/event-stream/&timeZone=America/Los_Angeles&startDate=07/09/202210:00:00&endDate=07/09/202212:00:00&descriptionHeader=Please+join+us+for+a+special+Apple+Event+broadcasting+from+Apple+Park.+Watch+it+online+at+apple.com
Find data-analytics-title="add to your calendar" and get the href attribute
CORS issue, use https://proxy.cors.sh/ to bypass CORS
*/

async function getAppleEventsCalLink() {
  const response = await fetch("https://proxy.cors.sh/https://www.apple.com/apple-events/");
  const data = await response.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(data, "text/html");
  const calendarLink = html.querySelector('a[data-analytics-title="add to your calendar"]').href;
  //   Save the calendar link to local storage so we don't have to scrape the page every time for a week
  localStorage.setItem("calendarLink", calendarLink);
  localStorage.setItem("calendarLinkDate", new Date());
  return calendarLink;
}

// Get the date from the calendar link and convert it to UTC time and return it
function getAppleEventDate() {
  const calendarLink = localStorage.getItem("calendarLink");
  const calendarLinkDate = localStorage.getItem("calendarLinkDate");
  const currentDate = new Date();
  // If the calendar link is older than a week, scrape the page again
  if (currentDate - new Date(calendarLinkDate) > 604800000) {
    getAppleEventsCalLink();
  }
  //   Get the date from the calendar link as a string
  const appleEventDate = calendarLink.split("startDate=")[1].split("&")[0];
  // Replace the slashes with dashes
  const appleEventDay = appleEventDate.slice(0, 2);
  const appleEventMonth = appleEventDate.slice(3, 5);
  const appleEventYear = appleEventDate.slice(6, 10);

  // Convert the date from America/Los_Angeles timezone to GMT timezone
  const appleEventDateGMT = new Date(
    `${appleEventYear}-${appleEventMonth}-${appleEventDay}T${appleEventDate.slice(10)}-07:00` // America/Los_Angeles timezone
  ).toUTCString();

  return appleEventDateGMT;
}

const day = document.querySelectorAll(".day");
const daytext = document.querySelectorAll(".daytext");
const hour = document.querySelectorAll(".hour");
const hourtext = document.querySelectorAll(".hourtext");
const minute = document.querySelectorAll(".minute");
const minutetext = document.querySelectorAll(".minutetext");
const second = document.querySelectorAll(".second");
const secondtext = document.querySelectorAll(".secondtext");
const timecontainer = document.querySelectorAll(".timecontainer");

// Update the count down every half of a second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = new Date(getAppleEventDate()).getTime() - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result with foreach loop innerHTML
  day.forEach(function (item) {
    item.innerHTML = days;
  });
  daytext.forEach(function (item) {
    item.innerHTML = days === 1 ? "day" : "days";
  });
  hour.forEach(function (item) {
    item.innerHTML = hours;
  });
  hourtext.forEach(function (item) {
    item.innerHTML = hours === 1 ? "hour" : "hours";
  });
  minute.forEach(function (item) {
    item.innerHTML = minutes;
  });
  minutetext.forEach(function (item) {
    item.innerHTML = minutes === 1 ? "minute" : "minutes";
  });
  second.forEach(function (item) {
    item.innerHTML = seconds;
  });
  secondtext.forEach(function (item) {
    item.innerHTML = seconds === 1 ? "second" : "seconds";
  });

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    timecontainer.innerHTML = '<a href="https://www.apple.com/apple-events/" class="underline underline-offset-2 text-3xl text-gray-200">LIVE NOW AT APPLE.COM</a>';
  }
}, 150);

// ------------------------------------------------------------
// Background image
// ------------------------------------------------------------

// Get the hero-image background image url from https://www.apple.com/v/apple-events/home/x/built/styles/overview.built.css

async function getBackgroundImage() {
  const response = await fetch("https://proxy.cors.sh/https://www.apple.com/v/apple-events/home/x/built/styles/overview.built.css");
  const data = await response.text();
  console.log(data);
  //   Find the background image url ".hero-image{background-image:url"
  const backgroundImage = "https://apple.com" + data.split(".hero-image{background-image:url(")[1].split(")")[0];
  console.log(backgroundImage);
  //   Save the background image url to local storage so we don't have to scrape the page every time for a week
  localStorage.setItem("backgroundImage", backgroundImage);
  localStorage.setItem("backgroundImageDate", new Date());
  return backgroundImage;
}

// Set the background image to the background image from local storage
// id is backgroundImage
// use style attribute to set the background image
const backgroundImage = localStorage.getItem("backgroundImage");
const backgroundImageDate = localStorage.getItem("backgroundImageDate");
const currentDate = new Date();
// If the background image is older than a week, scrape the page again
if (currentDate - new Date(backgroundImageDate) > 604800000) {
  getBackgroundImage();
}

if (backgroundImage !== null) {
  setTimeout(function () {
    document.getElementById("backgroundImage").style.backgroundImage = `url(${backgroundImage})`;
    document.getElementById("backgroundImage").innerHTML = "";
  }, 5000);
}
