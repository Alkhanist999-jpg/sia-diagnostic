const STORAGE_KEY = "sia-stability-diagnostic-v2";
const PROCESSING_DELAY_MS = 1600;

const responseScale = [
  { key: "A", label: "A", value: 0 },
  { key: "B", label: "B", value: 1 },
  { key: "C", label: "C", value: 2 },
  { key: "D", label: "D", value: 3 },
];

const scoreMaps = {
  founderLoad: { A: 4, B: 3, C: 2, D: 1 },
  capacity: { A: 1, B: 2, C: 3, D: 4 },
  behaviour: { A: 4, B: 3, C: 2, D: 1 },
};

const metricLabels = {
  founderLoad: "Founder Load",
  capacity: "Capacity",
  behaviour: "Pressure Behaviour",
};

const practiceBulletMap = {
  vision: ["repeated clarification"],
  governance: ["reactive decisions", "founder intervention", "missed or delayed follow-through"],
  delivery: ["founder intervention", "growth creating more strain than the structure can hold"],
  income: ["reactive decisions", "founder intervention"],
  financial_model: ["reactive decisions", "growth creating more strain than the structure can hold"],
  systems: ["founder intervention", "missed or delayed follow-through"],
};

const statusConfig = {
  pressure_hotspot: {
    label: "Pressure Hotspot",
    className: "status-high",
    summary: "This area is returning to the founder because structure is not holding enough load.",
  },
  emerging_pressure: {
    label: "Emerging Pressure",
    className: "status-rising",
    summary:
      "This area is beginning to create pressure. Structure exists, but it is not yet strong enough to hold consistently under demand.",
  },
  hidden_pressure: {
    label: "Hidden Pressure",
    className: "status-underdeveloped",
    summary:
      "This area appears balanced, but the founder may still be carrying more weight than the system can reliably absorb.",
  },
  structurally_held: {
    label: "Structurally Held",
    className: "status-stable",
    summary:
      "This area appears supported by structure, but it should still be checked for consistency, documentation, and resilience under growth.",
  },
};

