
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is selected
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Race category filters
const filterButtons = document.querySelectorAll(".filter");
const raceCards = document.querySelectorAll(".race-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        raceCards.forEach((card) => {
            const matches =
                category === "all" ||
                card.dataset.category === category;

            card.hidden = !matches;
        });
    });
});

// Countdown to the first demo race
// Change this date to your actual race start time.
const raceDate = new Date("2026-10-18T14:00:00+05:30").getTime();

const countdownTimer = setInterval(() => {
    const now = Date.now();
    const difference = raceDate - now;

    if (difference <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach((id) => {
            document.getElementById(id).textContent = "00";
        });

        clearInterval(countdownTimer);
        document.querySelector(".countdown-subtitle").textContent =
            "The countdown has ended. Update the date for the next race.";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}, 1000);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
