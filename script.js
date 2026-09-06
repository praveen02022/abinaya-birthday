/* ---------- EDIT THESE TO PERSONALIZE ---------- */

const PASSWORD = "july15";

// Countdown target — Sep 9, 12:00 AM IST. Change this if the celebration date/time is different.
const BIRTHDAY_TARGET = new Date("2026-09-09T00:00:00+05:30");

// Home screen background: drop a clear, high-quality photo at this path.
// A dark shade is layered on top so text stays readable. Falls back to the
// colorful gradient if the file is missing.
const HOME_BACKGROUND = "images/background.jpeg";

// Gallery: exactly 4 photos. Drop the files into images/ with these names.
// Any missing photo shows a cute placeholder tile until you add it.
const PHOTOS = [
  { src: "images/photo1.jpeg", caption: "Sweetest smile" },
  { src: "images/photo2.jpeg", caption: "Starlight Girl" },
  { src: "images/photo3.jpeg", caption: "Always shining" },
  { src: "images/photo4.jpeg", caption: "Forever young" },
];

const QUOTES = [
  "\"My favorite place will always be wherever I get to see you smile.🤍❤️\"",
  "\"You're not just someone I love; you're one of the most beautiful parts of my life.🤍❤️\"",
  "\"Today is your day — dream big, laugh loud, and celebrate you!.🤍❤️\"",
  "\"Keep shining, Angel Queen.  I Love You clmm🤍❤️\"",
];

/* ---------- APP LOGIC (no need to edit below) ---------- */

const screens = {
  password: document.getElementById("screen-password"),
  gallery: document.getElementById("screen-gallery"),
  countdown: document.getElementById("screen-countdown"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

/* ----- Password screen ----- */
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");
const passwordCard = document.querySelector("#screen-password .gift-box");
const giftWrap = document.getElementById("gift-wrap");
const giftClosed = document.getElementById("gift-closed");

giftClosed.addEventListener("click", () => {
  giftClosed.classList.add("unwrapping");
  setTimeout(() => {
    giftClosed.classList.add("hidden");
    passwordInput.focus();
  }, 700);
});

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === PASSWORD) {
    giftWrap.classList.add("opening");
    setTimeout(() => showScreen("gallery"), 650);
  } else {
    passwordError.classList.add("show");
    passwordCard.classList.remove("shake");
    void passwordCard.offsetWidth; // restart animation
    passwordCard.classList.add("shake");
    passwordInput.value = "";
    passwordInput.focus();
  }
});

/* ----- Gallery screen ----- */
const galleryGrid = document.getElementById("gallery-grid");

function renderGallery() {
  const placeholderEmojis = ["🎀", "🌸", "🦋", "✨"];

  PHOTOS.slice(0, 4).forEach((photo, i) => {
    const frame = document.createElement("figure");
    frame.className = "polaroid";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption || "A favorite memory";
    img.loading = "lazy";

    // If the file isn't there yet, swap in a placeholder tile
    img.onerror = () => {
      const placeholder = document.createElement("div");
      placeholder.className = "polaroid-placeholder";
      placeholder.textContent = placeholderEmojis[i % placeholderEmojis.length];
      img.replaceWith(placeholder);
    };

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption || "";

    frame.appendChild(img);
    frame.appendChild(caption);
    galleryGrid.appendChild(frame);
  });
}
renderGallery();

/* ----- Home screen background image (with shade overlay) ----- */
function applyHomeBackground() {
  if (!HOME_BACKGROUND) return;
  const probe = new Image();
  probe.onload = () => {
    screens.gallery.style.setProperty("--home-bg", `url("${HOME_BACKGROUND}")`);
    screens.gallery.classList.add("has-bg");
  };
  probe.src = HOME_BACKGROUND;
}
applyHomeBackground();

document.getElementById("continue-btn").addEventListener("click", () => {
  showScreen("countdown");
});

/* ----- Home screen gate: only the countdown shows until the birthday arrives ----- */
const homeLayout = document.getElementById("home-layout");
const homeCdDays = document.getElementById("home-cd-days");
const homeCdHours = document.getElementById("home-cd-hours");
const homeCdMinutes = document.getElementById("home-cd-minutes");
const homeCdSeconds = document.getElementById("home-cd-seconds");

function updateHomeCountdown() {
  const now = new Date();
  const diff = BIRTHDAY_TARGET - now;

  if (diff <= 0) {
    homeLayout.classList.remove("pre-birthday");
    homeLayout.classList.add("post-birthday");
    return;
  }

  homeLayout.classList.add("pre-birthday");
  homeLayout.classList.remove("post-birthday");

  const seconds = Math.floor(diff / 1000);
  homeCdDays.textContent = Math.floor(seconds / 86400);
  homeCdHours.textContent = Math.floor((seconds % 86400) / 3600);
  homeCdMinutes.textContent = Math.floor((seconds % 3600) / 60);
  homeCdSeconds.textContent = seconds % 60;
}

updateHomeCountdown();
setInterval(updateHomeCountdown, 1000);

/* ----- Home screen quotes (2-4 shown together) ----- */
const homeQuotesGrid = document.getElementById("home-quotes-grid");

