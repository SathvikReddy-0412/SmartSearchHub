import os

SPRING_BOOT_URL = os.environ.get("SPRING_BOOT_URL") or os.environ.get("SPRING_BACKEND_URL") or "http://localhost:8080"
NODE_JS_URL = os.environ.get("NODE_JS_URL") or "http://localhost:5001"