const pillars = [
  {
    id: "vision",
    name: "Vision → Clarity",
    rankOrder: 6,
    priorityReason:
      "Direction is still being held through people rather than through a stable shared frame.",
    pressureReduced:
      "This reduces the pressure of repeated clarification, reactive reprioritising, and decisions routing back to the founder.",
    missingStructure:
      "What is missing is a clear and consistently used structure for direction, priorities, and focus under pressure.",
    ifNotAddressed:
      "If this is not addressed, direction will keep returning to the founder, slowing delegation and making priorities harder to hold under pressure.",
    questions: [
      {
        id: 1,
        metric: "founderLoad",
        text: "When direction needs to be clarified:",
        options: [
          "The founder sets direction directly",
          "The founder leads with some input",
          "The team contributes",
          "Direction is already clear and stable",
        ],
      },
      {
        id: 2,
        metric: "capacity",
        text: "How are priorities held?",
        options: [
          "In the founder’s head",
          "Partially written",
          "Documented but inconsistently used",
          "Clearly documented and used",
        ],
      },
      {
        id: 3,
        metric: "behaviour",
        text: "When things get busy:",
        options: [
          "Focus shifts constantly",
          "Work increases but direction blurs",
          "Priorities mostly hold",
          "Priorities guide decisions clearly",
        ],
      },
    ],
  },
  {
    id: "governance",
    name: "Governance → Accountability",
    rankOrder: 2,
    priorityReason:
      "Decision-making and follow-through are still too likely to return to the founder.",
    pressureReduced:
      "This reduces the pressure of founder-led escalation, chasing, and informal accountability.",
    missingStructure:
      "What is missing is a dependable structure for decisions, ownership, and correction when work slips.",
    ifNotAddressed:
      "If this is not addressed, decisions and accountability will continue to move informally, increasing confusion and founder intervention.",
    questions: [
      {
        id: 4,
        metric: "founderLoad",
        text: "When decisions are made:",
        options: [
          "Founder decides alone",
          "Founder decides with input",
          "Shared but informal",
          "Clear decision structure exists",
        ],
      },
      {
        id: 5,
        metric: "capacity",
        text: "Accountability is:",
        options: [
          "Informal",
          "Known but inconsistent",
          "Partially defined",
          "Clearly defined and followed",
        ],
      },
      {
        id: 6,
        metric: "behaviour",
        text: "When something is not done properly:",
        options: [
          "Founder steps in",
          "Reactively addressed",
          "Discussed and corrected",
          "Process handles it",
        ],
      },
    ],
  },
  {
    id: "delivery",
    name: "Delivery → Impact",
    rankOrder: 5,
    priorityReason:
      "Delivery quality is still too exposed to individual intervention when strain appears.",
    pressureReduced:
      "This reduces the pressure of founder troubleshooting, inconsistent delivery, and service strain under growth.",
    missingStructure:
      "What is missing is a stronger structure for delivery process, issue resolution, and demand absorption.",
    ifNotAddressed:
      "If this is not addressed, quality and consistency will rely on people working harder rather than delivery being held by a repeatable model.",
    questions: [
      {
        id: 7,
        metric: "founderLoad",
        text: "When delivery issues arise:",
        options: [
          "Founder fixes them",
          "Founder supports",
          "Team resolves",
          "Systems guide resolution",
        ],
      },
      {
        id: 8,
        metric: "capacity",
        text: "Delivery processes are:",
        options: [
          "Not defined",
          "Known but unwritten",
          "Partially documented",
          "Clearly documented and used",
        ],
      },
      {
        id: 9,
        metric: "behaviour",
        text: "When demand increases:",
        options: [
          "Delivery breaks",
          "Founder steps in more",
          "Team adapts with strain",
          "Systems absorb demand",
        ],
      },
    ],
  },
  {
    id: "income",
    name: "Income → Revenue",
    rankOrder: 4,
    priorityReason:
      "Income momentum is still too dependent on founder attention and response under uncertainty.",
    pressureReduced:
      "This reduces the pressure of reactive income chasing, founder-controlled opportunities, and short-term revenue strain.",
    missingStructure:
      "What is missing is a clearer structure for shared income generation, planning, and activation when funding risk rises.",
    ifNotAddressed:
      "If this is not addressed, income activity will remain reactive and pressure will increase when funding becomes uncertain.",
    questions: [
      {
        id: 10,
        metric: "founderLoad",
        text: "Income generation is driven by:",
        options: [
          "Founder",
          "Founder with support",
          "Shared",
          "Structured system",
        ],
      },
      {
        id: 11,
        metric: "capacity",
        text: "Income activity is:",
        options: [
          "Reactive",
          "Occasional",
          "Somewhat planned",
          "Strategically planned",
        ],
      },
      {
        id: 12,
        metric: "behaviour",
        text: "When funding is uncertain:",
        options: [
          "Activity increases randomly",
          "Founder takes control",
          "Team seeks options",
          "Plan is activated",
        ],
      },
    ],
  },
  {
    id: "financial_model",
    name: "Financial Model → Sustainability",
    rankOrder: 3,
    priorityReason:
      "Financial understanding and response are still too concentrated when risk increases.",
    pressureReduced:
      "This reduces the pressure of instinct-led financial decisions, emergency cuts, and founder-held cost knowledge.",
    missingStructure:
      "What is missing is a stronger structure for shared financial understanding, planning, and strategy-led response.",
    ifNotAddressed:
      "If this is not addressed, sustainability decisions will remain short-term and the organisation may continue accepting work it cannot properly afford.",
    questions: [
      {
        id: 13,
        metric: "founderLoad",
        text: "Financial understanding sits with:",
        options: [
          "Founder only",
          "Founder + one",
          "Small group",
          "Clearly distributed",
        ],
      },
      {
        id: 14,
        metric: "capacity",
        text: "Financial planning is:",
        options: [
          "Minimal",
          "Reactive",
          "Some structure",
          "Clear and forward-looking",
        ],
      },
      {
        id: 15,
        metric: "behaviour",
        text: "When money is tight:",
        options: [
          "Reactive decisions",
          "Cuts without plan",
          "Some structured adjustments",
          "Strategy-led decisions",
        ],
      },
    ],
  },
  {
    id: "systems",
    name: "Systems → Resilience",
    rankOrder: 1,
    priorityReason:
      "Core coordination and pressure absorption are still too likely to rely on people rather than systems.",
    pressureReduced:
      "This reduces the pressure of founder coordination, missed tasks, and strain caused by weak operational flow.",
    missingStructure:
      "What is missing is a more reliable structure for day-to-day coordination, defined systems, and pressure absorption.",
    ifNotAddressed:
      "If this is not addressed, coordination will continue to depend on people remembering, chasing, and absorbing pressure manually.",
    questions: [
      {
        id: 16,
        metric: "founderLoad",
        text: "Day-to-day coordination relies on:",
        options: [
          "Founder",
          "Founder + support",
          "Shared",
          "Systems",
        ],
      },
      {
        id: 17,
        metric: "capacity",
        text: "Systems are:",
        options: [
          "Absent",
          "Informal",
          "Partial",
          "Defined and used",
        ],
      },
      {
        id: 18,
        metric: "behaviour",
        text: "When things get busy:",
        options: [
          "Things get missed",
          "Founder steps in",
          "Team strains",
          "Systems absorb pressure",
        ],
      },
    ],
  },
];

