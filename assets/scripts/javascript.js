// Yearly Apple WWDC Countdown Timer

// June 6th 2022 @ 10:00am PST
const wwdcdate = new Date(Date.UTC(2022, 5, 6, 10, 0, 0))
// const wwdcdate = new Date().getTime()

const day = document.querySelectorAll('.day')
const daytext = document.querySelectorAll('.daytext')
const hour = document.querySelectorAll('.hour')
const hourtext = document.querySelectorAll('.hourtext')
const minute = document.querySelectorAll('.minute')
const minutetext = document.querySelectorAll('.minutetext')
const second = document.querySelectorAll('.second')
const secondtext = document.querySelectorAll('.secondtext')
const timecontainer = document.querySelectorAll('.timecontainer')
const now = new Date().getTime()

// Find the distance between now and the count down date
const distance = wwdcdate - now

// Time calculations for days, hours, minutes and seconds
const days = Math.floor(distance / (1000 * 60 * 60 * 24))
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
const seconds = Math.floor((distance % (1000 * 60)) / 1000)

// Display the result with foreach loop innerHTML
day.forEach(function (item) {
    item.innerHTML = days
})
daytext.forEach(function (item) {
    item.innerHTML = days === 1 ? 'day' : 'days'
})
hour.forEach(function (item) {
    item.innerHTML = hours
})
hourtext.forEach(function (item) {
    item.innerHTML = hours === 1 ? 'hour' : 'hours'
})
minute.forEach(function (item) {
    item.innerHTML = minutes
})
minutetext.forEach(function (item) {
    item.innerHTML = minutes === 1 ? 'minute' : 'minutes'
})
second.forEach(function (item) {
    item.innerHTML = seconds
})
secondtext.forEach(function (item) {
    item.innerHTML = seconds === 1 ? 'second' : 'seconds'
})

// day.innerHTML = days
// daytext.innerHTML = days === 1 ? 'day' : 'days'
// hour.innerHTML = hours
// hourtext.innerHTML = hours === 1 ? 'hour' : 'hours'
// minute.innerHTML = minutes
// minutetext.innerHTML = minutes === 1 ? 'minute' : 'minutes'
// second.innerHTML = seconds
// secondtext.innerHTML = seconds === 1 ? 'second' : 'seconds'

// If the count down is finished, write some text
if (distance < 0) {
    clearInterval(x)
    timecontainer.innerHTML =
        '<a href="https://www.apple.com/apple-events/" class="underline underline-offset-2 text-3xl text-gray-200">LIVE NOW AT APPLE.COM</a>'
}

// Update the count down every half of a second
const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime()

    // Find the distance between now and the count down date
    const distance = wwdcdate - now

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result with foreach loop innerHTML
    day.forEach(function (item) {
        item.innerHTML = days
    })
    daytext.forEach(function (item) {
        item.innerHTML = days === 1 ? 'day' : 'days'
    })
    hour.forEach(function (item) {
        item.innerHTML = hours
    })
    hourtext.forEach(function (item) {
        item.innerHTML = hours === 1 ? 'hour' : 'hours'
    })
    minute.forEach(function (item) {
        item.innerHTML = minutes
    })
    minutetext.forEach(function (item) {
        item.innerHTML = minutes === 1 ? 'minute' : 'minutes'
    })
    second.forEach(function (item) {
        item.innerHTML = seconds
    })
    secondtext.forEach(function (item) {
        item.innerHTML = seconds === 1 ? 'second' : 'seconds'
    })

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x)
        timecontainer.innerHTML =
            '<a href="https://www.apple.com/apple-events/" class="underline underline-offset-2 text-3xl text-gray-200">LIVE NOW AT APPLE.COM</a>'
    }
}, 500)

setTimeout(function () {
    const skeletonLoader = document.querySelectorAll('.animate-pulse')
    skeletonLoader.forEach(function (element) {
        element.classList.remove('animate-pulse')
    })
}, 500)

// if (!window.location.href.includes('wwdc.mrgigi.me')) {
//     window.location.href = 'https://wwdc.mrgigi.me/'
// }
