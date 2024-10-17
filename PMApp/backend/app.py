from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Model API URL (FastAPI model serving)
MODEL_API_URL = "http://localhost:8000/predict"

@app.route('/predict', methods=['POST'])
def predict_rul():
    data = request.json  # Get input sensor data from frontend
    response = requests.post(MODEL_API_URL, json=data)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
