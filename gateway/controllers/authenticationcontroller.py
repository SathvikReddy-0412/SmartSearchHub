import requests
from fastapi import APIRouter, HTTPException, status, Request
from models.schemas import (
    UserSignup,
    UserLogin
)

router = APIRouter()

import os

SPRING_BOOT_URL = os.getenv("SPRING_BACKEND_URL", "http://localhost:8080")


def parse_error_detail(response):
    try:
        # Check if the content type is JSON
        if "application/json" in response.headers.get("Content-Type", "").lower():
            json_data = response.json()
            return json_data.get("message") or json_data.get("detail") or json_data.get("error") or "Request failed"
    except Exception:
        pass
    
    # Fallback to status-code-based messages instead of raw HTML
    if response.status_code == 502:
        return "Bad Gateway: Backend service is currently unavailable"
    elif response.status_code == 504:
        return "Gateway Timeout: Backend service took too long to respond"
    elif response.status_code == 401:
        return "Unauthorized: Invalid email or password"
    elif response.status_code == 403:
        return "Forbidden: Access denied"
    else:
        return f"Backend error: Received status code {response.status_code}"


@router.post("/register")
def register(user: UserSignup):
    payload = {
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "role": "USER"
    }
    try:
        response = requests.post(f"{SPRING_BOOT_URL}/users", json=payload)
        if response.status_code in [200, 201]:
            return {
                "message": "Registration Successful",
                "user": response.json()
            }
        else:
            detail = parse_error_detail(response)
            raise HTTPException(status_code=response.status_code, detail=detail)
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spring Boot backend unavailable: {str(e)}"
        )


@router.post("/login")
def login(user: UserLogin):
    payload = {
        "email": user.email,
        "password": user.password
    }
    try:
        response = requests.post(f"{SPRING_BOOT_URL}/users/login", json=payload)
        if response.status_code == 200:
            resp_data = response.json()
            return {
                "message": "Login Successful",
                "token": resp_data.get("token"),
                "user": resp_data.get("user")
            }
        else:
            detail = parse_error_detail(response)
            raise HTTPException(status_code=response.status_code, detail=detail)
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spring Boot backend unavailable: {str(e)}"
        )


@router.get("/profile")
def get_profile(request: Request):
    headers = {}
    auth_header = request.headers.get("Authorization")
    if auth_header:
        headers["Authorization"] = auth_header
    try:
        response = requests.get(f"{SPRING_BOOT_URL}/users/profile", headers=headers)
        if response.status_code == 200:
            return {
                "message": "Profile fetched successfully",
                "user": response.json()
            }
        else:
            detail = parse_error_detail(response)
            raise HTTPException(status_code=response.status_code, detail=detail)
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spring Boot backend unavailable: {str(e)}"
        )