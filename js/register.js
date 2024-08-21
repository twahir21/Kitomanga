const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const navLinks = document.getElementById("navLinks");
        
function openNav () {
    document.getElementById("open").style.display = "none";
    navLinks.classList.remove("hide");
    navLinks.classList.add("show");
    document.querySelector(".menu").classList.add("visible");

}

function closeNav () {
    document.getElementById("open").style.display = "flex";
    navLinks.classList.remove("show");
    navLinks.classList.add("hide");
    document.querySelector(".menu").classList.remove("visible");
}
// Toggle forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Password visibility toggle
const togglePasswordVisibility = (toggleButtonId, passwordFieldId) => {
    const toggleButton = document.getElementById(toggleButtonId);
    const passwordField = document.getElementById(passwordFieldId);

    toggleButton.addEventListener('click', () => {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        toggleButton.classList.toggle('fa-eye');
        toggleButton.classList.toggle('fa-eye-slash');
    });
};

togglePasswordVisibility('toggle-signup-password', 'signup-password');
togglePasswordVisibility('toggle-confirm-password', 'confirm-password');
togglePasswordVisibility('toggle-login-password', 'login-password');


// Utility functions for validation
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePhone = (phone) => {
    const regex = /^\+?(971|255|254|256|86)?[1-9][0-9]{8}$/;
    return regex.test(phone);
};

const validatePassword = (password) => {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; password of complex
    // return regex.test(password);
    return password.length >= 8;
};

const validateUsername = (Username) => {
    // Allow letters, numbers, and underscores; between 3 and 15 characters long
    // const regexUser = /^(?!.*[_]{2})[a-zA-Z0-9_]{3,15}$/; no spaces
    const regexUser = /^(?!.*[_]{2})[a-zA-Z0-9_ ]{3,15}$/;
    return regexUser.test(Username);
}


// Validate user inputs
const validateInputs = (Username, email, phone, password, confirmPassword) => {
    if (!Username.trim()) {
        Swal.fire("Invalid Input", "Name cannot be empty", "error");
        return false;
    }
    if (!validateUsername(Username)) {
        Swal.fire("Invalid Input", "Please enter a correct name with less than 15 characters with no space, no multiple underscores but allowed numbers", "error");
        return false;
    }
    if (!validateEmail(email)) {
        Swal.fire("Invalid Input", "Please enter a valid email address", "error");
        return false;
    }
    if (!validatePhone(phone)) {
        Swal.fire("Invalid Input", "Please enter a valid phone number", "error");
        return false;
    }
    if (!validatePassword(password)) {
        Swal.fire("Invalid Input", "Password must be at least 8 characters long", "error");
        return false;
    }
    if (password !== confirmPassword) {
        Swal.fire("Mismatch?", "Your passwords do not match", "question");
        return false;
    }
    return true;
};

// Form submission handling
document.getElementById('sign-up-button').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!validateInputs(name, email, phone, password, confirmPassword)) {
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, password }),
        });

        const result = await response.text();
        if (response.ok) {
            sessionStorage.setItem('userEmail', email);
            Swal.fire({
                title: "Success!",
                text: result,
                icon: "success"
            }).then(() => {
                window.location.href = '../otp.html'; // Redirect to OTP verification page
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to sign up",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});


document.getElementById('sign-in-button').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.text();
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: result,
                icon: "success"
            }).then(() => {
                window.location.href = '../shop-in'; 
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: result,
                icon: "error"
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: "Error!",
            text: 'Failed to sign in',
            icon: "error"
        });
    }
});

document.getElementById('verify-otp-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const otp = document.getElementById('otp').value;
    const email = document.getElementById('signup-email').value; // Make sure email is stored from sign-up

    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        const result = await response.text();
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: result,
                icon: "success"
            }).then(() => {
                window.location.href = '/login'; // Redirect to login page or wherever appropriate
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to verify OTP",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});


