import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from vapi import Vapi

load_dotenv()

app = Flask(__name__)

VAPI_API_KEY = os.getenv("VAPI_API_KEY")
VAPI_ASSISTANT_ID = os.getenv("VAPI_ASSISTANT_ID")
VAPI_PHONE_NUMBER_ID = os.getenv("VAPI_PHONE_NUMBER_ID") # Load Vapi Phone Number ID

if not VAPI_API_KEY:
    print("Error: VAPI_API_KEY not found in .env file. Please ensure it's set.")
    # For now, we'll just print. Vapi calls will fail if key is missing.
if not VAPI_ASSISTANT_ID: # Add check for Assistant ID
    print("Error: VAPI_ASSISTANT_ID not found in .env file. Please ensure it's set.")
if not VAPI_PHONE_NUMBER_ID: # Add check for Vapi Phone Number ID
    print("Error: VAPI_PHONE_NUMBER_ID not found in .env file. Please ensure it's set.")

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

@app.route('/make-call', methods=['POST'])
def make_call_route():
    if not vapi_client:
        return jsonify({"error": "Vapi client not initialized"}), 500
    if not VAPI_ASSISTANT_ID: # Check if assistant ID is loaded
        return jsonify({"error": "Vapi assistant ID not configured on server"}), 500
    if not VAPI_PHONE_NUMBER_ID: # Check if Vapi phone number ID is loaded
        return jsonify({"error": "Vapi phone number ID not configured on server"}), 500

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    phone_number = data.get('phoneNumber') # The number to call

    if not phone_number:
        return jsonify({"error": "Missing 'phoneNumber' in request"}), 400

    try:
        print(f"Attempting to create Vapi call to {phone_number} using assistant {VAPI_ASSISTANT_ID} from number ID {VAPI_PHONE_NUMBER_ID}")
        
        # Make the actual call to Vapi
        call_response = vapi_client.calls.create(
            assistant_id=VAPI_ASSISTANT_ID,
            phone_number_id=VAPI_PHONE_NUMBER_ID,
            customer={"number": phone_number}
        )
        
        print(f"Vapi call initiated successfully. Response: {call_response}")
        
        response_data = {"message": "Call initiated successfully with Vapi"}
        # Try to extract common fields from the response. The actual structure depends on the SDK.
        if hasattr(call_response, 'id'):
            response_data['call_id'] = call_response.id
        if hasattr(call_response, 'status'):
             response_data['status'] = str(call_response.status) # Ensure status is string for jsonify
        if hasattr(call_response, 'to_dict') and callable(getattr(call_response, 'to_dict')):
            response_data['vapi_response'] = call_response.to_dict()
        else:
            # Fallback if no to_dict() method, just convert basic info
            response_data['vapi_raw_response_type'] = str(type(call_response))

        return jsonify(response_data), 200

    except Exception as e:
        # Attempt to get more detailed error information if available (e.g., from an APIError)
        error_details = str(e)
        if hasattr(e, 'body'): # Fern SDKs often have a body attribute for API errors
            error_details = getattr(e, 'body')
        elif hasattr(e, 'response') and hasattr(getattr(e, 'response'), 'text'):
            error_details = getattr(getattr(e, 'response'), 'text')
        
        print(f"Error making Vapi call: {error_details}")
        return jsonify({"error": "Failed to initiate call with Vapi", "details": error_details}), 500

if __name__ == '__main__':
    app.run(debug=True) 