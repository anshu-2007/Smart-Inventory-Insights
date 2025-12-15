🔥 Smart Inventory Auditor
GenAI Frontiers Hackathon – Gemini API

A multimodal, AI-powered inventory auditing web application that uses the Gemini API to analyze product images, identify items, assess their condition, and recommend inventory actions in real time.

🚀 Problem Statement
Manual inventory audits are slow, error-prone, and inefficient—especially in retail and warehouse environments. Businesses need a fast, intelligent system that can visually inspect items, understand their condition, and take data-driven inventory decisions.

💡 Solution Overview
Smart Inventory Auditor allows users to:

📸 Capture or upload product images

🧠 Use Gemini’s multimodal reasoning to identify the item and its condition

⚙️ Automatically perform a Function Call to check inventory status

📊 Generate a structured action plan (Reorder / Low Stock / Stock OK)

This creates a resource-efficient AI agent that connects visual understanding with business logic.

✨ Key Features
Multimodal Input – Image upload + live camera capture

Gemini API Integration – Uses gemini-2.5-flash-lite

Function Calling – Inventory lookup logic (mock database)

Structured JSON Output – Clean, machine-readable responses

Real-time Dashboard – Stock summary, charts, and history

Mobile-Friendly – Works on phone and laptop via public URL

🧠 Gemini API – Core Integration (IMPORTANT)
Gemini is the heart of this application.

How Gemini is used:
Accepts image input

Performs visual understanding + reasoning

Returns strict JSON output

Drives inventory decision-making

Example Prompt Strategy:
text
Copy code
You are a smart inventory auditor.
From the image:
1. Identify the product name.
2. Identify the product condition (Good/Damaged).
Respond ONLY in JSON with keys: "item", "condition".
Model Used:
Copy code
gemini-2.5-flash-lite
Chosen for:

High free-tier request limits

Fast multimodal responses

Cost-efficient hackathon usage

🏗️ Tech Stack
Layer	Technology
Frontend	HTML, Tailwind CSS, JavaScript
Backend	Python, Flask
AI Model	Gemini API
Charts	Chart.js
Deployment	ngrok / Render
Security	Environment Variables (.env)

🧪 How It Works (Flow)
User uploads or captures an image

Backend sends image to Gemini API

Gemini identifies item & condition

Function Call checks inventory data

App returns structured action plan

Dashboard updates instantly

🔐 API Key Security
⚠️ Important Notice

Gemini API keys are stored securely using environment variables

API keys are NOT hardcoded and NOT included in this repository

.env files are ignored via .gitignore

env
Copy code
GEMINI_API_KEY=your_api_key_here
🛠️ Local Setup Instructions
1️⃣ Clone Repository
bash
Copy code
git clone https://github.com/anshu-2007/Smart-Inventory-Auditor.git
cd Smart-Inventory-Auditor/Backend
2️⃣ Install Dependencies
bash
Copy code
pip install -r requirements.txt
3️⃣ Set Environment Variable
Create .env file:

env
Copy code
GEMINI_API_KEY=your_api_key_here
4️⃣ Run Backend
bash
Copy code
python app.py
5️⃣ Open Frontend
Visit:

cpp
Copy code
http://127.0.0.1:5000
📂 Project Structure
arduino
Copy code
Smart-Inventory-Auditor/
│
├── Backend/
│   ├── app.py
│   ├── inventory.py
│   ├── requirements.txt
│   └── .env (ignored)
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── README.md
🏆 Hackathon Alignment
Theme:
✔ Multimodal Function Calling & Automation

Judging Criteria Covered:

✅ Clear Gemini API usage

✅ Real-world applicability

✅ Working end-to-end system

✅ Efficient free-tier usage

✅ Clean, original implementation

📈 Future Improvements
Real database integration

Barcode + QR support

Role-based access control

Cloud deployment with caching

Analytics & export reports

👤 Author
Anshu Chowdhury
Nandini Kalia

GenAI Frontiers Hackathon
Smart Inventory Auditor

⭐ Final Note for Judges
This project demonstrates how Gemini’s multimodal intelligence can be transformed into a practical, business-ready AI agent, going beyond chat and into real operational automation.

