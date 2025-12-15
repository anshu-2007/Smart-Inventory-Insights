async function upload() {
  const file = document.getElementById("image").files[0];
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("result").innerText =
    JSON.stringify(data, null, 2);
}
const resultDiv = document.getElementById("result");
resultDiv.innerText = JSON.stringify(data, null, 2);

// Show cache status if exists
if (data.cached !== undefined) {
  const statusDiv = document.getElementById("status");
  statusDiv.innerText = data.cached
    ? "⚡ Result served from cache"
    : "🧠 Gemini AI analysis";
}
const captureBtn = document.getElementById("captureBtn");
const video = document.getElementById("camera");
const snapshot = document.getElementById("snapshot");
const cameraPreview = document.getElementById("cameraPreview");

// Make sure loader and dashboard exist
const loader = document.getElementById("loader");
const dashboard = document.getElementById("dashboard");

// Access camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { video.srcObject = stream; })
  .catch(err => { alert("Camera access denied!"); console.error(err); });

// Capture and send image
captureBtn.addEventListener("click", async () => {
  // Ensure video is ready
  if (!video.videoWidth || !video.videoHeight) {
    alert("Video not ready yet. Try again.");
    return;
  }

  // Draw video frame to canvas
  snapshot.width = video.videoWidth;
  snapshot.height = video.videoHeight;
  const ctx = snapshot.getContext("2d");
  ctx.drawImage(video, 0, 0, snapshot.width, snapshot.height);

  // Show preview
  const img = document.createElement("img");
  img.src = snapshot.toDataURL("image/png");
  img.className = "w-32 h-32 object-contain border rounded";
  cameraPreview.innerHTML = ""; // clear previous preview
  cameraPreview.appendChild(img);

  // Send to backend
  loader.classList.remove("hidden");
  dashboard.classList.add("hidden");

  try {
    const res = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: snapshot.toDataURL("image/png") })
    });
    const data = await res.json();
    loader.classList.add("hidden");

    if (data.error) { alert(data.error); return; }

    data.results.forEach(item => history.push(item));

    // Update history table
    historyBody.innerHTML = "";
    history.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border px-4 py-2">${entry.item}</td>
        <td class="border px-4 py-2">${entry.condition}</td>
        <td class="border px-4 py-2">${entry.stock}</td>
        <td class="border px-4 py-2 font-bold ${entry.recommended_action.toLowerCase().includes("reorder") ? "text-red-600" : entry.recommended_action.toLowerCase().includes("low") ? "text-yellow-600" : "text-green-600"}">
          ${entry.recommended_action}
        </td>`;
      historyBody.appendChild(row);
    });

    updateDashboard();
    dashboard.classList.remove("hidden");

  } catch (err) {
    loader.classList.add("hidden");
    alert("Backend error");
    console.error(err);
  }
});
analyzeBtn.addEventListener("click", async () => {
  if (!imageInput.files.length) {
    alert("Select at least one image");
    return;
  }

  loader.classList.remove("hidden");

  const formData = new FormData();
  Array.from(imageInput.files).forEach(f => formData.append("images", f));

  try {
    const res = await fetch("http://127.0.0.1:5000/analyze", { method: "POST", body: formData });
    const data = await res.json();
    loader.classList.add("hidden");

    if (data.error) { alert(data.error); return; }

    // Open new tab
    const newTab = window.open("", "_blank");
    newTab.document.write(`
      <html>
      <head>
        <title>Inventory Result</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.3/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50 p-6 font-sans">
        <h1 class="text-3xl font-bold text-center text-blue-700 mb-6">Smart Inventory Result</h1>

        <div class="flex flex-wrap justify-center gap-4 mb-6">
          ${Array.from(imageInput.files).map(f => `<img src="${URL.createObjectURL(f)}" class="w-32 h-32 object-contain border rounded">`).join('')}
        </div>

        <table class="w-full table-auto text-left border-collapse mb-6 bg-white shadow-xl rounded-2xl">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Item</th>
              <th class="px-4 py-2">Condition</th>
              <th class="px-4 py-2">Stock</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            ${data.results.map(entry => `
              <tr class="border-b">
                <td class="px-4 py-2">${entry.item}</td>
                <td class="px-4 py-2">${entry.condition}</td>
                <td class="px-4 py-2">${entry.stock}</td>
                <td class="px-4 py-2 font-bold ${entry.recommended_action.toLowerCase().includes("reorder") ? "text-red-600" : entry.recommended_action.toLowerCase().includes("low") ? "text-yellow-600" : "text-green-600"}">
                  ${entry.recommended_action}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <canvas id="stockChart" class="mb-6"></canvas>

        <script>
          const ctx = document.getElementById('stockChart').getContext('2d');
          const labels = ${JSON.stringify(data.results.map(i => i.item))};
          const stocks = ${JSON.stringify(data.results.map(i => i.stock))};
          new Chart(ctx, {
            type: 'bar',
            data: { labels: labels, datasets: [{ label: 'Stock', data: stocks, backgroundColor: 'rgba(59, 130, 246, 0.7)' }] },
            options: { responsive: true, plugins: { legend: { display: false } } }
          });
        </script>

      </body>
      </html>
    `);
  } catch (err) {
    loader.classList.add("hidden");
    alert("Backend error");
    console.error(err);
  }
});
