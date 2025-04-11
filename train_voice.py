import pandas as pd
import numpy as np 
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler,LabelEncoder
from tensorflow import keras
from tensorflow.keras import layers

df=pd.read_csv(r"C:\Users\Vishal\OneDrive\Desktop\SJBIT_HACKATHON\KAGGLE\DATASET-balanced.csv")

X=df.drop("LABEL",axis=1)
y=df["LABEL"]
le=LabelEncoder()

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)

scaler=StandardScaler()
X_scaled_train=scaler.fit_transform(X_train)
X_scaled_test=scaler.fit_transform(X_test)

model=keras.Sequential([
  layers.Dense(64,activation="relu",input_shape=(X_scaled_train.shape[1],)),
  layers.Dropout(0.3),
  layers.Dense(32,activation="relu"),
  layers.Dense(1,activation='sigmoid')
])

model.compile(optimizer='adam',loss='binary_crossentropy',metrics=['accuracy'])
history=model.fit(X_scaled_train,y_train,validation_split=0.2,epochs=30,batch_size=16)

loss,accuracy=model.evaluate(X_scaled_test,y_test)
print(f"\n Test Accuracy:{accuracy:.4f}")

model.save("voice_detector_model.h5")
import joblib
joblib.dump(scaler,"feature_scaler.pkl")