import torch 
import torch.nn as nn

class DummyModel(nn.Module):
    def __init__(self):
        super(DummyModel, self).__init__()

    def forward(self, x):
        return torch.tensor([100.0])  # Return a dummy prediction for testing


model = DummyModel()
torch.save(model.state_dict(), "model.pth")