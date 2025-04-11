from flask import Flask, request, render_template
import os
import joblib
import numpy as np
import tensorflow as tf
from utils.sound_analysis import extract_features
from werkzeug.utils import secure_filename

# Define the upload folder and allowed extensions
UPLOAD_FOLDER = r"C:\Users\Vishal\OneDrive\Desktop\SJBIT_HACKATHON\DEMONSTRATION"
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'flac'}  

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the model and scaler once when the app starts
model = tf.keras.models.load_model('model/voice_detector_model.h5')
scaler = joblib.load('model/feature_scaler.pkl')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        if 'audio_file' not in request.files:
            return "No file part", 400
        
        file = request.files['audio_file']
        
        if file.filename == '':
            return "No selected file", 400
        
        if not allowed_file(file.filename):
            return "File type not allowed", 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            features = extract_features(filepath)
            scaled = scaler.transform([features])
            prediction = model.predict(scaled)[0][0]
            result = {
                'score': round(float(prediction), 4),
                'label': "Fake VOICE" if prediction > 0.5 else "Real Voice"
            }
        except Exception as e:
            result = {"error": str(e)}
    
    return render_template(r'C:\Users\Vishal\OneDrive\Desktop\SJBIT_HACKATHON\voice-sentinel-shield-main\index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)