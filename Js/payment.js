import { savePaymentDetails } from './firebaseApi.js';

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);

const name = urlParams.get('name');
const persons = parseInt(urlParams.get('persons')) || 1;
const amount = persons * 300;
const date = urlParams.get('date');
const contactNumber = urlParams.get('contact');

// Format date
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const formattedDate = formatDate(date);

// Set initial values
document.getElementById('userName').textContent = name;
document.getElementById('amountToPay').textContent = amount;
document.getElementById('passDate').textContent = formattedDate;
document.getElementById('name').value = name;
document.getElementById('amount').value = amount;
document.getElementById('contactNumberInput').value = contactNumber;
document.getElementById('confirmationDate').textContent = formattedDate;
document.getElementById('confirmationContact').textContent = contactNumber;
document.getElementById('passDateInput').value = formattedDate;
// document.getElementById('refidinput').value = 0;

// Timer functionality
let timeLeft = 120; 
const timerElement = document.getElementById('timer');

const timerInterval = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    showPaymentForm();
  }
  timeLeft--;
}, 1000);

// Button event listeners
document.getElementById('paidBtn').addEventListener('click', showPaymentForm);
document.getElementById('notPaidBtn').addEventListener('click', () => window.location.href = 'index.html');
// document.getElementById('submitBtn').addEventListener('click', handleSubmit);

function showPaymentForm() {
  document.getElementById('qrSection').classList.add('hidden');
  document.getElementById('paymentForm').classList.remove('hidden');
  clearInterval(timerInterval);
}
    const thankYouMessage = document.getElementById('thankYouMessage');

    document.getElementById('paymentForm').addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission

        // Retrieve form data
        var name = document.getElementById('name').value;
        var amountPaid =  document.getElementById('amount').value; 
        let dateOfPasses =  document.getElementById('passDateInput').value;
        var contactNumber = document.getElementById('contactNumberInput').value;
        var upirefid = document.getElementById('upirefid').value;
        

        // Validate form data
        if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
            alert('Please fill in all fields.');
            return;
        }

        try {
             // Call the function to save contact details in Firestore
            const docId = await savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid);
            
        } catch (error) {
            // console.error('Error adding document:', error);
            // alert('Error submitting your form. Please try again later.');
        }
    });