const anchorQuestion = {
  id: 19,
  metric: "anchor",
  pillarId: "anchor",
  pillarName: "Anchor Question",
  text: "If you stepped away for 30 days:",
  options: [
    "Most things stop",
    "Some continue but degrade",
    "Core functions continue",
    "Organisation runs effectively",
  ],
};

const questions = [
  ...pillars.flatMap((pillar) =>
    pillar.questions.map((question) => ({
      ...question,
      pillarId: pillar.id,
      pillarName: pillar.name,
    })),
  ),
  anchorQuestion,
];

const defaultState = () => ({
  screen: "entry",
  questionIndex: 0,
  participantId: generateParticipantId(),
  participant: {
    name: "",
    organisation_name: "",
    role: "",
    email: "",
    date_completed: new Date().toISOString().slice(0, 10),
    diagnostic_stage: "Baseline",
  },
  answers: {},
});

let state = loadState();

const app = document.getElementById("app");
const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", () => {
  state = defaultState();
  persistState();
  render();
});

function loadState() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultState();
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultState(),
      ...parsed,
      participant: {
        ...defaultState().participant,
        ...(parsed.participant || {}),
      },
    };
  } catch (error) {
    return defaultState();
  }
}

function persistState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  restartButton.classList.toggle("hidden", state.screen === "entry");

  switch (state.screen) {
    case "entry":
      renderEntryScreen();
      break;
    case "instructions":
      renderInstructionsScreen();
      break;
    case "details":
      renderDetailsScreen();
      break;
    case "question":
      renderQuestionScreen();
      break;
    case "processing":
      renderProcessingScreen();
      break;
    case "results":
      renderResultsScreen();
      break;
    default:
      state.screen = "entry";
      persistState();
      renderEntryScreen();
  }
}

function cloneTemplate(id) {
  return document.getElementById(id).content.cloneNode(true);
}

function renderEntryScreen() {
  app.replaceChildren(cloneTemplate("entry-screen-template"));
  app.querySelector("[data-action='begin']").addEventListener("click", () => {
    state.screen = "instructions";
    persistState();
    render();
  });
}

function renderInstructionsScreen() {
  app.replaceChildren(cloneTemplate("instruction-screen-template"));
  app.querySelector("[data-action='continue']").addEventListener("click", () => {
    state.screen = "details";
    persistState();
    render();
  });
}

function renderDetailsScreen() {
  app.replaceChildren(cloneTemplate("details-screen-template"));
  const form = document.getElementById("participantForm");

  Object.entries(state.participant).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) {
      field.value = value;
    }
  });

  form.addEventListener("input", () => {
    state.participant = Object.fromEntries(new FormData(form).entries());
    persistState();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state.participant = Object.fromEntries(new FormData(form).entries());
    state.screen = "question";
    state.questionIndex = 0;
    persistState();
    render();
  });
}

