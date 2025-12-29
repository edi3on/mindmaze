# Mind Maze 🧠

**A web-based psychology assessment tool that tests for cognitive biases using puzzles, riddles, and AI-generated scenarios.**

Mind Maze combines the theories of Daniel Kahneman (*Thinking, Fast and Slow*) with a mysterious "Noir" aesthetic to profile a user's susceptibility to biases like Anchoring, Framing, and Sunk Cost Fallacy.

---

## ⚡ Key Features

* **Standard Assessment:** A static 10-question quiz testing fundamental cognitive biases.
* **AI-Tailored Assessment:**
    * **Archetypes (Presets):** Instant quizzes themed around specific life areas (Finance, Relationships, Startups, Sports, Education).
    * **The Analyst (Custom):** A conversational agent that accepts user context (e.g., "I'm arguing with my co-founder") and generates unique, real-time puzzles based on that situation.
* **Susceptibility Profile:** A detailed breakdown of results, explaining *why* the bias occurred and where to spot it in real life.
* **Noir Aesthetic:** Dark mode, immersive UI, and "investigative" visual storytelling.

## 🛠 Tech Stack

* **Frontend:** React, Tailwind CSS, Shadcn UI, Framer Motion.
* **Backend:** Python (Flask/FastAPI).
* **AI Engine:** [Your LLM Provider] (via Python scripts) for generating JSON quiz data on the fly.

## 🏗 Architecture

The app uses a **Hybrid Data Strategy**:

1.  **Static Data:** Standard and Preset quizzes load instantly from pre-generated `.json` files.
2.  **Dynamic Data:** The "Custom Analyst" mode triggers a Python script that:
    * Takes user input.
    * Prompts the LLM to act as a "Psychological Profiler."
    * Returns valid JSON matching the frontend schema.

## 🚀 Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Ensure your LLM API keys are set in .env
python app.py
```
### Data struture
The frontend expects quiz data in the following JSON format. The AI generation script acts as a middleware to ensure this schema is strictly followed.
``` json
{
  "questions": [
    {
      "id": 1,
      "type": "hybrid", // or "multiple_choice"
      "biasId": "anchoring_bias",
      "text": "Is the tallest tree > 800ft?",
      "options": ["True", "False"],
      "correctAnswer": "False"
    }
  ]
}
```

### Contributing
Based on the research of Daniel Kahneman, Amos Tversky, and behavioral economics principles.