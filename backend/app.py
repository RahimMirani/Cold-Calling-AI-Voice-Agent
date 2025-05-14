import os
from flask import Flask
from dotenv import load_dotenv
from vapi import Vapi

load_dotenv()

app = Flask(__name__)

VAPI_API_KEY = os.getenv("VAPI_API_KEY")

if not VAPI_API_KEY:
    print("Error: VAPI_API_KEY not found in .env file. Please ensure it's set.")
    # For now, we'll just print. Vapi calls will fail if key is missing.

# Initialize Vapi client
vapi_client = None
if VAPI_API_KEY:
    try:
        # Based on VapiAI/server-sdk-python usage: client = Vapi(token="YOUR_TOKEN")
        vapi_client = Vapi(token=VAPI_API_KEY)
        print("Vapi client initialized successfully.")
    except Exception as e:
        print(f"Error initializing Vapi client: {e}")
else:
    print("Vapi client not initialized because API key is missing.")

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True) 