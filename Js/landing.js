document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (Oct 3, 2024 at 7:00:00 PM IST)
    const countDownDate = new Date("Oct 3, 2024 19:00:00 GMT+0530").getTime();

    // Update the countdown every 1 second
    const x = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with corresponding id
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".timer").innerHTML = "The event has started!";
        }
    }, 1000);

    // Function to update current IST date and time
    function updateISTDateTime() {
        const now = new Date();
        const istTime = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);

        // Format options for date and time
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        const formattedDateTime = istTime.toLocaleString('en-US', options);
        document.getElementById("event-date").textContent = `📅 ${formattedDateTime} IST`;
    }

    // Update IST date and time every second
    setInterval(updateISTDateTime, 1000);

    // Initial call to display time immediately
    updateISTDateTime();

    // Add click event to the booking button
    // document.querySelector('.book-ticket').addEventListener('click', function() {
    //     window.location.href = '../bookticket.html';
    // });
});
