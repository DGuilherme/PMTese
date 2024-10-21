from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import numpy as np

app = FastAPI()

# Load the trained Transformer model

# Define the input data schema
class SensorData(BaseModel):
    sensor_1: float
    sensor_2: float
    sensor_3: float

MODEL_PATH = "timeseries_transformer_model.pth"  # Path to the downloaded model file
model = torch.load(MODEL_PATH)
model.eval()  # Set the model to evaluation mode

@app.post("/predict")
def predict_rul(data: SensorData):
    try:
        # Prepare input data (e.g., as a tensor for PyTorch)
        input_data = torch.tensor([[data.sensor_1, data.sensor_2, data.sensor_3]])  # Add more as needed
        
        # Perform the prediction
        with torch.no_grad():
            rul_prediction = model(input_data)
        
        # Convert prediction to list or float
        predicted_rul = rul_prediction.item()  # Assuming the output is a single value

        # Return the prediction
        return {"predicted_rul": predicted_rul}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