function renderHomeQuotes() {
  const count = Math.min(4, Math.max(2, QUOTES.length >= 4 ? 4 : QUOTES.length));
  const shuffled = [...QUOTES].sort(() => Math.random() - 0.5);
  shuffled.slice(0, count).forEach((quote) => {
    const tile = document.createElement("div");
    tile.className = "quote-tile";
    tile.textContent = quote;
    homeQuotesGrid.appendChild(tile);
  });
}
renderHomeQuotes();

/* ----- Countdown screen ----- */
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");
const countdownTimer = document.getElementById("countdown-timer");
const countdownTitle = document.getElementById("countdown-title");
const celebration = document.getElementById("celebration");

let countdownInterval = null;

function updateCountdown() {
  const now = new Date();
  const diff = BIRTHDAY_TARGET - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    countdownTimer.classList.add("hidden");
    countdownTitle.classList.add("hidden");
    celebration.classList.remove("hidden");
    burstConfetti(120);
    return;
  }

  const seconds = Math.floor(diff / 1000);
  cdDays.textContent = Math.floor(seconds / 86400);
  cdHours.textContent = Math.floor((seconds % 86400) / 3600);
  cdMinutes.textContent = Math.floor((seconds % 3600) / 60);
  cdSeconds.textContent = seconds % 60;
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

/* ----- Mini countdown on password screen ----- */
const miniCdDays = document.getElementById("mini-cd-days");
const miniCdHours = document.getElementById("mini-cd-hours");
const miniCdMinutes = document.getElementById("mini-cd-minutes");
const miniCdSeconds = document.getElementById("mini-cd-seconds");

function updateMiniCountdown() {
  const now = new Date();
  const diff = BIRTHDAY_TARGET - now;

  if (diff <= 0) {
    miniCdDays.textContent = 0;
    miniCdHours.textContent = 0;
    miniCdMinutes.textContent = 0;
    miniCdSeconds.textContent = 0;
    return;
  }

  const seconds = Math.floor(diff / 1000);
  miniCdDays.textContent = Math.floor(seconds / 86400);
  miniCdHours.textContent = Math.floor((seconds % 86400) / 3600);
  miniCdMinutes.textContent = Math.floor((seconds % 3600) / 60);
  miniCdSeconds.textContent = seconds % 60;
}

updateMiniCountdown();
setInterval(updateMiniCountdown, 1000);

/* ----- Rotating quotes ----- */
const quoteText = document.getElementById("quote-text");
let quoteIndex = 0;

function rotateQuote() {
  quoteText.style.opacity = 0;
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % QUOTES.length;
    quoteText.textContent = QUOTES[quoteIndex];
    quoteText.style.opacity = 1;
  }, 400);
}

quoteText.textContent = QUOTES[0];
setInterval(rotateQuote, 4000);

/* ----- Confetti ----- */
const confettiLayer = document.getElementById("confetti-layer");
const confettiColors = ["#ff5e8a", "#ffd23f", "#37f2c0", "#7b61ff", "#ff8a5c", "#ff2e63"];

function burstConfetti(count = 40) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDuration = 2 + Math.random() * 2 + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "3px";
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

// Gentle recurring confetti sprinkle while on the password screen
setInterval(() => {
  if (screens.password.classList.contains("active")) {
    burstConfetti(6);
  }
}, 2500);

/* ----- Fireworks that crack in the sky (replaces the old cracker row everywhere) ----- */
const fireworksLayer = document.getElementById("fireworks-layer");
const fireworkColors = ["#ff2e63", "#ffd23f", "#37f2c0", "#7b61ff", "#ff8a5c", "#ff5e8a"];

function launchFirework() {
  const originX = 10 + Math.random() * 80; // vw, keep away from screen edges
  const originY = 8 + Math.random() * 32; // vh, upper "sky" area
  const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

  const flash = document.createElement("div");
  flash.className = "firework-flash";
  flash.style.left = originX + "vw";
  flash.style.top = originY + "vh";
  flash.style.background = color;
  fireworksLayer.appendChild(flash);
  setTimeout(() => flash.remove(), 500);

  const sparkCount = 16;
  for (let i = 0; i < sparkCount; i++) {
    const angle = (i / sparkCount) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 50 + Math.random() * 50;
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    const spark = document.createElement("div");
    spark.className = "firework-spark";
    spark.style.left = originX + "vw";
    spark.style.top = originY + "vh";
    spark.style.setProperty("--dx", dx);
    spark.style.setProperty("--dy", dy);
    spark.style.background = color;
    spark.style.color = color;
    fireworksLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 950);
  }
}

// Fireworks crack in the sky on the password screen, the countdown screen,
// and the home screen while it's gated to just the countdown (pre-birthday)
setInterval(() => {
  const onPassword = screens.password.classList.contains("active");
  const onCountdown = screens.countdown.classList.contains("active");
  const onHomeCountdownGate =
    screens.gallery.classList.contains("active") &&
    homeLayout.classList.contains("pre-birthday");

  if (onPassword || onCountdown || onHomeCountdownGate) {
    launchFirework();
  }
}, 1000);
