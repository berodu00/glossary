import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

def test_processes_get_should_list_all_non_deleted_processes():
    url = f"{BASE_URL}/api/v1/processes"
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        assert response.status_code == 200, f"Expected status 200 OK but got {response.status_code}"
        json_data = response.json()
        assert isinstance(json_data, list), "Response is not a list"
        # Check that none of the returned processes have a deleted_at field set (soft deleted)
        for process in json_data:
            # We allow deleted_at to be missing or None
            deleted_at = process.get("deleted_at", None)
            assert deleted_at is None, f"Found soft deleted process with id={process.get('id')} in the list"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_processes_get_should_list_all_non_deleted_processes()