document.addEventListener('DOMContentLoaded', () => {
    // Rating functionality
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.dataset.value;
            const productCard = star.closest('.product-card');
            const ratingStars = productCard.querySelectorAll('.star');
            const ratingCount = productCard.querySelector('.rating-count');
            
            // Update star colors based on rating
            ratingStars.forEach((s, index) => {
                s.style.color = index < rating ? 'gold' : '#ddd';
            });

            // Update the rating count (dummy example)
            let count = parseInt(ratingCount.textContent.replace(/[()]/g, ''));
            count++;
            ratingCount.textContent = `(${count})`;

            // You can send the new rating to the server here
        });
    });

    // Edit price functionality for admins
    document.querySelectorAll('.edit-price').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const priceElement = productCard.querySelector('.price-value');
            const currentPrice = priceElement.textContent;
            const newPrice = prompt('Enter new price:', currentPrice);

            if (newPrice !== null) {
                priceElement.textContent = parseFloat(newPrice).toFixed(2);

                // Send the new price to the server for update
                const productId = productCard.dataset.productId;
                // Example: updatePriceOnServer(productId, newPrice);
            }
        });
    });
});

// Example function to send new price to server (not implemented)
function updatePriceOnServer(productId, newPrice) {
    // Implement server update logic here
    console.log(`Updating price for product ID ${productId} to ${newPrice}`);
}

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

function login() {
    window.location.href = '../register';
}
