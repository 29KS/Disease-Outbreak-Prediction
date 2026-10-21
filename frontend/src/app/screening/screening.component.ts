
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.css'
})
export class ScreeningComponent {
  symptoms = [
    'abdominal_pain',
    'abnormal_menstruation',
    'acidity',
    'altered_sensorium',
    'anxiety',
    'back_pain',
    'belly_pain',
    'blurred_and_distorted_vision',
    'breathlessness',
    'chest_pain',
    'chills',
    'cold_hands_and_feets',
    'cough',
    'dehydration',
    'diarrhoea',
    'dizziness',
    'fatigue',
    'headache',
    'high_fever',
    'itching',
    'joint_pain',
    'lethargy',
    'loss_of_appetite',
    'mild_fever',
    'muscle_pain',
    'nausea',
    'runny_nose',
    'shivering',
    'skin_rash',
    'stomach_pain',
    'sweating',
    'throat_irritation',
    'vomiting',
    'muscle_weakness',
    'weakness_in_limbs',
    'weakness_of_one_body_side',
    'weight_loss',
    'yellowing_of_eyes',
    'yellowish_skin'
  ];

  selectedSymptoms: string[] = [];
  predictedDisease = '';
  confidence: number | null = null;
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  toggleSymptom(symptom: string, checked: boolean): void {
    if (checked && !this.selectedSymptoms.includes(symptom)) {
      this.selectedSymptoms.push(symptom);
    } else if (!checked) {
      this.selectedSymptoms = this.selectedSymptoms.filter(
        item => item !== symptom
      );
    }
  }

  predictDisease(): void {
    this.errorMessage = '';
    this.predictedDisease = '';
    this.confidence = null;

    if (this.selectedSymptoms.length === 0) {
      this.errorMessage = 'Please select at least one symptom.';
      return;
    }

    this.loading = true;

    this.http.post<any>(
      'http://127.0.0.1:8000/disease/predict',
      { symptoms: this.selectedSymptoms }
    ).subscribe({
      next: (response) => {
        this.predictedDisease = response.predicted_disease;
        this.confidence = response.confidence;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.detail || 'Prediction failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
