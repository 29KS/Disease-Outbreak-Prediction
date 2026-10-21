
import joblib
import pandas as pd
from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parents[1] / "ml_models"

model = joblib.load(MODEL_DIR / "disease_model.pkl")
symptom_encoder = joblib.load(MODEL_DIR / "symptom_encoder.pkl")
disease_encoder = joblib.load(MODEL_DIR / "disease_encoder.pkl")


def predict_disease(symptoms: list[str]) -> dict:
    if not symptoms:
        raise ValueError("Please enter at least one symptom.")

    cleaned_symptoms = [
        str(symptom).strip().lower()
        for symptom in symptoms
        if str(symptom).strip()
    ]

    if not cleaned_symptoms:
        raise ValueError("Please enter at least one valid symptom.")

    known_symptoms = {
        str(symptom).strip().lower()
        for symptom in symptom_encoder.classes_
    }

    unknown_symptoms = [
        symptom for symptom in cleaned_symptoms
        if symptom not in known_symptoms
    ]

    if unknown_symptoms:
        raise ValueError(
            f"Unknown symptoms: {', '.join(unknown_symptoms)}"
        )

    X_new = pd.DataFrame(
        symptom_encoder.transform([cleaned_symptoms]),
        columns=symptom_encoder.classes_
    )

    prediction = model.predict(X_new).astype(int)
    probabilities = model.predict_proba(X_new)

    disease = disease_encoder.inverse_transform(prediction)[0]
    confidence = float(probabilities[0].max() * 100)

    return {
        "predicted_disease": str(disease),
        "confidence": round(confidence, 2)
    }
