// ===== 1. Diagnostic Quiz with 3-Axis Breakdown & Receipt =====
const quizData = [
  {
    q: "01. How soon after waking up do you check social media or short-form videos?",
    axis: "night",
    options: [
      { text: "Only after breakfast and morning routine", score: 0 },
      { text: "Within 15–30 minutes of waking up", score: 6 },
      { text: "Still in bed, scrolling for 15+ minutes", score: 12 },
      { text: "Immediately upon turning off my alarm", score: 17 }
    ]
  },
  {
    q: "02. You unlock your phone to reply to one text, then realize 30 minutes vanished on Reels/Shorts. How frequent is this?",
    axis: "focus",
    options: [
      { text: "Rarely—I stay intentional with my phone", score: 0 },
      { text: "Once or twice a week", score: 6 },
      { text: "Almost every single day", score: 12 },
      { text: "Multiple times daily; I constantly lose track of time", score: 17 }
    ]
  },
  {
    q: "03. When watching a 15-minute lecture or reading a long article, how does your brain react?",
    axis: "focus",
    options: [
      { text: "Calm and focused from start to finish", score: 0 },
      { text: "I need 1.5x speed to avoid getting bored", score: 6 },
      { text: "Strong urge to switch tabs or check my phone midway", score: 12 },
      { text: "If there is no hook in 20 seconds, I quit immediately", score: 17 }
    ]
  },
  {
    q: "04. Waiting in line or eating alone without your phone feels:",
    axis: "fomo",
    options: [
      { text: "Peaceful—a welcome break for my eyes", score: 0 },
      { text: "Slightly dull, though manageable", score: 6 },
      { text: "Restless—my hand automatically reaches for my pocket", score: 12 },
      { text: "Unbearable; I cannot even eat without a video playing", score: 16 }
    ]
  },
  {
    q: "05. When you say 'just 5 more minutes of scrolling before sleep,' what happens?",
    axis: "night",
    options: [
      { text: "I put the phone down on time", score: 0 },
      { text: "10–15 extra minutes", score: 6 },
      { text: "30–60 minutes, leaving my brain wired", score: 12 },
      { text: "Scrolling past 2 AM and regretting it next morning", score: 17 }
    ]
  },
  {
    q: "06. Muting all non-essential notifications for 24 hours makes you feel:",
    axis: "fomo",
    options: [
      { text: "Normal—my notifications are already muted", score: 0 },
      { text: "Slightly worried about missing updates", score: 6 },
      { text: "Anxious—I would manually refresh apps anyway", score: 12 },
      { text: "Disconnected from everything happening around me", score: 16 }
    ]
  }
];

let qIdx = 0;
let totalScore = 0;
let axisScores = { night: 0, focus: 0, fomo: 0 };

function renderQuestion() {
  const item = quizData[qIdx];
  document.getElementById("q-step").textContent = `STEP 0${qIdx + 1} / 0${quizData.length}`;
  const pct = Math.round(((qIdx + 1) / quizData.length) * 100);
  document.getElementById("q-percent").textContent = `${pct}%`;
  document.getElementById("progress-bar").style.width = `${pct}%`;
  document.getElementById("question-title").textContent = item.q;

  const stack = document.getElementById("options-stack");
  stack.innerHTML = "";
  item.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt.text;
    btn.onclick = () => {
      totalScore += opt.score;
      axisScores[item.axis] += opt.score;
      qIdx++;
      if (qIdx < quizData.length) renderQuestion();
      else renderDiagnosis();
    };
    stack.appendChild(btn);
  });
}

