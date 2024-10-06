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
