import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def test_terms_id_get_should_return_term_detail_or_404_if_deleted():
    # 1. Create a new term
    create_payload = {
        "name_kr": "테스트용어_TC008",
        "name_en": "TestTermTC008",
        "abbreviation": "TTC008",
        "description": "This is a test term created for TC008.",
        "synonyms": ["TestTermSynonym"],
        "related_processes": ["TestProcess1"],
        "hashtags": ["#test", "#term"]
    }
    term_id = None
    try:
        create_resp = requests.post(
            f"{BASE_URL}/api/v1/terms",
            headers=HEADERS,
            json=create_payload,
            timeout=30
        )
        assert create_resp.status_code == 201, f"Term creation failed: {create_resp.text}"
        term_json = create_resp.json()
        term_id = term_json.get("id")
        assert term_id is not None, "Created term ID not found"

        # 2. Get the created term detail (should succeed)
        get_resp = requests.get(
            f"{BASE_URL}/api/v1/terms/{term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert get_resp.status_code == 200, f"Failed to get term detail: {get_resp.text}"
        get_json = get_resp.json()
        assert get_json.get("id") == term_id, "Returned term ID mismatch"
        assert get_json.get("name_en") == create_payload["name_en"], "Term name_en mismatch"
        assert get_json.get("initial_en") == create_payload["name_en"][0].upper(), "Term initial_en mismatch"

        # 3. Soft delete the term
        delete_resp = requests.delete(
            f"{BASE_URL}/api/v1/terms/{term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert delete_resp.status_code == 204, f"Failed to delete term: {delete_resp.text}"

        # 4. Try to get the term detail again after deletion - expect 404
        get_deleted_resp = requests.get(
            f"{BASE_URL}/api/v1/terms/{term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert get_deleted_resp.status_code == 404, f"Deleted term still accessible: {get_deleted_resp.text}"

    finally:
        # Cleanup: ensure the term is deleted if it still exists (just in case)
        if term_id:
            requests.delete(
                f"{BASE_URL}/api/v1/terms/{term_id}",
                headers=HEADERS,
                timeout=10
            )

test_terms_id_get_should_return_term_detail_or_404_if_deleted()
