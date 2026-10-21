
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.disease_service import predict_disease

router = APIRouter(prefix="/disease", tags=["Disease Prediction"])


class SymptomRequest(BaseModel):
    symptoms: list[str]


@router.post("/predict")
def predict(request: SymptomRequest):
    try:
        return predict_disease(request.symptoms)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Prediction failed. Please check the model configuration."
        )
