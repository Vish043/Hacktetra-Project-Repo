from flask import Flask, request, jsonify
import os
import joblib
import numpy as np
import tensorflow as tf
from utils.sound_analysis import extract_features
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Enable CORS for cross-origin requests

# Define the upload folder and allowed extensions
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'voice-sentinel-shield-main')
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Load the model and scaler once when the app starts
model = tf.keras.models.load_model('voice_detector_model.h5')
scaler = joblib.load('feature_scaler.pkl')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cleanup_file(filepath):
    """Clean up the uploaded file after processing"""
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
    except Exception as e:
        print(f"Error cleaning up file {filepath}: {str(e)}")

@app.route('/upload-chunk', methods=['POST'])
def predict():
    # Check if the post request has the file part
    if 'audio_file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['audio_file']

    # Check if a file was selected
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check if the file type is allowed
    if not allowed_file(file.filename):
        return jsonify({"error": f"File type not allowed. Allowed types are: {', '.join(ALLOWED_EXTENSIONS)}"}), 400

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Process the file
        features = extract_features(filepath)
        scaled = scaler.transform([features])
        prediction = model.predict(scaled)[0][0]
        
        result = {
            'score': round(float(prediction), 4),
            'label': "Fake VOICE" if prediction > 0.5 else "Real Voice",
            'filename': filename
        }

        # Clean up the file after processing
        cleanup_file(filepath)
        
        return jsonify(result)

    except Exception as e:
        # Clean up the file in case of error
        if 'filepath' in locals():
            cleanup_file(filepath)
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)