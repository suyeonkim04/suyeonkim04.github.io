const eclipseDate = new Date("2026-08-12T18:00:00Z");

function updateCountdown() {
  const now = new Date();
  const timeLeft = eclipseDate - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").textContent = "🌑 The eclipse is happening!";
    return;
  }

  const totalDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const days = totalDays % 365;
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const parts = [];
  if (years > 0) parts.push(`${years}yrs`);
  parts.push(`${days}days`, `${hours}hrs`, `${minutes}min`, `${seconds}sec`);

  document.getElementById("countdown").textContent = parts.join(' ');
}

setInterval(updateCountdown, 1000);
updateCountdown();