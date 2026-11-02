export const EMERGENCY_KEYWORDS = [
            "can't breathe", "cannot breathe", "difficulty breathing", "trouble breathing",
            "chest pain", "crushing pain", "severe bleeding", "heavy bleeding",
            "unconscious", "unresponsive", "suicidal", "suicide", "want to die",
            "stroke", "slurred speech", "face drooping", "numb on one side",
            "seizure", "overdose", "poisoning", "severe allergic reaction", "anaphylaxis",
            "coughing blood", "vomiting blood"
        ];

export const SYMPTOM_TOPICS = [
            {
                key: "headache",
                keywords: ["headache", "head pain", "migraine", "head hurt", "head ach", "head is pounding"],
                followups: [
                    "Where exactly is the pain — one side, both sides, or all over?",
                    "Is the pain throbbing, sharp, pressure-like, or dull?",
                    "Are you sensitive to light or sound right now?",
                    "Do you feel any nausea along with the headache?",
                    "Have you experienced headaches like this before?"
                ]
            },
            {
                key: "fever",
                keywords: ["fever", "temperature", "chills", "hot and cold", "feverish"],
                followups: [
                    "How long have you had the fever?",
                    "Do you know roughly how high your temperature is?",
                    "Are you experiencing chills, sweating, or body aches with it?"
                ]
            },
            {
                key: "stomach",
                keywords: ["stomach", "abdominal", "abdomen", "belly", "tummy", "gut pain"],
                followups: [
                    "Where in your abdomen is the pain — upper, lower, left, or right?",
                    "Is it accompanied by nausea, vomiting, or diarrhea?",
                    "Does eating make the pain better or worse?"
                ]
            },
            {
                key: "chest",
                keywords: ["chest pain", "chest tight", "chest pressure", "chest hurt", "chest discomfort"],
                followups: [
                    "Does the pain spread to your arm, jaw, or back?",
                    "Is it worse when you breathe in, move, or exert yourself?",
                    "Are you short of breath along with the chest discomfort?"
                ]
            },
            {
                key: "breathing",
                keywords: ["cough", "breath", "wheeze", "breathing", "shortness of breath", "wheezing"],
                followups: [
                    "Is the cough dry, or are you bringing up mucus?",
                    "Do you feel short of breath at rest, or only with activity?",
                    "Have you had a fever alongside this?"
                ]
            },
            {
                key: "skin",
                keywords: ["rash", "skin", "itch", "itchy", "hives", "spots", "breakout"],
                followups: [
                    "Where on your body is the rash or irritation?",
                    "Is it itchy, painful, or mainly a change in appearance?",
                    "Did anything new touch your skin recently — soap, plant, food, or medication?"
                ]
            },
            {
                key: "joint",
                keywords: ["joint", "back pain", "knee", "shoulder", "muscle pain", "muscle ache", "elbow", "wrist pain"],
                followups: [
                    "Which joint or area is affected?",
                    "Is there any swelling, redness, or warmth in the area?",
                    "Did this start after an injury, or gradually on its own?"
                ]
            },
            {
                key: "eye",
                keywords: ["eye pain", "eyes hurt", "vision", "blurry", "eye is red"],
                followups: [
                    "Is one eye affected, or both?",
                    "Any redness, discharge, or sensitivity to light?",
                    "Has your vision changed recently?"
                ]
            },
            {
                key: "urinary",
                keywords: ["urin", "peeing", "bladder", "pee "],
                followups: [
                    "Is there any burning or pain when you urinate?",
                    "Have you noticed the frequency or urgency changing?",
                    "Any blood in your urine?"
                ]
            },
            {
                key: "throat",
                keywords: ["throat", "swallow", "sore throat"],
                followups: [
                    "Is it painful to swallow?",
                    "Do you notice any swelling or white patches in your throat?",
                    "Do you have a fever along with it?"
                ]
            },
            {
                key: "fatigue",
                keywords: ["tired", "fatigue", "exhausted", "no energy", "always sleepy"],
                followups: [
                    "How long has the fatigue been going on?",
                    "Is it affecting your daily activities?",
                    "Have you noticed changes in appetite, weight, or sleep?"
                ]
            },
            {
                key: "dizziness",
                keywords: ["dizzy", "dizziness", "lightheaded", "light-headed", "faint"],
                followups: [
                    "Does it happen when you stand up, or all the time?",
                    "Have you actually fainted or nearly fainted?",
                    "Any ringing in your ears or vision changes with it?"
                ]
            }
        ];

export const GENERIC_FOLLOWUPS = [
            "How long have you been experiencing this?",
            "On a scale of 1 to 10, how severe would you say it is?",
            "Is there anything else going on alongside this?"
        ];
