import json

def get_recommendation(user_interest):
    with open("app/data/countries_metadata.json", "r") as f:
        countries = json.load(f)
    recommendation = []
    for country in countries:
        score = len(set(user_interest) & set(country["tags"]))
        if score > 0:
            recommendation.append(
                {
                    "country":  country["country"],
                    "tags": country["tags"],
                    "score": score
                }
            )

    recommendation.sort(
        key = lambda x: x["score"],
        reverse = True
    )

    return recommendation[:6]
