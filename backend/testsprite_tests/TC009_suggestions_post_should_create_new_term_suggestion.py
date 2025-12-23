import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30

def test_suggestions_post_should_create_new_term_suggestion():
    url = f"{BASE_URL}/api/v1/suggestions"
    suggestion_payload = {
        "name_ko": "테스트 용어명",
        "name_en": "TestTerm",
        "description": "This is a test term suggestion created by automation.",
        "abbreviation": "TT",
        "synonyms": ["TestTermSyn1", "TestTermSyn2"],
        "processIds": ["process1", "process2"],
        "hashtags": ["#test", "#automation"]
    }

    response = None
    suggestion_id = None
    try:
        response = requests.post(url, json=suggestion_payload, headers=HEADERS, timeout=TIMEOUT)
        assert response.status_code == 201 or response.status_code == 200, f"Expected status 200 or 201 but got {response.status_code}"
        response_json = response.json()
        assert "id" in response_json, "Response JSON does not contain 'id'"
        suggestion_id = response_json["id"]
        assert suggestion_id is not None and str(suggestion_id).strip() != "", "Suggestion id is empty"
        assert response_json.get("name_en") == suggestion_payload["name_en"], "Returned name_en does not match"
    except requests.RequestException as e:
        assert False, f"RequestException occurred: {e}"

test_suggestions_post_should_create_new_term_suggestion()
