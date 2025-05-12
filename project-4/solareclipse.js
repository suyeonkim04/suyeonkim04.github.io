// 1. Define eclipse date & countdown
const eclipseDate = new Date("2026-08-12T18:00:00Z");

// 2. Handle search input and fetch coordinates from Nominatim
async function handleSearch() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) return;

  console.log("Searching for:", city); // optional debug log

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
  const results = await response.json();

  if (results.length === 0) {
    document.getElementById("visibility-result").textContent = "❌ Location not found.";
    return;
  }

  const lat = results[0].lat;
  const lon = results[0].lon;

  checkEclipseVisibility(lat, lon); // Call the function defined below
}

// 3. Check eclipse visibility using USNO API (add this!)
async function checkEclipseVisibility(lat, lon) {
  const date = "2026-08-12";
  const url = `/api/proxy-usno?date=${date}&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data?.properties?.obscuration > 0) {
      const percent = (data.properties.obscuration * 100).toFixed(1);
      const type = data.properties.description;
      document.getElementById("visibility-result").textContent =
        `✅ You will see a ${type} on ${date}! Obscuration: ${percent}%`;
    } else {
      document.getElementById("visibility-result").textContent =
        `🚫 The eclipse is not visible at your location on ${date}.`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("visibility-result").textContent = "⚠️ Error fetching eclipse data.";
  }
}

// 4. Countdown timer
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
