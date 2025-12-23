import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}


def test_terms_post_should_create_term_and_store_initial_en_capitalized():
    url = f"{BASE_URL}/api/v1/terms"
    term_data = {
        "name_en": "exampleName",
        "name_ko": "예제명",  # assuming the schema requires other fields e.g. Korean name
        "abbreviation": "EX",
        "description": "Description for example term",
        "synonyms": ["exTerm", "sampleTerm"],
        "hashtags": ["#example", "#term"],
        "process_ids": []  # assuming terms can be linked to processes
    }

    created_id = None

    try:
        # Create term
        response = requests.post(url, json=term_data, headers=HEADERS, timeout=30)
        assert response.status_code == 201 or response.status_code == 200, f"Unexpected status code: {response.status_code}, response: {response.text}"
        json_resp = response.json()
        # The response should contain the created term details including an ID and initial_en

        created_id = json_resp.get("id") or json_resp.get("termId")
        assert created_id is not None, "Response does not contain term ID"

        # Verify the initial_en field is set to uppercase first letter of name_en
        initial_en = json_resp.get("initial_en")
        assert initial_en is not None, "initial_en field is missing in response"
        expected_initial = term_data["name_en"][0].upper()
        assert initial_en == expected_initial, f"initial_en expected '{expected_initial}', got '{initial_en}'"

    finally:
        # Cleanup: delete created term if created
        if created_id:
            del_url = f"{BASE_URL}/api/v1/terms/{created_id}"
            del_response = requests.delete(del_url, headers=HEADERS, timeout=30)
            assert del_response.status_code == 204 or del_response.status_code == 200, f"Failed to delete term with id {created_id}, status: {del_response.status_code}"


test_terms_post_should_create_term_and_store_initial_en_capitalized()