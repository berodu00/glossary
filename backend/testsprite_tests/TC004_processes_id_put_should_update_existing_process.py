import requests

BASE_URL = "http://localhost:8080"
TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
TIMEOUT = 30


def test_processes_id_put_should_update_existing_process():
    # First create a new process to update
    create_payload = {
        "name": "Initial Process Name"
    }
    create_resp = requests.post(
        f"{BASE_URL}/api/v1/processes",
        headers=HEADERS,
        json=create_payload,
        timeout=TIMEOUT
    )
    assert create_resp.status_code == 201, f"Failed to create process for update test: {create_resp.text}"
    created_process = create_resp.json()
    process_id = created_process.get("id")
    assert process_id is not None, "Created process ID is None"

    try:
        # Prepare updated data
        updated_payload = {
            "name": "Updated Process Name"
        }

        # Perform PUT request to update the process
        update_resp = requests.put(
            f"{BASE_URL}/api/v1/processes/{process_id}",
            headers=HEADERS,
            json=updated_payload,
            timeout=TIMEOUT
        )
        assert update_resp.status_code == 200, f"Update failed: {update_resp.text}"
        updated_process = update_resp.json()

        # Verify the updated fields
        assert updated_process.get("name") == updated_payload["name"], "Process name was not updated correctly"

        # Retrieve the process again to verify persistence
        get_resp = requests.get(
            f"{BASE_URL}/api/v1/processes/{process_id}",
            headers=HEADERS,
            timeout=TIMEOUT
        )
        assert get_resp.status_code == 200, f"Failed to get process after update: {get_resp.text}"
        fetched_process = get_resp.json()
        assert fetched_process.get("name") == updated_payload["name"], "Persisted process name mismatch"

    finally:
        # Clean up by deleting the created process
        requests.delete(
            f"{BASE_URL}/api/v1/processes/{process_id}",
            headers=HEADERS,
            timeout=TIMEOUT
        )


test_processes_id_put_should_update_existing_process()
