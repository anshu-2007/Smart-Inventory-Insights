from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os, base64, json, re
from inventory import lookup_inventory

load_dotenv()
app = Flask(__name__)
CORS(app)

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Configure Gemini Lite
genai.configure(api_key=os.getenv("AIzaSyBo4BrYunD_LbbcTBlgT3QZDFZYaJK71wA"))
model = genai.GenerativeModel("gemini-2.5-flash-lite")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        # Check if request has JSON (camera) or files (upload)
        files = []
        if request.is_json:
            data = request.get_json()
            image_b64 = data.get("image")
            if not image_b64:
                return jsonify({"error": "No image found"}), 400
            if "," in image_b64:
                image_b64 = image_b64.split(",")[1]
            image_bytes = base64.b64decode(image_b64)
            files.append(("image.png", image_bytes))
        else:
            upload_files = request.files.getlist("images")
            if not upload_files:
                return jsonify({"error": "No image uploaded"}), 400
            files.extend([(f.filename, f.read()) for f in upload_files])

        results = []
        for fname, image_data in files:
            # Gemini Lite API call
            prompt = """
You are a smart inventory auditor. From the image:
1. Identify the product name.
2. Identify the product condition (Good/Damaged).
Respond ONLY in JSON with keys: "item", "condition".
Do not explain or add markdown.
"""
            try:
                response = model.generate_content([
                    prompt,
                    {"inline_data": {"mime_type": "image/png", "data": base64.b64encode(image_data).decode("utf-8")}}
                ])
                raw_text = response.text
                cleaned_text = re.sub(r"```json|```", "", raw_text).strip()
                result = json.loads(cleaned_text)
            except Exception as e:
                print("Gemini API failed:", e)
                continue  # Skip if API fails

            item_name = result.get("item") or "Unknown Item"
            condition = result.get("condition") or "Unknown"

            inventory_data = lookup_inventory(item_name)
            stock = inventory_data["stock"]
            threshold = inventory_data["threshold"]

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
