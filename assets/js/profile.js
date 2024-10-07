import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCVIym8X-GDRx6_1256dtVZdo3hIm7TRgI",
    authDomain: "flipper-hack.firebaseapp.com",
    databaseURL: "https://flipper-hack-default-rtdb.firebaseio.com",
    projectId: "flipper-hack",
    storageBucket: "flipper-hack.appspot.com",
    messagingSenderId: "9118741906",
    appId: "1:9118741906:web:d8860d3094a46bafd37d4b",
    measurementId: "G-EYLLFHW5XS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the username from local storage
const storedUsername = localStorage.getItem("username");

// Function to fetch user data
function fetchUserData(username) {
    const userRef = ref(database, `users/${username}`);
    return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // Returns the user data
        } else {
            console.error("No user data found.");
            return null; // Ensure null is returned
        }
    }).catch((error) => {
        console.error("Error fetching user data: ", error);
        return null; // Ensure null is returned on error
    });
}

// Function to fetch user data for all members
let membersRef;
function fetchAllMembersData() {
    membersRef = ref(database, 'users'); // Reference to the users node
    return get(membersRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val(); // Returns all users data
        } else {
            console.error("No members data available");
            return null; // Ensure null is returned
        }
    }).catch((error) => {
        console.error("Error fetching members data: ", error);
        return null; // Ensure null is returned on error
    });
};
fetchAllMembersData()
console.log(membersRef)

// Function to handle fetching user data on page load
window.onload = () => {
    fetchUserData(storedUsername).then(userData => {
        if (userData) {
            // Do something with the user data
            console.log("User Data: ", userData);
            document.getElementById("firstnameNlastname")
                .innerHTML = `${userData.firstName} ${userData.lastName}`
            document.getElementById("userName")
                .innerHTML = userData.username
            document.getElementById("security-code")
                .innerHTML = userData.securityCode
        }
    });
    // Fetch all members data and display it on page load
    window.onload = () => {
        fetchAllMembersData().then(membersData => {
            if (membersData) {
                displayMembersData(membersData);
            }
        });
    };
};

// Chat icon dropdown functionality
const chatIcon = document.getElementById('chatIcon');
const chatDropdown = document.getElementById('chatDropdown');

chatIcon.addEventListener('click', () => {
    const isExpanded = chatIcon.getAttribute('aria-expanded') === 'true';
    chatIcon.setAttribute('aria-expanded', !isExpanded);
    chatDropdown.style.display = isExpanded ? 'none' : 'block';
});

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!chatIcon.contains(event.target)) {
        chatDropdown.style.display = 'none';
    }
});

// Edit Profile button functionality
document.getElementById('editProfileBtn').addEventListener('click', () => {
    alert("Edit Profile functionality will go here.");
});
