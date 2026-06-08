import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class IntelligenceService:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @classmethod
    async def get_country_intelligence(cls, country_name: str):
        prompt = f"""
        Generate travel intelligence for {country_name} in JSON format.
        Provide insights for exactly these 5 categories: 'Tech Innovation', 'Cultural Heritage', 'Food & Cuisine', 'Cleanliness', 'Safety'.
        For each category, provide:
        - 'title': A short catchy title.
        - 'desc': A 2-sentence description.
        - 'stats': A list of 2 objects with 'label' and 'value'.
        
        Structure:
        {{
          "Tech Innovation": {{ "title": "...", "desc": "...", "stats": [{{ "label": "...", "value": "..." }}, ...] }},
          ...
        }}
        Only return the JSON object, no other text.
        """
        
        try:
            completion = cls.client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.5,
                max_tokens=1024,
                top_p=1,
                stream=False,
                response_format={"type": "json_object"}
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            print(f"Error calling Groq: {str(e)}")
            return None
