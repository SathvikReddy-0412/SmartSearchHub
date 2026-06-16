import os
import requests

# Global patch to prevent requests from blocking indefinitely
original_request = requests.Session.request
def patched_request(self, method, url, **kwargs):
    if 'timeout' not in kwargs:
        kwargs['timeout'] = 10.0
    return original_request(self, method, url, **kwargs)
requests.Session.request = patched_request

# Detect if running on Render
IS_RENDER = os.environ.get("RENDER") == "true" or os.environ.get("PORT") is not None

SPRING_BOOT_HOST = os.environ.get("SPRING_BOOT_HOST")
SPRING_BOOT_PORT = os.environ.get("SPRING_BOOT_PORT")

if SPRING_BOOT_HOST:
    SPRING_BOOT_URL = f"http://{SPRING_BOOT_HOST}:{SPRING_BOOT_PORT or '8080'}"
else:
    default_backend = "https://smartsearchhub-zox0.onrender.com" if IS_RENDER else "http://localhost:8080"
    SPRING_BOOT_URL = os.environ.get("SPRING_BOOT_URL") or os.environ.get("SPRING_BACKEND_URL") or default_backend

NODE_JS_HOST = os.environ.get("NODE_JS_HOST")
NODE_JS_PORT = os.environ.get("NODE_JS_PORT")

if NODE_JS_HOST:
    NODE_JS_URL = f"http://{NODE_JS_HOST}:{NODE_JS_PORT or '5001'}"
else:
    default_nodejs = "https://smartsearchhub-nodejs.onrender.com" if IS_RENDER else "http://localhost:5001"
    NODE_JS_URL = os.environ.get("NODE_JS_URL") or default_nodejs