function renderDiagnosis() {
  document.getElementById("quiz-panel").classList.add("hidden");
  document.getElementById("result-panel").classList.remove("hidden");

  document.getElementById("score-val").textContent = totalScore;
  document.getElementById("receipt-id").textContent = `#DETOX-${Math.floor(1000 + Math.random() * 9000)}`;

  const dailyHours = (1.2 + (totalScore / 100) * 4.8).toFixed(1);
  const yearsLost = ((dailyHours * 365 * 10) / 8760).toFixed(1);
  document.getElementById("years-lost").textContent = `${yearsLost} Full Years`;
  document.getElementById("opportunity-cost").textContent =
    `At ~${dailyHours} hrs/day, you will spend ${yearsLost} continuous years scrolling—enough time to master 2 programming languages and read 180+ books.`;

  const nightPct = Math.min(100, Math.round((axisScores.night / 34) * 100));
  const focusPct = Math.min(100, Math.round((axisScores.focus / 34) * 100));
  const fomoPct = Math.min(100, Math.round((axisScores.fomo / 32) * 100));

  document.getElementById("stat-night").textContent = `${nightPct}%`;
  document.getElementById("stat-focus").textContent = `${focusPct}%`;
  document.getElementById("stat-fomo").textContent = `${fomoPct}%`;

  setTimeout(() => {
    document.getElementById("bar-night").style.width = `${nightPct}%`;
    document.getElementById("bar-focus").style.width = `${focusPct}%`;
    document.getElementById("bar-fomo").style.width = `${fomoPct}%`;
  }, 100);

  const badge = document.getElementById("diagnosis-badge");
  const summary = document.getElementById("diagnosis-summary");

  if (totalScore <= 30) {
    badge.textContent = "LOW RISK // AUTONOMOUS MIND";
    badge.style.background = "#15803d";
    summary.textContent = "You control your devices rather than letting feeds dictate your mood. Your baseline attention span remains resilient.";
  } else if (totalScore <= 65) {
    badge.textContent = "MODERATE RISK // FRAGMENTED FOCUS";
    badge.style.background = "#0047ff";
    summary.textContent = "You handle deadlines well, but fatigue or boredom quickly triggers automatic scrolling loops.";
  } else {
    badge.textContent = "HIGH RISK // DOPAMINE HIJACK";
    badge.style.background = "#e63946";
    summary.textContent = "High-frequency visual novelty has lowered your tolerance for deep reading and sustained problem-solving.";
  }
}

function generateReceipt() {
  const checked = document.querySelectorAll("#pledge-list input:checked");
  if (checked.length < 2) {
    alert("Please select at least 2 commitments to sign your Detox Protocol.");
    return;
  }
  const stamp = document.getElementById("signed-stamp");
  document.getElementById("stamp-date").textContent = new Date().toLocaleDateString("en-US");
  stamp.classList.remove("hidden");
}

function resetQuiz() {
  qIdx = 0;
  totalScore = 0;
  axisScores = { night: 0, focus: 0, fomo: 0 };
  document.getElementById("signed-stamp").classList.add("hidden");
  document.querySelectorAll("#pledge-list input").forEach(cb => cb.checked = false);
  document.getElementById("result-panel").classList.add("hidden");
  document.getElementById("quiz-panel").classList.remove("hidden");
  renderQuestion();
}

renderQuestion();

// ===== 2. Focus Lab: Tab Switcher + 4x4 Working Memory Grid =====
function switchTab(tab) {
  document.getElementById("tab-memory").classList.toggle("active", tab === "memory");
  document.getElementById("tab-timer").classList.toggle("active", tab === "timer");
  document.getElementById("box-memory").classList.toggle("hidden", tab !== "memory");
  document.getElementById("box-timer").classList.toggle("hidden", tab !== "timer");
}

let memLevel = 1;
let bestLevel = 0;
let targetTiles = [];
let userSelections = [];
let canClickGrid = false;

const fakeNotifications = [
  { app: "INSTAGRAM", msg: "@alex_chen mentioned you in a story." },
  { app: "TIKTOK", msg: "New viral clip from a creator you follow!" },
  { app: "THREADS", msg: "Your post got 42 new replies. Tap to view." },
  { app: "YOUTUBE", msg: "Recommended: 'Why You Are Always Tired' (0:58)" },
  { app: "MESSAGES", msg: "Group Chat (14 unread messages)" }
];

// Build initial 4x4 grid
function initMatrixGrid() {
  const grid = document.getElementById("matrix-grid");
  grid.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement("div");
    tile.className = "matrix-tile";
    tile.dataset.index = i;
    tile.onclick = () => handleTileClick(i, tile);
    grid.appendChild(tile);
  }
}

function startMemoryRound() {
  canClickGrid = false;
  userSelections = [];
  targetTiles = [];
  document.getElementById("notif-layer").innerHTML = "";
  document.getElementById("start-mem-btn").disabled = true;

  const tileCount = Math.min(9, 3 + memLevel);
  // 每一關顯示時間減少 250ms，最快縮短到 500ms (0.5秒)
  const flashDuration = Math.max(500, 1750 - memLevel * 250);

  document.getElementById("mem-level").textContent = memLevel;
  document.getElementById("mem-target-count").textContent = tileCount;
  document.getElementById("memory-status").textContent = 
    `MEMORIZE THE BLUE TILES (${(flashDuration / 1000).toFixed(2)}s)...`;

  const tiles = document.querySelectorAll(".matrix-tile");
  tiles.forEach(t => t.className = "matrix-tile");

  while (targetTiles.length < tileCount) {
    const rand = Math.floor(Math.random() * 16);
    if (!targetTiles.includes(rand)) targetTiles.push(rand);
  }

  targetTiles.forEach(idx => tiles[idx].classList.add("highlight"));

  // 依據 flashDuration 動態熄滅格子
  setTimeout(() => {
    tiles.forEach(t => t.classList.remove("highlight"));
    canClickGrid = true;
    document.getElementById("memory-status").textContent = "NOW RECALL AND CLICK THE TILES!";
    spawnDistractions(Math.min(4, memLevel));
  }, flashDuration);
}

