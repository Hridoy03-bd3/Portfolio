document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    const savedDataDiv = document.getElementById('savedData');

    // Helper: Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Show saved data if exists
    function showSavedData() {
        const saved = localStorage.getItem('contactForm');
        if (saved) {
            const data = JSON.parse(saved);
            savedDataDiv.innerHTML = `
                <div class="font-semibold mb-2">Last Submitted:</div>
                <div><strong>Name:</strong> ${data.name}</div>
                <div><strong>Email:</strong> ${data.email}</div>
                <div><strong>Message:</strong> ${data.message}</div>
            `;
            savedDataDiv.classList.remove('hidden');
        }
    }
    showSavedData();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorMsg.classList.add('hidden');
        successMsg.classList.add('hidden');
        savedDataDiv.classList.add('hidden');

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // Validation
        if (!name || !email || !message) {
            errorMsg.textContent = "All fields are required.";
            errorMsg.classList.remove('hidden');
            return;
        }
        if (!isValidEmail(email)) {
            errorMsg.textContent = "Please enter a valid email address.";
            errorMsg.classList.remove('hidden');
            return;
        }

        // Save to localStorage
        localStorage.setItem('contactForm', JSON.stringify({ name, email, message }));

        // Show success message
        successMsg.classList.remove('hidden');
        form.reset();

        // Show saved data
        showSavedData();
    });
});