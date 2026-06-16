
    /* =====================================================================
       TAROT — deck data with upright + reversed meanings
    ===================================================================== */
    const tarotDeck = [
      { name: "The Fool",           numeral: "0",     image: "images/tarot/fool.png",
        upright:  "New beginnings, spontaneity, a leap of faith, innocence, free spirit, adventure.",
        reversed: "Recklessness, risk-taking without thought, naivety, holding back out of fear." },
      { name: "The Magician",       numeral: "I",     image: "images/tarot/magician.png",
        upright:  "Willpower, skill, resourcefulness, manifestation, inspired action, concentration.",
        reversed: "Manipulation, poor planning, untapped talents, trickery, illusion." },
      { name: "The High Priestess", numeral: "II",    image: "images/tarot/high-priestess.png",
        upright:  "Intuition, sacred knowledge, divine feminine, the subconscious, mystery, inner knowing.",
        reversed: "Secrets, disconnection from intuition, withdrawal, repressed feelings, surface knowledge." },
      { name: "The Empress",        numeral: "III",   image: "images/tarot/empress.png",
        upright:  "Femininity, beauty, nature, nurturing, abundance, fertility, sensuality, creativity.",
        reversed: "Creative block, dependence on others, smothering, emptiness, neglect of self." },
      { name: "The Emperor",        numeral: "IV",    image: "images/tarot/emperor.png",
        upright:  "Authority, structure, control, fatherhood, solid foundation, discipline, leadership.",
        reversed: "Domination, rigidity, inflexibility, loss of control, abuse of power, obstruction." },
      { name: "The Hierophant",     numeral: "V",     image: "images/tarot/hierophant.png",
        upright:  "Tradition, conformity, morality, ethics, spiritual wisdom, institutions, mentorship.",
        reversed: "Personal belief systems, freedom, challenging tradition, unconventionality, rebellion." },
      { name: "The Lovers",         numeral: "VI",    image: "images/tarot/lovers.png",
        upright:  "Love, harmony, relationships, values alignment, choices, partnerships, deep connection.",
        reversed: "Self-love deficit, disharmony, imbalance, misalignment of values, poor decisions." },
      { name: "The Chariot",        numeral: "VII",   image: "images/tarot/chariot.png",
        upright:  "Control, willpower, victory, determination, ambition, direction, hard-won success.",
        reversed: "Aggression, no direction, scattered energy, defeat, lack of self-control, opposition." },
      { name: "Strength",           numeral: "VIII",  image: "images/tarot/strength.png",
        upright:  "Courage, persuasion, influence, compassion, inner strength, patience, soft power.",
        reversed: "Inner conflict, self-doubt, low energy, raw emotion overwhelming reason, cowardice." },
      { name: "The Hermit",         numeral: "IX",    image: "images/tarot/hermit.png",
        upright:  "Soul-searching, introspection, solitude, inner guidance, contemplation, withdrawal.",
        reversed: "Isolation, loneliness, withdrawal from the world, lost, rejection of guidance." },
      { name: "Wheel of Fortune",   numeral: "X",     image: "images/tarot/wheel-of-fortune.png",
        upright:  "Good luck, karma, life cycles, destiny, a turning point, fortune, synchronicity.",
        reversed: "Bad luck, resistance to change, breaking cycles, clinging to control, setbacks." },
      { name: "Justice",            numeral: "XI",    image: "images/tarot/justice.png",
        upright:  "Justice, fairness, truth, cause and effect, law, accountability, integrity.",
        reversed: "Unfairness, dishonesty, lack of accountability, avoidance of truth, legal complications." },
      { name: "The Hanged Man",     numeral: "XII",   image: "images/tarot/hanged-man.png",
        upright:  "Surrender, new perspectives, pause, letting go, sacrifice, suspension, enlightenment.",
        reversed: "Delays, resistance, stalling, indecision, avoiding sacrifice, martyrdom." },
      { name: "Death",              numeral: "XIII",  image: "images/tarot/death.png",
        upright:  "Endings, change, transformation, transition, letting go, the inevitable, new cycles.",
        reversed: "Resistance to change, inability to move on, stagnation, decay, personal transformation delayed." },
      { name: "Temperance",         numeral: "XIV",   image: "images/tarot/temperance.png",
        upright:  "Balance, moderation, patience, purpose, meaning, alchemy, divine timing, flow.",
        reversed: "Imbalance, excess, lack of long-term vision, re-alignment needed, self-indulgence." },
      { name: "The Devil",          numeral: "XV",    image: "images/tarot/devil.png",
        upright:  "Shadow self, attachment, addiction, restriction, materialism, bondage, sexuality.",
        reversed: "Releasing limiting beliefs, exploring darkness, detachment, freedom, reclaiming power." },
      { name: "The Tower",          numeral: "XVI",   image: "images/tarot/tower.png",
        upright:  "Sudden change, upheaval, chaos, revelation, awakening, the necessary destruction of false structures.",
        reversed: "Personal transformation, fear of change, averting disaster, delaying the inevitable." },
      { name: "The Star",           numeral: "XVII",  image: "images/tarot/star.png",
        upright:  "Hope, faith, purpose, renewal, spirituality, serenity, inspiration, healing after hardship.",
        reversed: "Lack of faith, despair, disconnection, discouragement, creative blocks." },
      { name: "The Moon",           numeral: "XVIII", image: "images/tarot/moon.png",
        upright:  "Illusion, fear, the unconscious, intuition, confusion, complexity, the hidden self.",
        reversed: "Release of fear, repressed emotion coming to surface, confusion lifting, inner confusion." },
      { name: "The Sun",            numeral: "XIX",   image: "images/tarot/sun.png",
        upright:  "Positivity, fun, warmth, success, vitality, joy, clarity, confidence, optimism.",
        reversed: "Temporary depression, lack of success, inner child work needed, overly optimistic." },
      { name: "Judgement",          numeral: "XX",    image: "images/tarot/judgement.png",
        upright:  "Judgement, rebirth, inner calling, absolution, awakening, reflection, reckoning.",
        reversed: "Self-doubt, refusal of self-examination, ignoring the call, harsh self-judgement." },
      { name: "The World",          numeral: "XXI",   image: "images/tarot/world.png",
        upright:  "Completion, integration, accomplishment, travel, the end of a major life cycle, wholeness.",
        reversed: "Seeking closure, incomplete goals, short-cuts, delays in completion." }
    ];

    // ── Tab switching ───────────────────────────────────────────────────────
    function switchTarotTab(tab, el) {
      document.querySelectorAll('.tarot-tab').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('tarot-panel-pull').style.display   = tab === 'pull'   ? '' : 'none';
      document.getElementById('tarot-panel-search').style.display  = tab === 'search' ? '' : 'none';
      if (tab === 'search') {
        filterTarotCards('');
        setTimeout(() => document.getElementById('tarot-search-input').focus(), 50);
      }
    }

    // ── Pull Daily Card ─────────────────────────────────────────────────────
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

      // Sparkle on reversed
      const oldSparkle = displayArea.querySelector(".sparkle");
      if (oldSparkle) oldSparkle.remove();
      if (isReversed) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        img.insertAdjacentElement("afterend", sparkle);
      }

      // Show meaning box
      meaningBox.style.display = 'block';
      meaningBox.innerHTML = \`
        <div class="tm-upright">
          <div class="tm-label">⬆ Upright</div>
          <div class="tm-keywords">\${card.upright}</div>
        </div>
        <div class="tm-reversed">
          <div class="tm-label">⬇ Reversed</div>
          <div class="tm-keywords">\${card.reversed}</div>
        </div>
      \`;
    }

    // ── Save Reading ────────────────────────────────────────────────────────
    function saveReading() {
      const cardName = document.getElementById("tarot-card-name").textContent.trim();
      if (cardName === "Your card will appear here") {
        alert("Please pull a card first before saving your reading!");
        return;
      }
      html2canvas(document.querySelector(".tarot-card-display"), {
        backgroundColor: null, useCORS: true
      }).then(canvas => {
        const link    = document.createElement("a");
        link.download = "tarot-reading.png";
        link.href     = canvas.toDataURL("image/png");
        link.click();
      }).catch(() => alert("Sorry, the reading couldn't be saved. Please try again."));
    }

    // ── Card Search ─────────────────────────────────────────────────────────
    function filterTarotCards(query) {
      const resultsEl = document.getElementById('tarot-search-results');
      const detailEl  = document.getElementById('tarot-search-detail');
      detailEl.style.display = 'none';

      const q       = query.trim().toLowerCase();
      const matches = q === ''
        ? tarotDeck
        : tarotDeck.filter(c => c.name.toLowerCase().includes(q));

      if (matches.length === 0) {
        resultsEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.88rem;padding:0.5rem 0;">No cards found — try a different name.</p>';
        return;
      }

      resultsEl.innerHTML = matches.map((card, i) => {
        const idx = tarotDeck.indexOf(card);
        return \`<button class="tarot-result-btn" onclick="showCardDetail(\${idx})">
          <span class="tr-num">\${card.numeral}</span>
          \${card.name}
        </button>\`;
      }).join('');
    }

    function showCardDetail(idx) {
      const card    = tarotDeck[idx];
      const detail  = document.getElementById('tarot-search-detail');
      const results = document.getElementById('tarot-search-results');

      results.style.display = 'none';
      detail.style.display  = 'block';

      detail.innerHTML = \`
        <button class="tsd-back-btn" onclick="backToResults()">← Back to all cards</button>
        <div class="tsd-inner">
          <div class="tsd-img-wrap">
            <img src="\${card.image}" alt="\${card.name}" />
          </div>
          <div class="tsd-content">
            <div class="tsd-numeral">\${card.numeral} · Major Arcana</div>
            <div class="tsd-name">\${card.name}</div>
            <div class="tsd-block tsd-upright">
              <div class="tsd-block-label">⬆ Upright Meanings</div>
              <p>\${card.upright}</p>
            </div>
            <div class="tsd-block tsd-reversed">
              <div class="tsd-block-label">⬇ Reversed Meanings</div>
              <p>\${card.reversed}</p>
            </div>
          </div>
        </div>
      \`;
    }