function spawnDistractions(count) {
  const arena = document.getElementById("memory-arena");
  const layer = document.getElementById("notif-layer");
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      if (!canClickGrid) return;
      const item = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      const div = document.createElement("div");
      div.className = "fake-notif";
      div.innerHTML = `<strong>${item.app} &bull; NOW</strong>${item.msg}`;
      div.style.left = `${Math.random() * (arena.clientWidth - 250)}px`;
      div.style.top = `${Math.random() * (arena.clientHeight - 80)}px`;
      layer.appendChild(div);
    }, i * 350);
  }
}

function handleTileClick(idx, tileEl) {
  if (!canClickGrid || userSelections.includes(idx)) return;

  if (targetTiles.includes(idx)) {
    tileEl.classList.add("correct");
    userSelections.push(idx);

    if (userSelections.length === targetTiles.length) {
      canClickGrid = false;
      document.getElementById("notif-layer").innerHTML = "";
      if (memLevel > bestLevel) {
        bestLevel = memLevel;
        document.getElementById("mem-best").textContent = bestLevel;
      }
      document.getElementById("memory-status").textContent = `LEVEL ${memLevel} CLEARED! READY FOR LEVEL ${memLevel + 1}.`;
      memLevel++;
      document.getElementById("start-mem-btn").textContent = `Start Level ${memLevel}`;
      document.getElementById("start-mem-btn").disabled = false;
    }
  } else {
    tileEl.classList.add("wrong");
    canClickGrid = false;
    document.getElementById("notif-layer").innerHTML = "";
    // Reveal missed tiles
    const tiles = document.querySelectorAll(".matrix-tile");
    targetTiles.forEach(tIdx => {
      if (!userSelections.includes(tIdx)) tiles[tIdx].classList.add("highlight");
    });
    document.getElementById("memory-status").textContent = `MEMORY DISRUPTED AT LEVEL ${memLevel}! DISTRACTIONS BROKE YOUR RECALL.`;
    memLevel = 1;
    document.getElementById("start-mem-btn").textContent = "Retry From Level 1";
    document.getElementById("start-mem-btn").disabled = false;
  }
}

initMatrixGrid();

// ===== 3. 25-Min Detox Timer =====
let detoxSeconds = 25 * 60;
let detoxInterval = null;

function renderClock() {
  const m = Math.floor(detoxSeconds / 60);
  const s = detoxSeconds % 60;
  document.getElementById("clock-face").textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function setTimerMinutes(mins) {
  pauseDetoxClock();
  detoxSeconds = mins * 60;
  renderClock();
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.includes(mins));
  });
}

function startDetoxClock() {
  if (detoxInterval) return;
  document.getElementById("clock-caption").textContent = "Session active. Stay offline until the clock hits 00:00.";
  detoxInterval = setInterval(() => {
    if (detoxSeconds > 0) {
      detoxSeconds--;
      renderClock();
    } else {
      pauseDetoxClock();
      document.getElementById("clock-caption").textContent = "Session complete! Dopamine baseline restored.";
    }
  }, 1000);
}

function pauseDetoxClock() {
  clearInterval(detoxInterval);
  detoxInterval = null;
  document.getElementById("clock-caption").textContent = "Timer paused.";
}

function resetDetoxClock() {
  pauseDetoxClock();
  detoxSeconds = 25 * 60;
  renderClock();
  document.getElementById("clock-caption").textContent = "Place your phone face-down. Zero notifications allowed.";
}

// ===== 4. Algorithm Echo Chamber Simulator =====
const initialFeed = [
  { cat: "TECH & CODING", title: "How C++ Memory Allocation Works in 60s", desc: "Educational breakdown of pointers and stack vs heap." },
  { cat: "RAGEBAIT & DRAMA", title: "Why Everyone in Your Major Is Wrong About AI", desc: "Polarizing hot take engineered to trigger angry comments." },
  { cat: "LATE-NIGHT FOOD", title: "3,000-Calorie Cheese Burger ASMR Mukbang", desc: "High-sensory visual stimulation triggering late-night cravings." },
  { cat: "FITNESS SCIENCE", title: "Optimal Bench Press Hypertrophy Volume", desc: "Evidence-based training breakdown with zero fluff." },
  { cat: "CELEBRITY GOSSIP", title: "Streamer Drama Exposed: Leaked Chat Logs!", desc: "Zero real-world value, maximum curiosity gap." },
  { cat: "EXTREME CLIPS", title: "Top 10 Near-Miss Stunts Caught on Camera", desc: "Fast-paced adrenaline spikes every 3 seconds." }
];

