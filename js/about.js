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