import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow import keras
from tensorflow.keras import layers
import joblib
from utils.sound_analysis import process_dataset

# Load dataset
df = process_dataset()

# Separate features and labels
X = df.drop("label", axis=1)
y = df["label"]

# Encode string labels to integers (e.g., 'male' -> 0, 'female' -> 1)
le = LabelEncoder()
y_encoded = le.fit_transform(y).astype(np.float32)  # Convert to float32 for TensorFlow

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_scaled_train = scaler.fit_transform(X_train)
X_scaled_test = scaler.transform(X_test)  # <- use transform, not fit_transform!

# Build model
model = keras.Sequential([
    layers.Dense(64, activation="relu", input_shape=(X_scaled_train.shape[1],)),
    layers.Dropout(0.3),
    layers.Dense(32, activation="relu"),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train model
history = model.fit(X_scaled_train, y_train, validation_split=0.2, epochs=30, batch_size=16)

# Evaluate
loss, accuracy = model.evaluate(X_scaled_test, y_test)
print(f"\nTest Accuracy: {accuracy:.4f}")

# Save model and scaler
model.save("voice_detector_model.h5")
joblib.dump(scaler, "feature_scaler.pkl")
