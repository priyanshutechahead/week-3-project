import os
import httpx
from typing import List, Dict

class NewsService:
    @staticmethod
    async def get_travel_news(country_name: str) -> List[Dict]:
        api_key = os.getenv("VITE_NEWS_API_KEY") or os.getenv("NEWS_API_KEY")
        if not api_key:
            return []
            
        url = 'https://newsapi.org/v2/everything'
        params = {
            'q': f'{country_name} travel OR tourism OR tech',
            'sortBy': 'publishedAt',
            'language': 'en',
            'pageSize': 10,
            'apiKey': api_key,
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                data = response.json()
                return data.get('articles', [])
        except Exception as e:
            print(f"Error fetching travel news for {country_name}: {str(e)}")
            return []
