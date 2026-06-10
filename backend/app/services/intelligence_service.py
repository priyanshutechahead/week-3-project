import os
import json
from groq import Groq
from app.core.config import settings

class IntelligenceService:
    _client = None

    @classmethod
    def get_client(cls):
        if not cls._client:
            api_key = settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError("GROQ_API_KEY is not set")
            cls._client = Groq(api_key=api_key)
        return cls._client

    @classmethod
    async def get_country_intelligence(cls, country_name: str):
        # Improved prompt: Let the AI decide the most relevant categories for each specific country
        prompt = f"""
        Identify the 5 most unique and interesting travel-related characteristics or themes for {country_name}.
        For each characteristic, provide a JSON object with:
        - 'category': A short 1-2 word name (e.g., 'Volcanic Wonders', 'Nightlife', 'High-Speed Rail').
        - 'title': A catchy headline.
        - 'desc': A 2-sentence fascinating description.
        - 'stats': A list of 2 objects with 'label' and 'value' that represent data or facts about this.
        
        Return exactly 5 categories in a JSON object where the keys are the 'category' names.
        Only return the JSON object, no other text.
        """
        
        try:
            client = cls.get_client()
            completion = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=1024,
                top_p=1,
                stream=False,
                response_format={"type": "json_object"}
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            print(f"Error calling Groq for {country_name}: {str(e)}")
            return None
