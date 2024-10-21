# Predictive Maintenance Application

## Overview

This project is a browser-based application for predicting the Remaining Useful Life (RUL) of turbofan engines using a Transformer model. It consists of a Flask backend that serves as an API, a FastAPI model server that handles inference, and a React frontend for user interaction. The application aims to provide factory operators with valuable insights into equipment health for predictive maintenance.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Model Serving**: FastAPI
- **Machine Learning**: PyTorch
- **Data Handling**: NumPy
- **Environment Management**: Python Virtual Environments

## Folder Structure

project-root/ │ ├── backend/ # Flask backend │ ├── app.py # Flask app file for routing and serving API │ └── requirements.txt # List of Python dependencies │ ├── model-api/ # FastAPI model serving │ ├── model_api.py # FastAPI server to load and serve the model │ ├── your_model.py # Your Transformer model class (imported in model_api.py) │ └── requirements.txt # Python dependencies for FastAPI │ ├── frontend/ # React frontend (created using create-react-app) │ ├── public/ # Public static files (HTML, favicon, etc.) │ ├── src/ # React source files │ │ ├── App.js # Main React component │ │ ├── index.js # Entry point for React app │ │ └── App.css # Styling for the app │ └── package.json # Node.js dependencies for React app │ └── README.md # Project description and setup instructions


## Installation

### Prerequisites

- Python 3.7 or higher
- Node.js (for React)
- pip (Python package manager)
- npm (Node package manager)

### Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>

2. **Set Up the Backend (Flask):**
    * Navigate to the backend directory:
        ```bash 
        cd backend
    * Create a virtual environment:
        ```bash 
        python -m venv venv
    * Activate the virtual environment
        ```bash 
        # windows
        venv\Scripts\activate
        # macOS / Linux
        source venv/bin/activate
    * Install the required Python packages:
        ```bash 
        pip install -r requirements.txt

3. **Set Up the Model API (FastAPI):**

    * Navigate to the model-api directory:
        ```bash 
        cd ../model-api
    * Create a virtual environment
    * Activate the virtual environment
    * Install the required Python packages

4. **Set Up the Frontend (React):**
    * Navigate to the frontend directory:
        ```bash 
        cd ../frontend
    * Install the required Node.js packages:
        ```bash 
        npm install

## Usage

### Running the Application

You need to run three separate processes for the application to work:

1. **Start the FastAPI model server:**
   - Navigate to the model-api folder and activate the virtual environment:
     ```bash
     cd model-api
     venv/bin/activate  # or venv\Scripts\activate for Windows
     ```
   - Start the server:
     ```bash
     uvicorn model_api:app --reload --host 0.0.0.0 --port 8000
     ```

2. **Start the Flask backend:**
   - Navigate to the backend folder and activate the virtual environment:
     ```bash
     cd ../backend
     venv/bin/activate  # or venv\Scripts\activate for Windows
     ```
   - Start the server:
     ```bash
     python app.py
     ```

3. **Start the React frontend:**
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Start the React app:
     ```bash
     npm start
     ```

### Accessing the Application

Once all components are running, you can access the frontend application in your web browser at: http://localhost:3000


## API Endpoints

### `/predict` (Flask Backend)
- **Method**: POST
- **Request Body**:
    ```json
    {
        "inputs": [/* array of sensor data */]
    }
- **Response**
    ```json
    {
        "predicted_rul": /* predicted Remaining Useful Life */
    }

### `/predict` (Flask Backend)
**Method**: POST
- **Request Body**:
    ```json
    {
        "inputs": [/* array of sensor data */]
    }
- **Response**
    ```json
    {
        "predicted_rul": /* predicted Remaining Useful Life */
    }