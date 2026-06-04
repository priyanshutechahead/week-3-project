import requests

def get_country_details(country_name):
    url = f"https://restcountries.com/v3.1/name/{country_name}"

    response = requests.get(url)

    if response.status_code != 200:
        return None
    data = response.json()[0]

    currency = "Unknown"

    if "currencies" in data:
        currency = list(
            data["currencies"].values()
        )[0]["name"]
    return{
        "country": data["name"]["common"],
        "capital": data.get(
            "capital", ["Unknown"]
        )[0],
        "population": data.get(
            "population",
            0
        ),
        "region": data.get(
            "region",
            "Unknown"
        ),
        "currency": currency,
        "flag": data["flags"]["png"]
    }

    