function renderQuestionScreen() {
  app.replaceChildren(cloneTemplate("question-screen-template"));
  const question = questions[state.questionIndex];
  const progressText = document.getElementById("progressText");
  const progressBarFill = document.getElementById("progressBarFill");
  const pillarLabel = document.getElementById("pillarLabel");
  const dimensionBadge = document.getElementById("dimensionBadge");
  const questionText = document.getElementById("questionText");
  const responseOptions = document.getElementById("responseOptions");
  const backButton = document.getElementById("backButton");
  const nextButton = document.getElementById("nextButton");
  const answer = state.answers[question.id];

  progressText.textContent = `Question ${state.questionIndex + 1} of ${questions.length}`;
  progressBarFill.style.width = `${((state.questionIndex + 1) / questions.length) * 100}%`;
  pillarLabel.textContent = question.pillarName;
  dimensionBadge.textContent =
    question.metric === "anchor" ? "Founder Dependency Modifier" : metricLabels[question.metric];
  questionText.textContent = question.text;

  responseScale.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(answer === option.key));
    if (answer === option.key) {
      button.classList.add("selected");
    }
    button.innerHTML = `
      <span class="option-letter">${option.label}</span>
      <span class="option-copy">${question.options[option.value]}</span>
    `;
    button.addEventListener("click", () => {
      state.answers[question.id] = option.key;
      persistState();
      renderQuestionScreen();
    });
    responseOptions.appendChild(button);
  });

  backButton.disabled = state.questionIndex === 0;
  nextButton.disabled = typeof answer !== "string";

  backButton.addEventListener("click", () => {
    if (state.questionIndex > 0) {
      state.questionIndex -= 1;
      persistState();
      render();
    }
  });

  nextButton.addEventListener("click", () => {
    if (typeof state.answers[question.id] !== "string") {
      return;
    }

    if (state.questionIndex < questions.length - 1) {
      state.questionIndex += 1;
      persistState();
      render();
      return;
    }

    state.screen = "processing";
    persistState();
    render();
    window.setTimeout(() => {
      state.screen = "results";
      persistState();
      render();
    }, PROCESSING_DELAY_MS);
  });
}

function renderProcessingScreen() {
  app.replaceChildren(cloneTemplate("processing-screen-template"));
}

