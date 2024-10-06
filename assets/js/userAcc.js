import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const username = localStorage.getItem("username");
let userData;

// Function to retrieve user data
function fetchUserData(username) {
    const databaseRef = ref(database);
    get(child(databaseRef, `users/${username}`)) // Assuming your users are stored under "users"
        .then((snapshot) => {
            if (snapshot.exists()) {
                 userData = snapshot.val();
                updateUserInfo(userData);
            } else {
                console.error("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data: ", error);
        });
}

// Function to update the DOM with user information
function updateUserInfo(userData) {
    // Update the username and security code in the DOM
    const welcomeMsgUserName = document.querySelector(".Welcome-message .userName");
    const userDetailName = document.querySelector(".user-detail h1")
    const securityCodeElement = document.querySelector(".security-code");

    userDetailName.innerHTML = `${userData.firstName} ${userData.lastName}`; // Assuming username is stored in the user data
    welcomeMsgUserName.innerHTML = `${userData.firstName} ${userData.lastName}`; // Assuming username is stored in the user data
}

// Function to fetch user data
function fetchMembers() {
    const databaseRef = ref(database);
    console.log("Fetching members from:", `users`); // Log the path being fetched
    get(child(databaseRef, `users`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                console.log("Users data:", usersData); // Log the retrieved users data
                
                // Get the number of members and their names
                const memberNames = Object.keys(usersData).map(username => {
                    return usersData[username].firstName + ' ' + usersData[username].lastName;
                });
                
                updateMemberInfo(memberNames);
            } else {
                console.error("No members data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching members data: ", error);
        });
}

// Function to update the DOM with member information
function updateMemberInfo(memberNames) {
    // Update the members count
    const membersCountElement = document.querySelector('.hack-members h1');
    membersCountElement.innerHTML = `${memberNames.length} Members`;

    // Update the member names in the DOM
    const membersContainer = document.querySelector('.hack-members');
    membersContainer.innerHTML = ''; // Clear existing member names

    memberNames.forEach(name => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member';
        memberDiv.innerHTML = `<i class="fa-solid fa-user-tie"></i><h3>${name}</h3>`;
        membersContainer.appendChild(memberDiv);
    });
}

// Fetch members data when the page loads
window.onload = () => {
    fetchMembers();
    fetchUserData(username);
};





document.querySelector('.user-detail .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.user-detail .code')
            .innerHTML = `${userData.securityCode} <i class="fa-solid fa-eye-slash"></i>`;
    });
document.querySelector('.user .fa-eye')
    .addEventListener('click', () => {
        document.querySelector('.databse-info .code')
            .innerHTML = `${userData.securityCode} <i class="fa-solid fa-eye-slash"></i>`;
    });
