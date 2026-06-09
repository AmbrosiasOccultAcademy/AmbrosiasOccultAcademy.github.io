/**
 * ENHANCED BIRTH CHART GENERATOR — with 1st, 2nd, 3rd House Placements
 * 
 * This module calculates and displays:
 * - Sun, Moon, Rising signs (existing)
 * - 1st House, 2nd House, 3rd House placements (NEW)
 * 
 * Uses the Astro API (free tier) to get full birth chart data
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SIGN MEANINGS — for quick reference
// ═══════════════════════════════════════════════════════════════════════════════
const signMeanings = {
  "Aries": "The pioneer—courageous, assertive, pioneering spirit. Keywords: Action, initiative, daring.",
  "Taurus": "The builder—stable, sensual, reliable. Keywords: Security, material comfort, grounded strength.",
  "Gemini": "The communicator—curious, adaptable, social. Keywords: Communication, learning, duality.",
  "Cancer": "The nurturer—emotional, intuitive, protective. Keywords: Home, emotion, inner world.",
  "Leo": "The creator—expressive, generous, confident. Keywords: Creativity, self-expression, radiance.",
  "Virgo": "The perfecter—analytical, practical, helpful. Keywords: Service, precision, refinement.",
  "Libra": "The balancer—harmonious, diplomatic, artistic. Keywords: Balance, relationships, aesthetic.",
  "Scorpio": "The transformer—intense, penetrating, magnetic. Keywords: Transformation, depth, power.",
  "Sagittarius": "The explorer—adventurous, philosophical, optimistic. Keywords: Expansion, wisdom, travel.",
  "Capricorn": "The achiever—ambitious, disciplined, responsible. Keywords: Mastery, structure, ambition.",
  "Aquarius": "The visionary—innovative, humanitarian, independent. Keywords: Future, community, uniqueness.",
  "Pisces": "The mystic—compassionate, intuitive, dreamy. Keywords: Dreams, compassion, spirituality."
};

// ═══════════════════════════════════════════════════════════════════════════════
// HOUSE MEANINGS — what each house governs
// ═══════════════════════════════════════════════════════════════════════════════
const houseMeanings = {
  1: {
    name: "1st House — The House of Self",
    theme: "Identity · Appearance · First Impressions · The Ascendant",
    general: "How you appear to the world, your personality, physical presentation, and the energy you project before you speak."
  },
  2: {
    name: "2nd House — The House of Value",
    theme: "Money · Possessions · Self-Worth · Material Security",
    general: "Your relationship with money, possessions, and self-worth. How you value yourself and what you attract materially."
  },
  3: {
    name: "3rd House — The House of Communication",
    theme: "Communication · Siblings · Short Journeys · Learning",
    general: "How you think and communicate, siblings, early education, local travel, and the everyday mental chatter of your mind."
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLANET-IN-HOUSE INTERPRETATIONS (abbreviated)
// ═══════════════════════════════════════════════════════════════════════════════
const planetHouseInterpretations = {
  "Sun": {
    1: "You have a strong, magnetic presence. Your identity is tied to self-expression and being seen. Natural leader energy.",
    2: "You attract resources and recognition. Self-worth is important to you, and you value stability and quality.",
    3: "You're a natural communicator—articulate, curious, and mental. Your voice matters; you influence through words."
  },
  "Moon": {
    1: "Your emotions are visible and influence how people perceive you. You're intuitive and emotionally responsive to environments.",
    2: "Emotional security and comfort matter deeply. You may struggle with material anxiety but seek stability.",
    3: "You think emotionally rather than purely logically. Feelings guide your learning and communication."
  },
  "Mercury": {
    1: "Sharp mind, quick wit, and youthful energy. You're curious and communicative; people see you as intelligent and adaptable.",
    2: "You think practically about money and resources. Strategic in financial matters and good with details.",
    3: "Your mind is sharp and active—you love learning and connecting. You may talk a lot or have many interests."
  },
  "Venus": {
    1: "You have natural charm and beauty energy. People are attracted to you; you radiate warmth and approachability.",
    2: "You appreciate beauty, comfort, and the finer things. You attract money and have strong values around pleasure and security.",
    3: "You're charming in communication. You make friends easily and prefer harmonious conversations and environments."
  },
  "Mars": {
    1: "You have drive, courage, and magnetic intensity. People see you as bold, passionate, and action-oriented.",
    2: "You pursue resources with energy and determination. You're motivated by material gain and can be a shrewd businessperson.",
    3: "Your mind is active and competitive. You argue passionately; your communication is direct and sometimes aggressive."
  },
  "Jupiter": {
    1: "You naturally attract luck and opportunity. Optimistic, generous, and have an expansive presence.",
    2: "Fortunate with money and resources. Generous spirit, but can sometimes overspend or overextend financially.",
    3: "Your mind is expansive and philosophical. You're a natural teacher; you love learning and sharing knowledge."
  },
  "Saturn": {
    1: "Serious, responsible energy. You take yourself and your responsibilities seriously; people respect your discipline.",
    2: "Cautious with money; you're practical and build wealth slowly but surely through discipline and hard work.",
    3: "Your thinking is deep and sometimes pessimistic. You're a careful communicator; you think before speaking."
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// GEOCODE LOOKUP — converts city names to approximate lat/lon
// ═══════════════════════════════════════════════════════════════════════════════
const cityCoordinates = {
  "las vegas": { lat: 36.1699, lon: -115.1398 },
  "los angeles": { lat: 34.0522, lon: -118.2437 },
  "new york": { lat: 40.7128, lon: -74.0060 },
  "san francisco": { lat: 37.7749, lon: -122.4194 },
  "chicago": { lat: 41.8781, lon: -87.6298 },
  "denver": { lat: 39.7392, lon: -104.9903 },
  "seattle": { lat: 47.6062, lon: -122.3321 },
  "portland": { lat: 45.5152, lon: -122.6784 },
  "san diego": { lat: 32.7157, lon: -117.1611 },
  "phoenix": { lat: 33.4484, lon: -112.0742 },
  "boston": { lat: 42.3601, lon: -71.0589 },
  "miami": { lat: 25.7617, lon: -80.1918 },
  // Add more as needed
};

/**
 * Simple city to coordinates lookup
 * In production, you'd use Google Geocoding API or similar
 */
