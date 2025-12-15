from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os, base64, json, re

from inventory import lookup_inventory

# Load environment variables
load_dotenv()

# ✅ Create Flask app ONCE
app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)
CORS(app)

# ✅ Configure Gemini (use ENV variable)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash-lite")

# ---------------- HOME PAGE ----------------
@app.route("/")
def index():
    return render_template("index.html")

# ---------------- ANALYZE API ----------------
@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        files = []

        # 📸 Camera (base64 JSON)
        if request.is_json:
            data = request.get_json()
            image_b64 = data.get("image")
            if not image_b64:
                return jsonify({"error": "No image found"}), 400

            if "," in image_b64:
                image_b64 = image_b64.split(",")[1]

            image_bytes = base64.b64decode(image_b64)
            files.append(("camera.png", image_bytes))

        # 📁 Upload images
        else:
            upload_files = request.files.getlist("images")
            if not upload_files:
                return jsonify({"error": "No image uploaded"}), 400

            for f in upload_files:
                files.append((f.filename, f.read()))

        results = []

        for fname, image_data in files:
            prompt = """
You are a smart inventory auditor.
From the image:
1. Identify the product name.
2. Identify the product condition (Good/Damaged).

Respond ONLY in JSON:
{
  "item": "...",
  "condition": "..."
}
"""

            response = model.generate_content([
                prompt,
                {
                    "inline_data": {
                        "mime_type": "image/png",
                        "data": base64.b64encode(image_data).decode()
                    }
                }
            ])

            cleaned = re.sub(r"```json|```", "", response.text).strip()
            result = json.loads(cleaned)

            item_name = result.get("item", "Unknown Item")
            condition = result.get("condition", "Unknown")

            inventory = lookup_inventory(item_name)
            stock = inventory["stock"]
            threshold = inventory["threshold"]

            if stock == 0:
                action = "Reorder Required"
            elif stock <= threshold:
                action = "Low Stock"
            else:
                action = "Stock OK"

            results.append({
                "item": item_name,
                "condition": condition,
                "stock": stock,
                "recommended_action": action
            })

        return jsonify({"results": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
