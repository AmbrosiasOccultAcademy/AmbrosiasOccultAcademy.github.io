// ─────────────────────────────────────────────────────────────
// TAROT GENERATOR SCRIPT — CLEAN VERSION
// Ambrosia’s Occult Academy
// ─────────────────────────────────────────────────────────────

// Switch between tabs (Daily Pull / Search)
function switchTarotTab(tab, btn) {
  document.querySelectorAll('.tarot-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('tarot-panel-pull').style.display   = tab === 'pull'   ? '' : 'none';
  document.getElementById('tarot-panel-search').style.display = tab === 'search' ? '' : 'none';

  if (tab === 'search') {
    filterTarotCards('');
    setTimeout(() => document.getElementById('tarot-search-input').focus(), 50);
  }
}

// ─────────────────────────────────────────────────────────────
// DAILY CARD PULL
// ─────────────────────────────────────────────────────────────

function pullDailyCard() {
  const card       = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
  const isReversed = Math.random() < 0.5;

  const img         = document.getElementById("tarot-card-image");
  const nameEl      = document.getElementById("tarot-card-name");
  const orientEl    = document.getElementById("tarot-card-orientation");
  const displayArea = document.querySelector(".tarot-card-display");
  const meaningBox  = document.getElementById("tarot-meaning-box");

  img.src            = card.image;
  nameEl.textContent = card.name;

  if (isReversed) {
    img.classList.add("reversed");
    orientEl.textContent = "(Reversed)";
  } else {
    img.classList.remove("reversed");
    orientEl.textContent = "(Upright)";
  }

  // Sparkle effect for reversed cards
  const oldSparkle = displayArea.querySelector(".sparkle");
  if (oldSparkle) oldSparkle.remove();
  if (isReversed) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    img.insertAdjacentElement("afterend", sparkle);
  }

  // Meaning box
  meaningBox.style.display = 'block';
  meaningBox.innerHTML = `
    <div class="tm-upright">
      <div class="tm-label">⬆ Upright</div>
      <div class="tm-keywords">${card.upright}</div>
    </div>
    <div class="tm-reversed">
      <div class="tm-label">⬇ Reversed</div>
      <div class="tm-keywords">${card.reversed}</div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// SAVE READING AS IMAGE
// ─────────────────────────────────────────────────────────────

function saveReading() {
  const cardName = document.getElementById("tarot-card-name").textContent.trim();
  if (cardName === "Your card will appear here") {
    alert("Please pull a card first before saving your reading!");
    return;
  }

  html2canvas(document.querySelector(".tarot-card-display"), {
    backgroundColor: null,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "tarot-reading.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).catch(() => alert("Sorry, the reading couldn't be saved. Please try again."));
}

// ─────────────────────────────────────────────────────────────
// SEARCH CARDS
// ─────────────────────────────────────────────────────────────

function filterTarotCards(query) {
  const resultsEl = document.getElementById('tarot-search-results');
  const detailEl  = document.getElementById('tarot-search-detail');
  detailEl.style.display = 'none';

  const q = query.trim().toLowerCase();
  const matches = q === ''
    ? tarotDeck
    : tarotDeck.filter(c => c.name.toLowerCase().includes(q));

  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <p style="color:var(--text-muted);font-size:0.88rem;padding:0.5rem 0;">
        No cards found — try a different name.
      </p>`;
    return;
  }

  resultsEl.innerHTML = matches.map(card => {
    const idx = tarotDeck.indexOf(card);
    return `
      <button class="tarot-result-btn" onclick="showCardDetail(${idx})">
        <span class="tr-num">${card.numeral}</span>
        ${card.name}
      </button>`;
  }).join('');
}

// ─────────────────────────────────────────────────────────────
// SHOW CARD DETAIL IN SEARCH
// ─────────────────────────────────────────────────────────────

function showCardDetail(idx) {
  const card    = tarotDeck[idx];
  const detail  = document.getElementById('tarot-search-detail');
  const results = document.getElementById('tarot-search-results');

  results.style.display = 'none';
  detail.style.display  = 'block';

  detail.innerHTML = `
    <button class="tsd-back-btn" onclick="backToResults()">← Back to all cards</button>
    <div class="tsd-inner">
      <div class="tsd-img-wrap">
        <img src="${card.image}" alt="${card.name}" />
      </div>
      <div class="tsd-content">
        <div class="tsd-numeral">${card.numeral} · Major Arcana</div>
        <div class="tsd-name">${card.name}</div>
        <div class="tsd-block tsd-upright">
          <div class="tsd-block-label">⬆ Upright Meanings</div>
          <p>${card.upright}</p>
        </div>
        <div class="tsd-block tsd-reversed">
          <div class="tsd-block-label">⬇ Reversed Meanings</div>
          <p>${card.reversed}</p>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// BACK TO SEARCH RESULTS
// ─────────────────────────────────────────────────────────────

function backToResults() {
  document.getElementById('tarot-search-detail').style.display = 'none';
  document.getElementById('tarot-search-results').style.display = '';
}