const echoPool = {
  "TECH & CODING": [
    "10 VS Code Shortcuts You Didn't Know",
    "Learn Python in 45 Seconds (Part 14)",
    "Why Rust Is Replacing C++ Forever?!",
    "Day in the Life of a Silicon Valley Intern",
    "Stop Using For-Loops Like This!",
    "Build a Startup in 1 Weekend with AI"
  ],
  "RAGEBAIT & DRAMA": [
    "Unpopular Opinion That Will Make You Furious",
    "Why University Degrees Are Completely Useless Now",
    "Influencer Apology Video Goes Terribly Wrong",
    "5 Red Flags That Prove Your Friends Are Fake",
    "This Viral Trend Is Ruining Gen-Z",
    "Debate Turns Into Screaming Match Live"
  ],
  "LATE-NIGHT FOOD": [
    "Giant Spicy Ramen Challenge at 2 AM",
    "Street Food Vendor Pours 2kg Melted Cheese",
    "Testing the Most Expensive Steak in Tokyo",
    "Crispy Fried Chicken Crunch Compilation",
    "10-Layer Chocolate Lava Cake Slice",
    "Midnight Night Market Tour in Taipei"
  ],
  "FITNESS SCIENCE": [
    "Stop Doing Bench Press Like This!",
    "3 Supplements That Actually Work (Science)",
    "How to Hit 100kg Bench Press Faster",
    "Why Your Protein Intake Is All Wrong",
    "5-Minute Ab Workout That Burns Fat",
    "Natty or Not? Analyzing Viral Transformations"
  ],
  "CELEBRITY GOSSIP": [
    "You Won't Believe Who Just Unfollowed Who!",
    "Secret Relationship Rumors Confirmed?!",
    "Red Carpet Outfit Disaster Goes Viral",
    "Leaked DMs Reveal True Personality",
    "Top 5 Richest Creators You Never Heard Of",
    "Why Everyone Is Canceling This Creator Today"
  ],
  "EXTREME CLIPS": [
    "Parkour Jump Across 20-Story Rooftop",
    "Dashcam Compilation: Inches From Disaster",
    "Wingsuit Flying Through Narrow Cave",
    "Skateboarder Lands Impossible 15-Stair Trick",
    "Surfing a 80-Foot Monster Wave",
    "Most Intense MotoGP Overtakes Ever"
  ]
};

let echoClickCount = 0;
let categoryCounts = {};

function renderEchoGrid(items) {
  const grid = document.getElementById("echo-grid");
  grid.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = item.locked ? "video-card locked" : "video-card";
    card.innerHTML = `
      <div>
        <span class="v-cat mono">${item.locked ? "LOCKED TOPIC // " : ""}${item.cat}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="v-action mono">Watch Video &rarr;</div>
    `;
    card.onclick = () => handleVideoClick(item.cat);
    grid.appendChild(card);
  });
}

function handleVideoClick(cat) {
  echoClickCount++;
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  document.getElementById("echo-clicks").textContent = echoClickCount;

  // If user clicks the same category twice, lock them into an Echo Chamber
  if (categoryCounts[cat] >= 2) {
    document.getElementById("echo-diversity").textContent = "16%";
    const statusEl = document.getElementById("echo-status");
    statusEl.textContent = `TRAPPED IN [${cat}] ECHO CHAMBER`;
    statusEl.className = "status-trapped";

    const trappedItems = echoPool[cat].map((title) => ({
      cat: cat,
      title: title,
      desc: "Algorithm detected your preference and eliminated all other viewpoints from your feed.",
      locked: true
    }));
    renderEchoGrid(trappedItems);
  } else {
    // Partially bias the feed after 1st click
    document.getElementById("echo-diversity").textContent = "65%";
    const biasedItems = initialFeed.map((item, idx) => {
      if (idx % 2 === 0) {
        return {
          cat: cat,
          title: echoPool[cat][idx],
          desc: "Recommended because you just watched a similar video.",
          locked: false
        };
      }
      return item;
    });
    renderEchoGrid(biasedItems);
  }
}

function resetEchoChamber() {
  echoClickCount = 0;
  categoryCounts = {};
  document.getElementById("echo-clicks").textContent = "0";
  document.getElementById("echo-diversity").textContent = "100%";
  const statusEl = document.getElementById("echo-status");
  statusEl.textContent = "BALANCED FEED";
  statusEl.className = "status-ok";
  renderEchoGrid(initialFeed);
}

renderEchoGrid(initialFeed);