function renderResultsScreen() {
  const results = calculateResults();
  app.replaceChildren(cloneTemplate("results-screen-template"));

  populateParticipantSummary();
  document.getElementById("overallInterpretation").textContent = results.overallInterpretation;
  document.getElementById("founderDependencyInsight").textContent = results.founderDependencyInsight;
  document.getElementById("whatThisMeansIntro").textContent =
    "If these areas are not strengthened, pressure is likely to keep returning through:";
  renderPracticeBullets(results.practiceBullets);
  document.getElementById("nextActionText").textContent =
    "The next move is to strengthen the top two priority pillars so pressure stops returning to the founder by default.";
  renderStatusLegend();
  renderBarLegend();

  const priorityPillarsContainer = document.getElementById("priorityPillars");
  results.priorityPillars.forEach((pillar, index) => {
    const card = document.createElement("article");
    card.className = "priority-card";
    const status = statusConfig[pillar.statusKey];
    card.innerHTML = `
      <div class="priority-card-header">
        <div>
          <p class="priority-rank">Priority ${index + 1}</p>
          <h4>${pillar.name}</h4>
        </div>
        <span class="status-badge ${status.className}">${status.label}</span>
      </div>
      <div class="priority-card-copy">
        <p><strong>Why this is a priority:</strong> ${pillar.priorityReason}</p>
        <p><strong>What pressure it reduces:</strong> ${pillar.pressureReduced}</p>
        <p><strong>What structure is missing:</strong> ${pillar.missingStructure}</p>
        <p><strong>What happens if this is not addressed:</strong> ${pillar.ifNotAddressed}</p>
      </div>
    `;
    priorityPillarsContainer.appendChild(card);
  });

  const pillarCardsContainer = document.getElementById("pillarCards");
  results.pillarResults.forEach((pillar) => {
    const status = statusConfig[pillar.statusKey];
    const priorityMarker = results.priorityPillars.some((item) => item.id === pillar.id)
      ? `<span class="priority-flag">Priority pillar</span>`
      : "";
    const priorityClass = results.priorityPillars.some((item) => item.id === pillar.id)
      ? " priority-highlight"
      : "";

    const card = document.createElement("article");
    card.className = `pillar-card ${status.className}-card${priorityClass}`;
    card.innerHTML = `
      <div class="pillar-card-top">
        <div>
          <h4>${pillar.name}</h4>
          ${priorityMarker}
        </div>
        <span class="status-badge ${status.className}">${status.label}</span>
      </div>
      <div class="metric-list">
        <div class="metric-row"><span>Composite Load</span><strong>${pillar.compositeLoad.toFixed(1)}</strong></div>
        <div class="metric-row"><span>Capacity</span><strong>${pillar.capacity.toFixed(1)}</strong></div>
        <div class="metric-row"><span>Gap</span><strong>${pillar.gap.toFixed(1)}</strong></div>
        <div class="metric-row"><span>Priority Score</span><strong>${pillar.priorityScore.toFixed(1)}</strong></div>
      </div>
      <div class="mini-bars">
        ${buildBarGroup("Composite Load", pillar.compositeLoad, 5, "load")}
        ${buildBarGroup("Capacity", pillar.capacity, 4, "capacity")}
      </div>
      <div class="gap-indicator">
        <span class="gap-marker ${status.className}"></span>
        <span>Gap indicator: ${pillar.gap.toFixed(1)}</span>
      </div>
      <p class="pillar-language">${pillar.outputLanguage}</p>
      <p>${status.summary}</p>
    `;
    pillarCardsContainer.appendChild(card);
  });

  const chartContainer = document.getElementById("chartContainer");
  results.pillarResults.forEach((pillar) => {
    const isPriority = results.priorityPillars.some((item) => item.id === pillar.id);
    const status = statusConfig[pillar.statusKey];
    const row = document.createElement("article");
    row.className = `chart-row ${status.className}-card${isPriority ? " chart-row-priority" : ""}`;
    row.innerHTML = `
      <div class="chart-label-row">
        <div>
          <strong>${pillar.name}</strong>
          ${isPriority ? `<span class="priority-flag">Priority pillar</span>` : ""}
        </div>
        <span class="gap-indicator"><span class="gap-marker ${status.className}"></span>Gap ${pillar.gap.toFixed(1)}</span>
      </div>
      <div class="chart-bars">
        ${buildBarGroup("Founder Load / Composite Load", pillar.compositeLoad, 5, "load")}
        ${buildBarGroup("Organisational Capacity", pillar.capacity, 4, "capacity")}
      </div>
    `;
    chartContainer.appendChild(row);
  });

  document.getElementById("downloadJsonButton").addEventListener("click", () => {
    downloadFile(
      buildFilename("json"),
      "application/json",
      JSON.stringify(buildExportPayload(results), null, 2),
    );
  });

  document.getElementById("downloadCsvButton").addEventListener("click", () => {
    downloadFile(buildFilename("csv"), "text/csv;charset=utf-8", buildCsv(results));
  });

  document.getElementById("printButton").addEventListener("click", () => {
    window.print();
  });
}

