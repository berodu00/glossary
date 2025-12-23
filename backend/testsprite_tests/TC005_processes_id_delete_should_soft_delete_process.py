import requests
import uuid
import time

BASE_URL = "http://localhost:8080"
HEADERS = {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJURVNUX0FETUlOIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJleHAiOjE3NjY1ODA5MzN9.Unt_jA9vi_fdKvBFkTbmqI8T5XrTJ8XjrmRsIixPIReaoqXDYLINnMBdzXwzy28nRL7n2Jhv8ZUOr54YrK2AMQ",
    "Content-Type": "application/json",
}
TIMEOUT = 30

def test_processes_id_delete_should_soft_delete_process():
    # Step 1: Create a new process (since no process id is provided).
    create_payload = {
        "name": f"Test Process {str(uuid.uuid4())[:8]}"
    }
    process_id = None

    try:
        create_resp = requests.post(
            f"{BASE_URL}/api/v1/processes",
            json=create_payload,
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert create_resp.status_code == 201 or create_resp.status_code == 200, f"Create process failed: {create_resp.text}"
        process_data = create_resp.json()
        # The created resource id should be in the response, either 'id' or '_id'
        process_id = process_data.get("id") or process_data.get("_id") or process_data.get("processId")
        assert process_id is not None, "Created process ID not found in response"

        # Step 2: Delete (soft delete) the created process.
        delete_resp = requests.delete(
            f"{BASE_URL}/api/v1/processes/{process_id}",
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert delete_resp.status_code == 200 or delete_resp.status_code == 204, f"Delete (soft) process failed: {delete_resp.text}"

        # Step 3: Verify the process no longer appears in the list (GET /api/v1/processes).
        list_resp = requests.get(
            f"{BASE_URL}/api/v1/processes",
            headers=HEADERS,
            timeout=TIMEOUT,
        )
        assert list_resp.status_code == 200, f"Get process list failed: {list_resp.text}"
        processes = list_resp.json()
        # Expecting a list/array in response, filter by id to ensure soft deleted process is excluded
        assert isinstance(processes, list), f"Processes response not a list: {processes}"
        ids_in_list = [p.get("id") or p.get("_id") or p.get("processId") for p in processes]
        assert process_id not in ids_in_list, "Soft deleted process still appears in process list"

    finally:
        # Cleanup: Attempt to delete the resource permanently if API supports or ignore errors if already deleted
        if process_id is not None:
            # No explicit permanent delete API given, so ignore or attempt delete again quietly
            try:
                requests.delete(
                    f"{BASE_URL}/api/v1/processes/{process_id}",
                    headers=HEADERS,
                    timeout=TIMEOUT,
                )
            except Exception:
                pass

test_processes_id_delete_should_soft_delete_process()
