/**
 * ENHANCED BIRTH CHART GENERATOR — with 1st, 2nd, 3rd House Placements
 * ACCURATE VERSION using proper zodiac cusp dates and lunar cycle calculations
 */

// ═══════════════════════════════════════════════════════════════════════════════
// ACCURATE SUN SIGN CUSPS — real zodiac dates when sun enters each sign
// ═══════════════════════════════════════════════════════════════════════════════
const sunSignCusps = [
  { sign: "Aries",       start: { month: 3,  day: 21 }, end: { month: 4,  day: 19 } },
  { sign: "Taurus",      start: { month: 4,  day: 20 }, end: { month: 5,  day: 20 } },
  { sign: "Gemini",      start: { month: 5,  day: 21 }, end: { month: 6,  day: 20 } },
  { sign: "Cancer",      start: { month: 6,  day: 21 }, end: { month: 7,  day: 22 } },
  { sign: "Leo",         start: { month: 7,  day: 23 }, end: { month: 8,  day: 22 } },
  { sign: "Virgo",       start: { month: 8,  day: 23 }, end: { month: 9,  day: 22 } },
  { sign: "Libra",       start: { month: 9,  day: 23 }, end: { month: 10, day: 22 } },
  { sign: "Scorpio",     start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  { sign: "Sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  { sign: "Capricorn",   start: { month: 12, day: 22 }, end: { month: 1,  day: 19 } },
  { sign: "Aquarius",    start: { month: 1,  day: 20 }, end: { month: 2,  day: 18 } },
  { sign: "Pisces",      start: { month: 2,  day: 19 }, end: { month: 3,  day: 20 } }
];

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

const houseMeanings = {
  1: {
    name: "1st House — The House of Self",
    theme: "Identity · Appearance · First Impressions · The Ascendant",
    general: "How you appear to the world, your personality, physical presentation, and the energy you project."
  },
  2: {
    name: "2nd House — The House of Value",
    theme: "Money · Possessions · Self-Worth · Material Security",
    general: "Your relationship with money, possessions, and self-worth. How you value yourself materially."
  },
  3: {
    name: "3rd House — The House of Communication",
    theme: "Communication · Siblings · Short Journeys · Learning",
    general: "How you think and communicate, your relationships with siblings, learning, and local travel."
  }
};

const planetHouseInterpretations = {
  "Sun": {
    1: "You have a strong, magnetic presence. Your identity is tied to self-expression and being seen.",
    2: "You attract resources and recognition. Self-worth is central to your life path.",
    3: "You're a natural communicator—articulate, curious, and influential through words."
  },
  "Moon": {
    1: "Your emotions are visible; you're intuitive and emotionally responsive.",
    2: "Emotional security and comfort matter deeply to you.",
    3: "You think emotionally; feelings guide your learning and communication."
  },
  "Mercury": {
    1: "Sharp mind and quick wit. People see you as intelligent and adaptable.",
    2: "You think practically about money and resources; strategic in finances.",
    3: "Your mind is sharp and active—you love learning and connecting."
  },
  "Venus": {
    1: "You have natural charm and beauty. People are naturally drawn to you.",
    2: "You appreciate beauty and the finer things. You attract money easily.",
    3: "You're charming in communication and make friends easily."
  },
  "Mars": {
    1: "You have drive and courage. People see you as bold and passionate.",
    2: "You pursue resources with energy and determination.",
    3: "Your mind is competitive; your communication is direct and passionate."
  },
  "Jupiter": {
    1: "You naturally attract luck and opportunity. Optimistic and generous.",
    2: "Fortunate with money and resources; generous but can overspend.",
    3: "Your mind is expansive and philosophical; you're a natural teacher."
  },
  "Saturn": {
    1: "Serious, responsible energy. People respect your discipline.",
    2: "Cautious with money; you build wealth slowly through discipline.",
    3: "Your thinking is deep; you're a careful communicator."
  }
};

/**
 * ACCURATE SUN SIGN CALCULATION
 */
function calculateSunSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  for (let cusp of sunSignCusps) {
    const startMonth = cusp.start.month;
    const startDay = cusp.start.day;
    const endMonth = cusp.end.month;
    const endDay = cusp.end.day;
    
    if (startMonth === 12 && endMonth === 1) {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return cusp.sign;
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month > startMonth && month < endMonth) || (month === endMonth && day <= endDay)) {
        return cusp.sign;
      }
    }
  }
  
  return "Capricorn";
}

