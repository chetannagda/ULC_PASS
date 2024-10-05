// // Import Firebase SDK (assuming you're using Firebase v9+)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { getFirestore, collection, getDoc, serverTimestamp, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
// // import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"; // Import storage functions

// // Replace with your actual Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD0R5K1FuXOhaVjzzCqNov9DR2CYNqigqc",
//     authDomain: "ticketbookingwebsite.firebaseapp.com",
//     projectId: "ticketbookingwebsite",
//     storageBucket: "ticketbookingwebsite.appspot.com",
//     messagingSenderId: "1032821918724",
//     appId: "1:1032821918724:web:48a077982a965f41387951",
//     measurementId: "G-B9J3ZFG7X3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// // const storage = getStorage(app); // Initialize Firebase Storage

// // Define constants for collection names
// const COLLECTION_CONTACTS = 'contacts';
// const COLLECTION_PAYMENTS = 'payments';

// export async function saveContactDetails(name, passes, mobile) {
//     // Validate inputs
//     if (!name || !passes || !mobile) {
//         throw new Error("Please provide all required fields: name, passes, and mobile.");
//     }
//     const userData = {
//         name: name,
//         passes: passes,
//         mobile: mobile,
//         timestamp: serverTimestamp() // Store server timestamp
//       };

//       const userRef = doc(db, COLLECTION_CONTACTS, mobile);

//       setDoc(userRef, userData)
//       .then(() => {
//         console.log("Document successfully written with phone number as ID!");
//         return docRef.id;  // Return the document ID if the addition was successful
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
// }



// export async function savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid) {
//     // Validate inputs
//     if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
//         throw new Error("Please provide all required fields: name, amountPaid, dateOfPasses, and contactNumber.");
//     }
//     if (upirefid.length !== 12){
//         alert("Please enter a valid UPI Ref ID");
//         throw new Error("Please provide a valid UPI Ref ID.");
//     }


//     // Save payment details to Firestore
//     const userData = {
//         name: name,
//         amountPaid: parseFloat(amountPaid), // Ensure amount is stored as a float
//         dateOfPasses: dateOfPasses,
//         contactNumber: contactNumber,
//         upirefid: upirefid,
//         // receiptUrl: receiptUrl, // Store the URL of the uploaded receipt
//         timestamp: serverTimestamp() // Store server timestamp
//       };

//       const userRef = doc(db, COLLECTION_PAYMENTS,upirefid);
//       getDoc(userRef)
//       .then((docSnapshot) => {
//         if (docSnapshot.exists()) {
//           // Document with this phone number already exists
//           alert("A response with this phone number already exists.");
//         //   console.error("Error: A response with this phone number already exists.");
//           return doc.id;  // Return the document ID if the addition was successful
//           // Handle the error (e.g., show message to user)
//         } else {
//             setDoc(userRef, userData)
//             .then(() => {
//             document.getElementById('paymentForm').classList.add('hidden');
//             document.getElementById('thankYouMessage').classList.remove('hidden');
//             return upirefid;  // Return the UPI ref ID when successful
//             })
//             .catch((error) => {
//             // console.error("Error writing document: ", error);
//             });
//         }
//     })
      
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDoc, serverTimestamp, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD0R5K1FuXOhaVjzzCqNov9DR2CYNqigqc",
    authDomain: "ticketbookingwebsite.firebaseapp.com",
    projectId: "ticketbookingwebsite",
    storageBucket: "ticketbookingwebsite.appspot.com",
    messagingSenderId: "1032821918724",
    appId: "1:1032821918724:web:48a077982a965f41387951",
    measurementId: "G-B9J3ZFG7X3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION_CONTACTS = 'contacts';
const COLLECTION_PAYMENTS = 'payments';
const COLLECTION_COD = 'cod';

export async function saveContactDetails(name, passes, mobile) {
    if (!name || !passes || !mobile) {
        throw new Error("Please provide all required fields: name, passes, and mobile.");
    }
    const userData = {
        name: name,
        passes: passes,
        mobile: mobile,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_CONTACTS, mobile);

    try {
        await setDoc(userRef, userData);
        console.log("Document successfully written with phone number as ID!");
        return userRef.id;
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
}

export async function savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid) {
    if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
        throw new Error("Please provide all required fields: name, amountPaid, dateOfPasses, and contactNumber.");
    }
    if (upirefid.length !== 12) {
        throw new Error("Please provide a valid UPI Ref ID.");
    }

    const userData = {
        name: name,
        amountPaid: parseFloat(amountPaid),
        dateOfPasses: dateOfPasses,
        contactNumber: contactNumber,
        upirefid: upirefid,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_PAYMENTS, upirefid);
    
    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            throw new Error("A response with this UPI Ref ID already exists.");
        } else {
            await setDoc(userRef, userData);
            return upirefid;
        }
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
}

export async function saveCODDetails(name, amountToPay, dateOfPasses, contactNumber) {
    if (!name || !amountToPay || !dateOfPasses || !contactNumber) {
        throw new Error("Please provide all required fields: name, amountToPay, dateOfPasses, and contactNumber.");
    }

    const userData = {
        name: name,
        amountToPay: parseFloat(amountToPay),
        dateOfPasses: dateOfPasses,
        contactNumber: contactNumber,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_COD, contactNumber);
    
    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            throw new Error("A COD order with this contact number already exists.");
        } else {
            await setDoc(userRef, userData);
            return contactNumber;
        }
    } catch (error) {
        console.error("Error writing COD document: ", error);
        throw error;
    }
}
