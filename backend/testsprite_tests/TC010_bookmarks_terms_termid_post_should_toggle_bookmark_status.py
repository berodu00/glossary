import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

def test_bookmarks_terms_termid_post_should_toggle_bookmark_status():
    # First create a term to test bookmarking on
    term_payload = {
        "name_kor": "테스트용어",
        "name_en": "TestTerm",
        "abbreviation": "TT",
        "description": "This is a test term for bookmark toggle testing.",
        "synonym": "TestTermSyn",
        "process_ids": [],
        "photos": [],
        "hashtags": []
    }

    term_id = None

    try:
        # Create term
        response = requests.post(
            f"{BASE_URL}/api/v1/terms",
            headers=HEADERS,
            json=term_payload,
            timeout=30
        )
        assert response.status_code == 201, f"Failed to create term: {response.text}"
        term = response.json()
        term_id = term.get("id")
        assert term_id is not None, "Created term ID is None"

        # Initial toggle bookmark - should add the bookmark
        toggle_response_1 = requests.post(
            f"{BASE_URL}/api/v1/bookmarks/terms/{term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert toggle_response_1.status_code == 200, f"Failed to toggle bookmark first time: {toggle_response_1.text}"
        resp_data_1 = toggle_response_1.json()
        # Expect response to indicate bookmarked: True (exact field depends on API, so check keys)
        assert "bookmarked" in resp_data_1, "Response missing 'bookmarked' field on first toggle"
        assert resp_data_1["bookmarked"] is True, "Expected bookmarked True after first toggle"

        # Second toggle bookmark - should remove the bookmark
        toggle_response_2 = requests.post(
            f"{BASE_URL}/api/v1/bookmarks/terms/{term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert toggle_response_2.status_code == 200, f"Failed to toggle bookmark second time: {toggle_response_2.text}"
        resp_data_2 = toggle_response_2.json()
        assert "bookmarked" in resp_data_2, "Response missing 'bookmarked' field on second toggle"
        assert resp_data_2["bookmarked"] is False, "Expected bookmarked False after second toggle"

    finally:
        # Cleanup: Delete the term created
        if term_id:
            delete_response = requests.delete(
                f"{BASE_URL}/api/v1/terms/{term_id}",
                headers=HEADERS,
                timeout=30
            )
            # We can assert delete status or ignore if resource already deleted
            assert delete_response.status_code in (204, 200, 202), f"Failed to delete term: {delete_response.text}"


test_bookmarks_terms_termid_post_should_toggle_bookmark_status()