function calculateResults() {
  const founderDependencyModifier = ["A", "B"].includes(state.answers[anchorQuestion.id]) ? 1 : 0;

  const pillarResults = pillars.map((pillar) => {
    const founderLoadQuestion = pillar.questions.find((question) => question.metric === "founderLoad");
    const capacityQuestion = pillar.questions.find((question) => question.metric === "capacity");
    const behaviourQuestion = pillar.questions.find((question) => question.metric === "behaviour");

    const founderLoad = scoreMaps.founderLoad[state.answers[founderLoadQuestion.id]];
    const capacity = scoreMaps.capacity[state.answers[capacityQuestion.id]];
    const pressureBehaviour = scoreMaps.behaviour[state.answers[behaviourQuestion.id]];
    const baseCompositeLoad = (founderLoad + pressureBehaviour) / 2;
    const compositeLoad = baseCompositeLoad + founderDependencyModifier;
    const gap = compositeLoad - capacity;
    const priorityScore = gap * 2 + compositeLoad;
    const statusKey = determineStatus(compositeLoad, gap);

    return {
      id: pillar.id,
      name: pillar.name,
      founderLoad,
      capacity,
      pressureBehaviour,
      compositeLoad,
      gap,
      priorityScore,
      statusKey,
      priorityReason: pillar.priorityReason,
      pressureReduced: pillar.pressureReduced,
      missingStructure: pillar.missingStructure,
      ifNotAddressed: pillar.ifNotAddressed,
      outputLanguage: outputLanguageForStatus(statusKey),
      rankOrder: pillar.rankOrder,
    };
  });

  const priorityPillars = pillarResults
    .slice()
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return a.rankOrder - b.rankOrder;
    })
    .slice(0, 2);

  const hotspotCount = pillarResults.filter((pillar) => pillar.statusKey === "pressure_hotspot").length;
  const hiddenCount = pillarResults.filter((pillar) => pillar.statusKey === "hidden_pressure").length;
  const structurallyHeldCount = pillarResults.filter((pillar) => pillar.statusKey === "structurally_held").length;
  const practiceBullets = buildPracticeBullets(priorityPillars);

  let overallInterpretation =
    "Pressure is distributed across the system, but some of that balance may still rely on people carrying more than structure can reliably hold.";

  if (hotspotCount > 0) {
    overallInterpretation =
      "This map shows clear pressure hotspots where work is returning to the founder because structure is not yet holding enough load.";
  } else if (hiddenCount > 0) {
    overallInterpretation =
      "This map suggests areas that appear balanced on the surface, but the founder is still carrying enough weight for that balance to be fragile.";
  } else if (structurallyHeldCount === pillarResults.length) {
    overallInterpretation =
      "This map suggests the organisation is being supported by structure in each pillar, though that structure may still need strengthening as pressure grows.";
  }

  return {
    pillarResults,
    priorityPillars,
    founderDependencyModifier,
    anchorAnswer: state.answers[anchorQuestion.id],
    overallInterpretation,
    practiceBullets,
    founderDependencyInsight: founderDependencyInsightFromAnswer(state.answers[anchorQuestion.id]),
  };
}

function determineStatus(compositeLoad, gap) {
  if (gap >= 1.5) {
    return "pressure_hotspot";
  }
  if (gap >= 0.5 && gap <= 1.4) {
    return "emerging_pressure";
  }
  if (gap >= -0.5 && gap <= 0.5 && compositeLoad >= 3) {
    return "hidden_pressure";
  }
  return "structurally_held";
}

function outputLanguageForStatus(statusKey) {
  switch (statusKey) {
    case "pressure_hotspot":
      return "Currently dependent on founder.";
    case "emerging_pressure":
      return "Structure not yet holding load.";
    case "hidden_pressure":
      return "Appears stable but may not be sustainable.";
    default:
      return "This area may still depend on individuals rather than being fully embedded in structure.";
  }
}

function founderDependencyInsightFromAnswer(answer) {
  switch (answer) {
    case "A":
      return "Most organisational movement is still highly dependent on the founder. This indicates severe founder dependency.";
    case "B":
      return "Some activity can continue without the founder, but quality, pace, or decision-making may degrade quickly. This indicates high founder dependency.";
    case "C":
      return "Core functions can continue without the founder, but some direction, quality, or coordination may still rely on founder input. This indicates moderate founder dependency.";
    case "D":
      return "The organisation appears able to continue without immediate founder involvement. The next test is whether this remains true under growth pressure.";
    default:
      return "";
  }
}

function buildPracticeBullets(priorityPillars) {
  const bulletSet = new Set();
  priorityPillars.forEach((pillar) => {
    (practiceBulletMap[pillar.id] || []).forEach((bullet) => bulletSet.add(bullet));
  });
  return [
    "repeated clarification",
    "reactive decisions",
    "founder intervention",
    "missed or delayed follow-through",
    "growth creating more strain than the structure can hold",
  ].filter((bullet) => bulletSet.has(bullet));
}

