// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close menu when a link is clicked

const links = document.querySelectorAll(".nav-links a");


links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ================================
// SKILL PROGRESS BARS
// ================================

const progressBars =
    document.querySelectorAll(".progress-bar");


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const progress =
                    entry.target.dataset.progress;

                entry.target.style.width =
                    progress + "%";

            }

        });

    },
    {
        threshold: 0.5
    }
);


progressBars.forEach(bar => {

    observer.observe(bar);

});