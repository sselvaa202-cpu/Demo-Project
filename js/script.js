const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


// ===============================
// CLOSE MOBILE MENU
// ===============================

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements =
    document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (elementTop < windowHeight - 80) {

            element.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();