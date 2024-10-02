document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('bookingForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const persons = parseInt(document.getElementById('persons').value);
        const date = document.getElementById('date').value;
        const totalPrice = persons * 300; // Total price (300 per person)

        const ticketNumber = generateTicketNumber(date, persons, totalPrice / 300); // Generate ticket number

        // Redirect to payment.html with the required parameters
        redirectToPayment(name, contact, persons, date, totalPrice, ticketNumber);
    });

    // Function to generate the ticket number
    function generateTicketNumber(date, persons, totalPrice) {
        const eventDate = new Date(date);
        const day = String(eventDate.getDate()).padStart(2, '0');
        const month = String(eventDate.getMonth() + 1).padStart(2, '0');
        const year = String(eventDate.getFullYear()).slice(-2);

        const ticketDay = `${day}${month}`;
        const ticketDate = `${year}${persons.toString().padStart(2, '0')}`;
        const ticketAmount = totalPrice.toString().padStart(4, '0');

        return `${ticketDay}-${ticketDate}-00-${ticketAmount}`;
    }

    // Function to redirect to payment.html
    function redirectToPayment(name, contact, persons, date, totalPrice, ticketNumber) {
        const url = `payment.html?name=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}&persons=${persons}&date=${date}&totalPrice=${totalPrice}&ticketNumber=${ticketNumber}`;
        window.location.href = url;
    }
});