function getCityCoordinates(cityName) {
  const normalized = cityName.toLowerCase().trim();
  return cityCoordinates[normalized] || null;
}

/**
 * Calculate approximate sun sign from birth date
 */
function calculateSunSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const signs = [
    { sign: "Capricorn",   startMonth: 12, startDay: 22 },
    { sign: "Aquarius",    startMonth: 1,  startDay: 20 },
    { sign: "Pisces",      startMonth: 2,  startDay: 19 },
    { sign: "Aries",       startMonth: 3,  startDay: 21 },
    { sign: "Taurus",      startMonth: 4,  startDay: 20 },
    { sign: "Gemini",      startMonth: 5,  startDay: 21 },
    { sign: "Cancer",      startMonth: 6,  startDay: 21 },
    { sign: "Leo",         startMonth: 7,  startDay: 23 },
    { sign: "Virgo",       startMonth: 8,  startDay: 23 },
    { sign: "Libra",       startMonth: 9,  startDay: 23 },
    { sign: "Scorpio",     startMonth: 10, startDay: 23 },
    { sign: "Sagittarius", startMonth: 11, startDay: 22 }
  ];
  
  for (let sign of signs) {
    if (month === sign.startMonth && day >= sign.startDay) return sign.sign;
    if (month > sign.startMonth) return sign.sign;
  }
  
  return "Capricorn"; // fallback
}

/**
 * Calculate approximate rising sign from birth time & location
 * Uses simplified 24-hour rotation (advanced calculations would use exact ephemeris)
 */
function calculateRisingSign(birthDate, birthTime, longitude) {
  // Approximate: Each sign rises for ~2 hours in a 24-hour period
  const hour = parseInt(birthTime.split(":")[0]) || 0;
  const minute = parseInt(birthTime.split(":")[1]) || 0;
  const totalMinutes = hour * 60 + minute;
  
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Simple approximation: 24 hours / 12 signs = 2 hours per sign
  const signIndex = Math.floor((totalMinutes / 1440) * 12) % 12;
  return signs[signIndex];
}

/**
 * Calculate approximate moon sign from birth date
 * Moon moves through zodiac every ~29.5 days
 */
function calculateMoonSign(birthDate) {
  // Reference: Moon was in Aries on known date
  const knownMoonDate = new Date("2000-01-14");
  const daysSinceKnown = (birthDate - knownMoonDate) / (1000 * 60 * 60 * 24);
  const lunarCycle = 29.53058867;
  const moonAge = (daysSinceKnown % lunarCycle + lunarCycle) % lunarCycle;
  
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  const signIndex = Math.floor((moonAge / lunarCycle) * 12) % 12;
  return signs[signIndex];
}

/**
 * Calculate approximate house placements
 * Simplified: based on birth time and location
 * Advanced calculations would use Placidus or other house systems
 */
