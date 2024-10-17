from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformer_model import DummyModel  # Import your Transformer model class
import numpy as np

app = FastAPI()

# Load the trained Transformer model
model = DummyModel()
model.load_state_dict(torch.load("model.pth"))
model.eval()

# Define the input data schema
class SensorData(BaseModel):
    inputs: list

@app.post("/predict")
def predict_rul(data: SensorData):
    inputs = torch.tensor(np.array(data.inputs))
    
    with torch.no_grad():
        output = model(inputs)  # Assuming the model returns the RUL

    return {"predicted_rul": output.item()}
