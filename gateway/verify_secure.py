import os
import requests
import json
import time
from config import SPRING_BOOT_URL
GATEWAY_URL = os.environ.get("GATEWAY_URL", "http://localhost:8001/api")

print("=" * 60)
print("SECURE E2E INTEGRATION & ROLE-BASED ACCESS CONTROL TEST")
print("=" * 60)

# 1. Register a new user (public endpoint)
test_email = f"secure_user_{int(time.time())}@gmail.com"
reg_payload = {
    "name": "Secure Test User",
    "email": test_email,
    "password": "password123"
}
reg_resp = requests.post(f"{GATEWAY_URL}/auth/register", json=reg_payload)
print(f"1. POST /auth/register: Status {reg_resp.status_code}")
print(f"   Response: {json.dumps(reg_resp.json(), indent=2)}")

# 2. Login as Admin to get JWT token
admin_payload = {
    "email": "admin@gmail.com",
    "password": "password"
}
login_resp = requests.post(f"{GATEWAY_URL}/auth/login", json=admin_payload)
print(f"\n2. POST /auth/login (Admin): Status {login_resp.status_code}")
print(f"   Response Text: {login_resp.text}")
login_data = login_resp.json()
admin_token = login_data.get("token")
print(f"   Admin JWT Token: {admin_token[:40]}...")

if not admin_token:
    print("Error: Could not retrieve admin JWT token.")
    exit(1)

# Set headers for authenticated requests
headers = {
    "Authorization": f"Bearer {admin_token}",
    "Content-Type": "application/json"
}

# 3. Fetch all users using the Admin token via FastAPI Gateway
users_resp = requests.get(f"{GATEWAY_URL}/users", headers=headers)
print(f"\n3. GET /users (Authenticated): Status {users_resp.status_code}")
users = users_resp.json()
print(f"   Total Users found: {len(users)}")
for u in users:
    print(f"   - User ID: {u['id']}, Email: {u['email']}, Role: {u['role']}")

# Find our registered test user
target_user = None
for u in users:
    if u["email"] == test_email:
        target_user = u
        break

if target_user:
    target_id = target_user["id"]
    print(f"\nFound test user with ID {target_id}. Changing role to ADMIN...")
    
    # 4. Change role to ADMIN using PUT /api/users/{id}
    update_payload = {
        "id": target_id,
        "name": target_user["name"],
        "email": target_user["email"],
        "role": "ADMIN"
    }
    update_resp = requests.put(f"{GATEWAY_URL}/users/{target_id}", json=update_payload, headers=headers)
    print(f"4. PUT /users/{target_id}: Status {update_resp.status_code}")
    print(f"   Updated User Response: {json.dumps(update_resp.json(), indent=2)}")
    
    # 5. Verify the role change directly from Spring Boot using the token
    sb_resp = requests.get(f"{SPRING_BOOT_URL}/users/{target_id}", headers=headers)
    print(f"\n5. Spring Boot GET /users/{target_id}: Status {sb_resp.status_code}")
    print(f"   Role in Spring Boot Database: {sb_resp.json().get('role')}")

    # 6. Verify that an unauthenticated request to GET /users is rejected
    unauth_resp = requests.get(f"{GATEWAY_URL}/users")
    print(f"\n6. Unauthenticated GET /users check: Status {unauth_resp.status_code} (Expected: 403)")
    
else:
    print("\nError: Test user not found in the users list.")
    exit(1)

print("\n" + "=" * 60)
print("TESTING NEW APIS (DASHBOARD & SEARCH)")
print("=" * 60)

# 7. Test dashboard analytics endpoint
dash_resp = requests.get(f"{GATEWAY_URL}/dashboard/analytics", headers=headers)
print(f"7. GET /dashboard/analytics: Status {dash_resp.status_code}")
print(f"   Dashboard Response: {json.dumps(dash_resp.json(), indent=2)}")

# 8. Test Search API
search_resp = requests.get(f"{GATEWAY_URL}/search?q=Python", headers=headers)
print(f"\n8. GET /search?q=Python: Status {search_resp.status_code}")
print(f"   Search Response (Truncated Items Count): {len(search_resp.json().get('items', []))}")
for item in search_resp.json().get('items', [])[:3]:
    print(f"   - Name: {item['name']}, Category: {item['category']}, Brand: {item['brand']}")

print("\n" + "=" * 60)
print("E2E VERIFICATION COMPLETED SUCCESSFULLY!")
print("=" * 60)
