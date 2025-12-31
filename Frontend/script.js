<script>
/* =========================================================
   SMART INVENTORY INSIGHTS – DEMO MODE SCRIPT
   Backend-free, mock AI responses for MVP presentation
========================================================= */

// ------------------ ELEMENT REFERENCES ------------------
const imageInput = document.getElementById("image");
const previewContainer = document.getElementById("previewContainer");
const analyzeBtn = document.getElementById("analyzeBtn");
const loader = document.getElementById("loader");
const dashboard = document.getElementById("dashboard");

const totalItemsEl = document.getElementById("totalItems");
const reorderCountEl = document.getElementById("reorderCount");
const lowStockCountEl = document.getElementById("lowStockCount");
const historyBody = document.getElementById("historyBody");

const captureBtn = document.getElementById("captureBtn");
const video = document.getElementById("camera");
const snapshot = document.getElementById("snapshot");
const cameraPreview = document.getElementById("cameraPreview");

let history = [];
let stockChart;

// ------------------ MOCK AI DATA ------------------
function getMockAIResults() {
  return [
    {
      item: "Maggi Noodles",
      condition: "Good",
      stock: 12,
      recommended_action: "Low stock – reorder soon"
    },
    {
      item: "Biscuits Pack",
      condition: "Damaged",
      stock: 5,
      recommended_action: "Reorder immediately"
    },
    {
      item: "Soft Drink Bottle",
      condition: "Good",
      stock: 20,
      recommended_action: "Sufficient stock"
    }
  ];
}

// ------------------ IMAGE PREVIEW ------------------
imageInput.addEventListener("change", () => {
  previewContainer.innerHTML = "";
  Array.from(imageInput.files).forEach(file => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.className = "w-32 h-32 object-contain border rounded";
    previewContainer.appendChild(img);
  });
});

// ------------------ ANALYZE (DEMO MODE) ------------------
analyzeBtn.addEventListener("click", () => {
  if (!imageInput.files.length) {
    alert("Please upload at least one image");
    return;
  }

  loader.classList.remove("hidden");
  dashboard.classList.add("hidden");

  // ⏳ Simulate AI processing delay
  setTimeout(() => {
    const demoResults = getMockAIResults();

    history.push(...demoResults);
    renderHistory();
    updateDashboard();

    loader.classList.add("hidden");
    dashboard.classList.remove("hidden");
  }, 1500);
});

// ------------------ RENDER HISTORY TABLE ------------------
function renderHistory() {
  historyBody.innerHTML = "";

  history.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${entry.item}</td>
      <td class="border px-4 py-2">${entry.condition}</td>
      <td class="border px-4 py-2">${entry.stock}</td>
      <td class="border px-4 py-2 font-bold ${
        entry.recommended_action.toLowerCase().includes("reorder")
          ? "text-red-600"
          : entry.recommended_action.toLowerCase().includes("low")
          ? "text-yellow-600"
          : "text-green-600"
      }">
        ${entry.recommended_action}
      </td>
    `;
    historyBody.appendChild(row);
  });
}

// ------------------ DASHBOARD UPDATE ------------------
function updateDashboard() {
  const total = history.length;
  const reorder = history.filter(i =>
    i.recommended_action.toLowerCase().includes("reorder")
  ).length;
  const low = history.filter(i =>
    i.recommended_action.toLowerCase().includes("low")
  ).length;

  totalItemsEl.textContent = total;
  reorderCountEl.textContent = reorder;
  lowStockCountEl.textContent = low;

  const labels = history.map(i => i.item);
  const data = history.map(i => i.stock);

  if (stockChart) stockChart.destroy();

  const ctx = document.getElementById("stockChart").getContext("2d");
  stockChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Stock Level",
          data: data,
          backgroundColor: "rgba(59, 130, 246, 0.7)"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// ------------------ CAMERA ACCESS ------------------
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(() => {
    console.warn("Camera access denied");
  });

// ------------------ CAMERA CAPTURE (DEMO MODE) ------------------
captureBtn.addEventListener("click", () => {
  const ctx = snapshot.getContext("2d");
  ctx.drawImage(video, 0, 0, snapshot.width, snapshot.height);

  const img = document.createElement("img");
  img.src = snapshot.toDataURL("image/png");
  img.className = "w-32 h-32 object-contain border rounded";

  cameraPreview.innerHTML = "";
  cameraPreview.appendChild(img);

  loader.classList.remove("hidden");
  dashboard.classList.add("hidden");

  setTimeout(() => {
    const demoResults = getMockAIResults();
    history.push(...demoResults);
    renderHistory();
    updateDashboard();

    loader.classList.add("hidden");
    dashboard.classList.remove("hidden");
  }, 1500);
});

// ------------------ REAL-TIME CLOCK ------------------
function updateClock() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ------------------ QUOTES ------------------
const quotes = [
  "Work smarter, not harder! 💪",
  "Every stock item matters 📦",
  "AI makes inventory intelligent 🤖",
  "Predict today, prevent tomorrow 🚀",
  "Smart inventory, smart business ⚡"
];

function randomQuote() {
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
}
setInterval(randomQuote, 8000);
randomQuote();
</script>