function renderPracticeBullets(bullets) {
  const list = document.getElementById("whatThisMeansList");
  list.replaceChildren();
  bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    list.appendChild(item);
  });
}

function populateParticipantSummary() {
  const summary = document.getElementById("participantSummary");
  const fields = [
    ["Participant", state.participant.name || "Not provided"],
    ["Organisation", state.participant.organisation_name || "Not provided"],
    ["Date", state.participant.date_completed || "Not provided"],
    ["Diagnostic stage", state.participant.diagnostic_stage || "Not provided"],
  ];

  summary.innerHTML = fields
    .map(
      ([label, value]) => `
        <dl class="participant-detail">
          <dt>${label}</dt>
          <dd>${value}</dd>
        </dl>
      `,
    )
    .join("");
}

function renderStatusLegend() {
  const legend = document.getElementById("statusLegend");
  legend.innerHTML = `
    <span class="status-chip red">Pressure Hotspot</span>
    <span class="status-chip orange">Emerging Pressure</span>
    <span class="status-chip yellow">Hidden Pressure</span>
    <span class="status-chip green">Structurally Held</span>
  `;
}

function renderBarLegend() {
  const legend = document.getElementById("barLegend");
  legend.innerHTML = `
    <span class="legend-chip load">Founder Load</span>
    <span class="legend-chip capacity">Organisational Capacity</span>
  `;
}

function buildBarGroup(label, value, maxValue, kind) {
  return `
    <div class="bar-group">
      <div class="bar-label-row">
        <span class="bar-label-name">${label}</span>
        <strong>${value.toFixed(1)}</strong>
      </div>
      <div class="chart-bar-track">
        <div class="chart-bar-fill ${kind}" style="width: ${(value / maxValue) * 100}%"></div>
      </div>
    </div>
  `;
}

function buildExportPayload(results) {
  return {
    participant: {
      participant_id: state.participantId,
      ...state.participant,
    },
    responses: questions.map((question) => ({
      question_id: question.id,
      pillar: question.pillarName,
      metric: question.metric,
      response_value: state.answers[question.id],
    })),
    scores: Object.fromEntries(
      results.pillarResults.flatMap((pillar) => [
        [`${pillar.id}_founder_load`, pillar.founderLoad],
        [`${pillar.id}_capacity`, pillar.capacity],
        [`${pillar.id}_pressure_behaviour`, pillar.pressureBehaviour],
        [`${pillar.id}_composite_load`, round1(pillar.compositeLoad)],
        [`${pillar.id}_gap`, round1(pillar.gap)],
        [`${pillar.id}_priority_score`, round1(pillar.priorityScore)],
        [`${pillar.id}_status`, statusConfig[pillar.statusKey].label],
      ]),
    ),
    overall: {
      founder_dependency_modifier: results.founderDependencyModifier,
      anchor_answer: results.anchorAnswer,
      top_priority_pillar_1: results.priorityPillars[0]?.name || "",
      top_priority_pillar_2: results.priorityPillars[1]?.name || "",
    },
  };
}

function buildCsv(results) {
  const exportPayload = buildExportPayload(results);
  const rows = [
    ["section", "key", "value_1", "value_2", "value_3"],
    ...Object.entries(exportPayload.participant).map(([key, value]) => ["participant", key, value, "", ""]),
    ...Object.entries(exportPayload.scores).map(([key, value]) => ["score", key, value, "", ""]),
    ...Object.entries(exportPayload.overall).map(([key, value]) => ["overall", key, value, "", ""]),
    ...exportPayload.responses.map((response) => [
      "response",
      response.question_id,
      response.pillar,
      response.metric,
      response.response_value,
    ]),
  ];

  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

function buildFilename(extension) {
  const organisationName = (state.participant.organisation_name || "Organisation")
    .trim()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "");
  const date = state.participant.date_completed || new Date().toISOString().slice(0, 10);
  return `SIA_StabilityDiagnostic_${organisationName || "Organisation"}_${date}.${extension}`;
}

function downloadFile(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function generateParticipantId() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : `participant-${Date.now()}`;
}

render();
