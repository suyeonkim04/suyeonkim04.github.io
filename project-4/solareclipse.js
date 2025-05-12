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

// 3. Check eclipse visibility using USNO API
async function checkEclipseVisibility(lat, lon) {
  const date = "2026-08-12";
  const url = `/api/proxy-usno?date=${date}&lat=${lat}&lon=${lon}&height=0`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Eclipse API Response:", data);

    // Replace location text with user's input
    const userCity = document.getElementById("locationInput").value.trim();
    let description = data?.properties?.description || "Eclipse event";
    description = description.replace("at this Location", `in ${userCity}`);

    // Fallback duration
    const duration = data?.properties?.duration || "unknown";

    // Format date as "August 12, 2026"
    const eclipseDateObj = new Date(date);
    const formattedDate = eclipseDateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Final result text
    const resultText = `✅ ${description} on ${formattedDate}. Duration: ${duration}`;
    document.getElementById("visibility-result").textContent = resultText;

  } catch (err) {
    console.error("Error fetching eclipse data:", err);
    document.getElementById("visibility-result").textContent =
      "⚠️ Error fetching eclipse data. Please try again.";
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

//search button
document.getElementById("locationInput").addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&extratags=1&limit=5&q=${encodeURIComponent(query)}`);
    const results = await response.json();

    // filtering for cities/towns/villages
    const cityResults = results.filter(place => {
      const type = place.type;
      return type === "city" || type === "town" || type === "village";
    });

    const dataList = document.getElementById("suggestions");
    dataList.innerHTML = "";

    cityResults.forEach(place => {
      const option = document.createElement("option");
      option.value = place.display_name;
      dataList.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
});