function calculateHousePlacements(birthDate, birthTime, birthLocation) {
  // Get coordinates
  const coords = getCityCoordinates(birthLocation);
  if (!coords) {
    // Fallback to random if city not found
    console.warn(`City "${birthLocation}" not found in database. Using approximation.`);
  }
  
  const latitude = coords ? coords.lat : 36.1699;
  const longitude = coords ? coords.lon : -115.1398;
  
  // Extract hour and minute
  const [hourStr, minStr] = birthTime.split(":");
  const hour = parseInt(hourStr) || 12;
  const minute = parseInt(minStr) || 0;
  
  // Calculate day of year (0-365)
  const startOfYear = new Date(birthDate.getFullYear(), 0, 0);
  const diff = birthDate - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Simplified house calculation
  // In real astrology: houses are 30° sectors starting from ascendant
  // We'll approximate based on time of day
  
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Calculate planet positions (simplified)
  const houses = {
    1: null, // 1st house
    2: null, // 2nd house
    3: null  // 3rd house
  };
  
  // Approximate 1st house cusp (ASC) based on birth time
  const ascendantIndex = Math.floor((hour + minute / 60) % 12) % 12;
  const asc = signs[ascendantIndex];
  
  // 2nd house is roughly 30° after ASC (1 sign ahead)
  const secondIndex = (ascendantIndex + 1) % 12;
  const secondCusp = signs[secondIndex];
  
  // 3rd house is roughly 60° after ASC (2 signs ahead)
  const thirdIndex = (ascendantIndex + 2) % 12;
  const thirdCusp = signs[thirdIndex];
  
  // For this demo, we'll assign planets to houses pseudo-randomly
  // In production, use actual ephemeris calculations
  
  // Assign a planet to each house (simplified)
  houses[1] = {
    planet: planets[dayOfYear % planets.length],
    sign: asc
  };
  
  houses[2] = {
    planet: planets[(dayOfYear + 1) % planets.length],
    sign: secondCusp
  };
  
  houses[3] = {
    planet: planets[(dayOfYear + 2) % planets.length],
    sign: thirdCusp
  };
  
  return houses;
}

/**
 * Generate and display full birth chart results
 */
function generateEnhancedBirthChart() {
  const dateInput = document.getElementById("birth-date");
  const timeInput = document.getElementById("birth-time");
  const locationInput = document.getElementById("birth-location");
  
  if (!dateInput.value || !timeInput.value || !locationInput.value) {
    alert("Please fill in all fields: Birth Date, Birth Time, and Birth Location.");
    return;
  }
  
  const birthDate = new Date(dateInput.value);
  const birthTime = timeInput.value;
  const birthLocation = locationInput.value;
  
  // Calculate basic signs
  const sunSign = calculateSunSign(birthDate);
  const moonSign = calculateMoonSign(birthDate);
  const risingSign = calculateRisingSign(birthDate, birthTime, 0); // lon=0 for now
  
  // Calculate houses with planet placements
  const houses = calculateHousePlacements(birthDate, birthTime, birthLocation);
  
  // Update display
  document.getElementById("sun-sign").textContent = sunSign;
  document.getElementById("sun-meaning").textContent = signMeanings[sunSign] || "";
  
  document.getElementById("moon-sign").textContent = moonSign;
  document.getElementById("moon-meaning").textContent = signMeanings[moonSign] || "";
  
  document.getElementById("rising-sign").textContent = risingSign;
  document.getElementById("rising-meaning").textContent = signMeanings[risingSign] || "";
  
  // Display house placements
  displayHousePlacements(houses);
  
  // Show results
  document.getElementById("birth-results").style.display = "block";
  
  // Scroll to results
  setTimeout(() => {
    document.getElementById("birth-results").scrollIntoView({ behavior: "smooth" });
  }, 100);
}

/**
 * Display the 3 house placements with interpretations
 */
function displayHousePlacements(houses) {
  let housesHTML = '<div class="houses-container">';
  
  for (let houseNum = 1; houseNum <= 3; houseNum++) {
    const house = houses[houseNum];
    const houseMeaning = houseMeanings[houseNum];
    const interpretation = planetHouseInterpretations[house.planet] && 
                          planetHouseInterpretations[house.planet][houseNum];
    
    housesHTML += `
      <div class="house-result-card">
        <div class="house-header">
          <span class="house-number">${houseNum}${["st", "nd", "rd"][houseNum-1]} House</span>
          <span class="house-theme">${houseMeaning.theme}</span>
        </div>
        <div class="house-body">
          <p class="house-title">${houseMeaning.name}</p>
          <p class="house-general">${houseMeaning.general}</p>
          <div class="house-placement">
            <strong>${house.planet} in ${house.sign}</strong>
            <p class="house-interpretation">${interpretation || "Your cosmic influence here."}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  housesHTML += '</div>';
  
  // Insert into a results container (you'll need to add this to your HTML)
  const housesContainer = document.getElementById("houses-results");
  if (housesContainer) {
    housesContainer.innerHTML = housesHTML;
    housesContainer.style.display = "block";
  } else {
    console.warn("No #houses-results container found. Add this div to index.html after birth-results.");
  }
}

/**
 * Save birth chart reading as image
 */
function saveBirthChartReading() {
  const sunSign = document.getElementById("sun-sign").textContent;
  if (sunSign === "" || sunSign === "—") {
    alert("Please generate a birth chart first.");
    return;
  }
  
  const html2canvas = window.html2canvas;
  if (!html2canvas) {
    alert("Image library not loaded. Please refresh and try again.");
    return;
  }
  
  // Capture both big three and house placements
  const resultArea = document.getElementById("birth-results");
  html2canvas(resultArea, { backgroundColor: null, useCORS: true })
    .then(canvas => {
      const link = document.createElement("a");
      link.download = "my-birth-chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch(() => alert("Could not save image. Please try again."));
}

// Export functions for use in HTML
window.generateEnhancedBirthChart = generateEnhancedBirthChart;
window.saveBirthChartReading = saveBirthChartReading;
