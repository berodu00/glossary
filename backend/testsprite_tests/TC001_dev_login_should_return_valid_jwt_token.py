import requests

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

def test_dev_login_should_return_valid_jwt_token():
    url = f"{BASE_URL}/api/v1/auth/dev-login"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "userId": "test-user",
        "role": "ROLE_DEV"
    }

    response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    assert response.status_code == 200, f"Expected status 200, got {response.status_code}"

    json_data = response.json()
    assert "accessToken" in json_data, "Response JSON missing 'accessToken'"

    token = json_data["accessToken"]
    assert isinstance(token, str) and len(token) > 0, "'accessToken' should be a non-empty string"

    # Verify if token is a valid JWT structure (header.payload.signature)
    parts = token.split('.')
    assert len(parts) == 3, "accessToken is not a valid JWT format"


test_dev_login_should_return_valid_jwt_token()
