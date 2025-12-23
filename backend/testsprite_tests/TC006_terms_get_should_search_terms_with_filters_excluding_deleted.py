import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def test_terms_get_should_search_terms_with_filters_excluding_deleted():
    # Setup: Create a term that is not deleted to be used in filter tests
    create_term_payload = {
        "name_ko": "테스트용어",
        "name_en": "TestTerm",
        "initial_en": "T",
        "processes": [1],  # Assuming process with id 1 exists
        "description": "A term used for testing",
        "abbreviation": "TT",
        "synonyms": ["TestTermSyn"],
        "hashtags": ["#test"],
        # no deleted_at to indicate not deleted
    }
    term_id = None

    try:
        # Create a new term
        resp_create = requests.post(
            f"{BASE_URL}/api/v1/terms",
            json=create_term_payload,
            headers=HEADERS,
            timeout=30
        )
        assert resp_create.status_code == 201, f"Failed to create term, status: {resp_create.status_code}, body: {resp_create.text}"
        term_id = resp_create.json().get("id")
        assert term_id is not None, "Created term id is None"

        # Also create a soft deleted term by creating then deleting it
        resp_create_del = requests.post(
            f"{BASE_URL}/api/v1/terms",
            json={
                "name_ko": "삭제된용어",
                "name_en": "DeletedTerm",
                "initial_en": "D",
                "processes": [1],
                "description": "A soft deleted term for testing exclusion",
                "abbreviation": "DT",
                "synonyms": [],
                "hashtags": []
            },
            headers=HEADERS,
            timeout=30
        )
        assert resp_create_del.status_code == 201, f"Failed to create term for deletion, status: {resp_create_del.status_code}, body: {resp_create_del.text}"
        deleted_term_id = resp_create_del.json().get("id")
        assert deleted_term_id is not None, "Created term for deletion id is None"

        # Soft delete the term (soft delete means setting deleted_at; API expects DELETE)
        resp_delete = requests.delete(
            f"{BASE_URL}/api/v1/terms/{deleted_term_id}",
            headers=HEADERS,
            timeout=30
        )
        assert resp_delete.status_code == 204, f"Failed to soft delete term, status: {resp_delete.status_code}, body: {resp_delete.text}"

        # Test searching terms with filters:
        # keyword = "Test"
        # process = 1
        # initial = "T"
        params = {
            "keyword": "Test",
            "process": 1,
            "initial": "T"
        }
        resp_search = requests.get(
            f"{BASE_URL}/api/v1/terms",
            headers=HEADERS,
            params=params,
            timeout=30
        )
        assert resp_search.status_code == 200, f"Search request failed, status: {resp_search.status_code}, body: {resp_search.text}"
        terms = resp_search.json()
        assert isinstance(terms, list), "Search response is not a list"

        # Check that the created non-deleted term is included
        included = any(t.get("id") == term_id for t in terms)
        assert included, "Created term not found in search results"

        # Check that the soft deleted term is excluded
        excluded = all(t.get("id") != deleted_term_id for t in terms)
        assert excluded, "Deleted term found in search results"

    finally:
        # Cleanup: Delete the created non-deleted term if exists
        if term_id:
            delete_resp = requests.delete(
                f"{BASE_URL}/api/v1/terms/{term_id}",
                headers=HEADERS,
                timeout=30
            )
            # Accept 204 No Content or 404 Not Found if already deleted
            assert delete_resp.status_code in (204, 404), f"Failed cleanup delete of term_id={term_id}"

        # Cleanup: Delete the soft deleted term forcibly if needed (in case soft delete did not persist)
        if 'deleted_term_id' in locals() and deleted_term_id:
            # Try deleting again to clean up if 404 not returned before
            requests.delete(
                f"{BASE_URL}/api/v1/terms/{deleted_term_id}",
                headers=HEADERS,
                timeout=30
            )

test_terms_get_should_search_terms_with_filters_excluding_deleted()