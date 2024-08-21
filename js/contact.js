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
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usernameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const phoneInput = form.querySelector("input[name='phone']");
    const messageInput = form.querySelector("textarea[name='message']");

    // Validation patterns
    const usernamePattern = /^(?!.*[-_]{2})(?!.*[ \-_]{2})[a-zA-Z0-9][a-zA-Z0-9-_ ]{2,15}[a-zA-Z0-9]$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^\+?(971|255|254|256|86)?[1-9][0-9]{8}$/;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let isValid = true;

        // Validate Username
        if (!usernamePattern.test(usernameInput.value)) {
            isValid = false;
        }

        // Validate Email
        if (!emailPattern.test(emailInput.value)) {
            isValid = false;
        }

        // Validate Phone
        if (!phonePattern.test(phoneInput.value)) {
            isValid = false;
        }

        // Validate Message Length
        const message = messageInput.value.trim();
        const wordCount = message ? message.split(/\s+/).length : 0;
        if (wordCount > 250 || wordCount === 0) {
            isValid = false;
        }

        if (isValid) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#399918",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, send it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);

                    fetch('/send-mail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.text())
                    .then(data => {
                        Swal.fire({
                            title: "Success!",
                            text: "Your email sent successfully",
                            icon: "success"
                        });
                        form.reset();
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Error sending email. Please try again later.",
                        });
                        console.error('Error:', error);
                    });
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sorry, your data are invalid!",
                footer: '<a href="error">Why do I have this issue?</a>'
            });
        }
    });

    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
        let parent = this.parentNode;
        parent.classList.add("focus");
    }

    function blurFunc() {
        let parent = this.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
    });
});
