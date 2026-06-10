import os
import json
# pyrefly: ignore [missing-import]
from groq import Groq
from app.core.config import settings

class IntelligenceService:
    _client = None

    @classmethod
    def get_client(cls):
        if not cls._client:
            # Try settings first, then direct env fallback
            api_key = settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
            if not api_key:
                print("CRITICAL: GROQ_API_KEY not found in settings or environment")
                raise ValueError("GROQ_API_KEY is not set")
            cls._client = Groq(api_key=api_key)
        return cls._client

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
            client = cls.get_client()
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
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
            print(f"Error calling Groq for {country_name}: {str(e)}")
            return None
