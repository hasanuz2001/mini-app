from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import csv
import os

app = FastAPI()

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
                answer
            ])

    return {"status": "ok"}