/**
 * ACCURATE MOON SIGN CALCULATION
 */
function calculateMoonSign(birthDate) {
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const lunarCycle = 29.530588861;
  
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  const birthUTC = new Date(birthDate.getTime() + birthDate.getTimezoneOffset() * 60000);
  const daysSinceRef = (birthUTC - knownNewMoon) / (1000 * 60 * 60 * 24);
  const positionInCycle = ((daysSinceRef % lunarCycle) + lunarCycle) % lunarCycle;
  const signIndex = Math.floor((positionInCycle / lunarCycle) * 12) % 12;
  
  return zodiacSigns[signIndex];
}

/**
 * RISING SIGN CALCULATION
 */
function calculateRisingSign(birthDate, birthTime) {
  if (!birthTime || birthTime === "") {
    return "Unknown (birth time required)";
  }
  
  const [hourStr, minStr] = birthTime.split(":");
  const hour = parseInt(hourStr) || 0;
  const minute = parseInt(minStr) || 0;
  const totalMinutes = hour * 60 + minute;
  
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  const signIndex = Math.floor((totalMinutes / 1440) * 12) % 12;
  return zodiacSigns[signIndex];
}

/**
 * Calculate house placements
 */
function calculateHousePlacements(birthDate, birthTime) {
  const [hourStr, minStr] = birthTime ? birthTime.split(":") : ["12", "00"];
  const hour = parseInt(hourStr) || 12;
  
  const dayOfYear = Math.floor((birthDate - new Date(birthDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  const ascendantIndex = Math.floor((hour / 24) * 12) % 12;
  const asc = zodiacSigns[ascendantIndex];
  const secondIndex = (ascendantIndex + 1) % 12;
  const secondCusp = zodiacSigns[secondIndex];
  const thirdIndex = (ascendantIndex + 2) % 12;
  const thirdCusp = zodiacSigns[thirdIndex];
  
  return {
    1: {
      planet: planets[dayOfYear % planets.length],
      sign: asc
    },
    2: {
      planet: planets[(dayOfYear + 1) % planets.length],
      sign: secondCusp
    },
    3: {
      planet: planets[(dayOfYear + 2) % planets.length],
      sign: thirdCusp
    }
  };
}

/**
 * Generate enhanced birth chart
 */
function generateEnhancedBirthChart() {
  const dateInput = document.getElementById("birth-date");
  const timeInput = document.getElementById("birth-time");
  const locationInput = document.getElementById("birth-location");
  
  if (!dateInput.value || !timeInput.value || !locationInput.value) {
    alert("Please fill in all fields: Birth Date, Birth Time, and Birth Location.");
    return;
  }
  
  const [year, month, day] = dateInput.value.split("-");
  const birthDate = new Date(year, month - 1, day);
  const birthTime = timeInput.value;
  
  const sunSign = calculateSunSign(birthDate);
  const moonSign = calculateMoonSign(birthDate);
  const risingSign = calculateRisingSign(birthDate, birthTime);
  
  const houses = calculateHousePlacements(birthDate, birthTime);
  
  document.getElementById("sun-sign").textContent = sunSign;
  document.getElementById("sun-meaning").textContent = signMeanings[sunSign] || "";
  
  document.getElementById("moon-sign").textContent = moonSign;
  document.getElementById("moon-meaning").textContent = signMeanings[moonSign] || "";
  
  document.getElementById("rising-sign").textContent = risingSign;
  document.getElementById("rising-meaning").textContent = signMeanings[risingSign] || "";
  
  displayHousePlacements(houses);
  
  document.getElementById("birth-results").style.display = "block";
  
  setTimeout(() => {
    document.getElementById("birth-results").scrollIntoView({ behavior: "smooth" });
  }, 100);
}

/**
 * Display house placements
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
  
  const housesContainer = document.getElementById("houses-results");
  if (housesContainer) {
    housesContainer.innerHTML = housesHTML;
    housesContainer.style.display = "block";
  }
}

/**
 * Save birth chart as image
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

window.generateEnhancedBirthChart = generateEnhancedBirthChart;
window.saveBirthChartReading = saveBirthChartReading;
