from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import csv
import os
import json

app = FastAPI()

# CORS yoqish
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FILE_NAME = "responses.csv"

class SurveyResponse(BaseModel):
    user_id: str
    answers: dict

@app.post("/submit")
def submit_response(data: SurveyResponse):
    file_exists = os.path.isfile(FILE_NAME)

    with open(FILE_NAME, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)

        if not file_exists:
            writer.writerow(["timestamp", "user_id", "question_id", "answer"])

        for q_id, answer in data.answers.items():
            writer.writerow([
                datetime.now().isoformat(),
                data.user_id,
                q_id,
                json.dumps(answer, ensure_ascii=False) if isinstance(answer, dict) else answer
            ])

    return {"status": "ok"}

@app.get("/stats")
def get_stats():
    """Barcha javoblarning statistikasini qaytaradi"""
    if not os.path.isfile(FILE_NAME):
        return {"total": 0, "responses": []}
    
    responses = []
    with open(FILE_NAME, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            responses.append(row)
    
    # Savollar bo'yicha yig'indi
    question_stats = {}
    user_data = {}
    
    for row in responses:
        q_id = row["question_id"]
        answer = row["answer"]
        user_id = row["user_id"]
        
        # Har bir foydalanuvchining barcha javoblarini yig'ish
        if user_id not in user_data:
            user_data[user_id] = {}
        user_data[user_id][q_id] = answer
        
        # Savollar bo'yicha statistika
        if q_id not in question_stats:
            question_stats[q_id] = {}
        
        if answer not in question_stats[q_id]:
            question_stats[q_id][answer] = 0
        question_stats[q_id][answer] += 1
    
    return {
        "total": len(user_data),
        "question_stats": question_stats,
        "user_count": len(user_data)
    }

@app.get("/responses")
def get_responses():
    """Barcha javoblarni qaytaradi"""
    if not os.path.isfile(FILE_NAME):
        return {"total": 0, "responses": []}
    
    responses = []
    with open(FILE_NAME, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            responses.append(row)
    
    return {
        "total": len(responses),
        "responses": responses
    }