import json


def get_recommendations(user_preferences):

    with open(
        "app/data/countries_metadata.json",
        "r"
    ) as file:
        countries = json.load(file)

    recommendations = []

    for country in countries:

        score = 0
        if country["country"] in user_preferences["selected_countries"]:
            score += 5

        score += (
            len(
                set(user_preferences["preferred_seasons"])
                &
                set(country["seasons"])
            )
            * 2
        )
        score += (
            len(
                set(user_preferences["preferred_categories"])
                &
                set(country["categories"])
            )
            * 2
        )

        # Terrain Match
        score += (
            len(
                set(user_preferences["preferred_terrains"])
                &
                set(country["terrains"])
            )
            * 1
        )

        if score > 0:

            recommendations.append(
                {
                    "country": country["country"],
                    "score": score
                }
            )

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations