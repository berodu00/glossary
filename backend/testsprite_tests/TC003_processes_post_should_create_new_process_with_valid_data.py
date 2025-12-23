import requests

BASE_URL = "http://localhost:8080"
PROCESS_ENDPOINT = f"{BASE_URL}/api/v1/processes"
AUTH_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

def test_processes_post_should_create_new_process_with_valid_data():
    # Define valid process data payload with required 'name' and 'order' fields
    process_data = {
        "name": "Test Process",
        "order": 1
    }
    created_process_id = None

    try:
        # Create a new process via POST
        response = requests.post(
            PROCESS_ENDPOINT,
            headers=HEADERS,
            json=process_data,
            timeout=30
        )
        assert response.status_code in (200, 201), f"Unexpected status code: {response.status_code}, Response: {response.text}"
        created_process = response.json()
        # Validate that the response contains expected fields and matches input
        assert "id" in created_process and created_process["id"] is not None, "Response missing 'id'"
        assert created_process.get("name") == process_data["name"], "Process name mismatch"

        created_process_id = created_process["id"]

        # Retrieve the newly created process to verify it is stored correctly
        get_url = f"{PROCESS_ENDPOINT}/{created_process_id}"
        get_response = requests.get(get_url, headers=HEADERS, timeout=30)
        assert get_response.status_code == 200, f"Failed to get created process, status code: {get_response.status_code}"
        retrieved_process = get_response.json()
        assert retrieved_process.get("id") == created_process_id, "Retrieved process ID mismatch"
        assert retrieved_process.get("name") == process_data["name"], "Retrieved process name mismatch"

    finally:
        # Clean up: delete the created process if it was made
        if created_process_id:
            delete_url = f"{PROCESS_ENDPOINT}/{created_process_id}"
            delete_response = requests.delete(delete_url, headers=HEADERS, timeout=30)
            # Soft delete expected: status code 200 or 204
            assert delete_response.status_code in [200, 204], f"Failed to delete process, status code: {delete_response.status_code}"


test_processes_post_should_create_new_process_with_valid_data()
