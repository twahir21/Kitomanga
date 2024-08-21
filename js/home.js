const homeArray = [];

for (let i = 0; i < 19; i++) {

    homeArray.push("img/home" + i + ".png");

}

// console.log(homeArray);

const homeImageElement = document.getElementById("homeImage");
let currentIndex = 0;

function changeImage() {
    homeImageElement.classList.remove('active'); // Fade out current image
    setTimeout(() => {
        homeImageElement.src = homeArray[currentIndex];
        homeImageElement.classList.add('active'); // Fade in new image
        currentIndex = (currentIndex + 1) % homeArray.length;
    }, 600); // Wait for the fade-out transition to complete
}

// Change image every 7 seconds
setInterval(changeImage, 7000);

// Initialize with the first image
homeImageElement.classList.add('active');


const bgImages = [];

for (let i = 0; i < 6; i++) {
    bgImages.push("img/bg" + i + ".jpg");
}

const gradients = [
                    "linear-gradient(to bottom, #7c84ad, #fff)", 
                    "linear-gradient(to bottom, #dfb289, #f8f8f8)", 
                    "linear-gradient(to bottom, #3d3d3e, #353638)", 
                    "linear-gradient(to bottom, #22222b, #353638)", 
                    "linear-gradient(to bottom, #a9a9b7, #f8f8f8)",
                    "linear-gradient(to bottom, #FFC0CB, #f8f8f8)"
                ];


const bgImageElement = document.getElementById("changeImage");
let index = 0;

function changebgImage() {
    bgImageElement.classList.remove('slide-in'); // Prepare for fade out
    bgImageElement.classList.add('slide-out'); // Slide out current image
    setTimeout(() => {
        bgImageElement.src = bgImages[index];
        
        if(index === 2 || index === 3){
            document.getElementById("products").style.background = gradients[index];
            document.getElementById("paragraph").style.color = "#e5bea0";
            document.getElementById("element1").style.border = "3px solid #e5bea0";
            document.getElementById("element2").style.border = "3px solid #e5bea0";
            document.getElementById("element3").style.border = "3px solid #e5bea0";
            document.getElementById("element4").style.border = "3px solid #e5bea0";
            document.getElementById("element5").style.border = "3px solid #e5bea0";
            document.getElementById("element6").style.border = "3px solid #e5bea0";
            document.getElementById("element7").style.border = "3px solid #e5bea0";
            document.getElementById("element8").style.border = "3px solid #e5bea0";

        }
        else{
            document.getElementById("paragraph").style.color = "black";
            document.getElementById("products").style.background = gradients[index];
            document.getElementById("element1").style.border = "3px solid black";
            document.getElementById("element2").style.border = "3px solid black";
            document.getElementById("element3").style.border = "3px solid black";
            document.getElementById("element4").style.border = "3px solid black";
            document.getElementById("element5").style.border = "3px solid black";
            document.getElementById("element6").style.border = "3px solid black";
            document.getElementById("element7").style.border = "3px solid black";
            document.getElementById("element8").style.border = "3px solid black";
        }
        bgImageElement.classList.remove('slide-out');
        bgImageElement.classList.add('slide-in'); // Slide in new image
        index = (index + 1) % bgImages.length;
    }, 500); // Wait for the fade-out transition to complete
}

// Change image every 9 seconds
setInterval(changebgImage, 9000);

// Initialize with the first image and its gradient
bgImageElement.classList.add('slide-in');
document.getElementById("products").style.background = gradients[0];


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