mart Inventory Insights 🚀
AI-Powered Inventory Management Web Application 🤖

Overview 📖
Smart Inventory Insights is an AI-powered web application designed to help businesses automate inventory auditing. The platform leverages image recognition to analyze product images, detect item conditions, and provide real-time inventory insights. It also provides predictive alerts for low-stock items, helping businesses make data-driven restocking decisions.

Problem Solved: ❌

Manual inventory tracking is time-consuming and prone to errors.

Overstocking or stockouts can lead to financial losses.

Lack of predictive insights prevents proactive restocking.

Solution: 💡

Upload or capture product images via camera 📸.

AI analyzes items and conditions using Google Cloud Vision API 🧠.

Dashboard displays total items, low-stock alerts, reorder suggestions, and predictive insights 📊.

Maintains scan history for reporting 📜.

Features ✨
AI-Powered Image Scanning: Automatically detects products and evaluates conditions.

Real-Time Dashboard: Displays inventory levels, low-stock items, and reorder alerts.

Predictive Stock Insights: Forecasts which items may run out soon ⏳.

Scan History & Reporting: Stores scanned items, conditions, and stock data 🗂️.

Camera Capture & Upload: Supports both file uploads and live camera capture.

Alerts & Recommendations: Highlights items needing attention ⚠️.

User-Friendly Interface: Intuitive design with charts, tables, and visual summaries 📈.

Google Technologies Used 🛠️
Google Cloud Vision API: Image recognition and text extraction 🧠.

Google Cloud Storage (Optional): Securely store uploaded images ☁️.

Google Colab / AI Tools (Optional): Model testing and experimentation 💻.

Architecture 🏗️

User → Frontend (HTML, Tailwind CSS, JS) → Flask Backend → Google Cloud Vision API → Backend → Dashboard / Storage → User
Components:

Frontend: Upload/capture images, display results 🌐.

Backend: Processes requests and interacts with AI engine ⚡.

AI Engine: Detects products, extracts stock and condition data 🤖.

Dashboard: Visualizes inventory stats, history, and predictive insights 📊.

Storage (Optional): Stores scan history and data 💾.

Future Development 🔮
Multi-store inventory management 🏬.

Advanced AI predictions using trends and seasonality 📈.

Mobile app integration for on-the-go inventory checks 📱.

Supplier integration to auto-generate purchase orders 📝.

Enhanced AI models for more accurate condition detection 🧠.

Role-based access control for staff, managers, and auditors 👥.

Setup & Installation ⚙️
Clone the repository:

git clone https://github.com/yourusername/Smart-Inventory-Insights.git
cd Smart-Inventory-Insights
Install dependencies:

pip install -r requirements.txt
Set Google Application Credentials:

$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\carevault-vision-key.json"
Run the backend:

python app.py
Open frontend:

Open index.html in browser, or use ngrok for public access 🌐:

ngrok http 5000
Demo Video 🎥
If the live link is inaccessible, please refer to the demo video for a complete walkthrough of the solution.

Team Members 👥
Name	Role / Contribution
Anshu Chowdhury	Lead Developer – Backend, Architecture, AI Integration 💻
Nandini Kalia	Team Leader – Documentation, Stack Summary, Prompt Engineering 📄
Mihir Kumar	Frontend Developer – UI/UX and Dashboard 🎨
Sonu Gupta	AI Integration & Testing 🤖

Disclaimer ⚠️
The predictive features shown in the demo are for illustration purposes only.

AI integration uses Google Cloud Vision API; results depend on image quality.

If the live demo link does not work, please refer to the demo video provided.
