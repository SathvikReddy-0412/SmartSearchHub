import os
import uvicorn

if __name__ == "__main__":
    # If PORT is specified in env (common for cloud platforms like Render), default to 0.0.0.0
    # otherwise default to 127.0.0.1 for local development in VS Code.
    default_host = "0.0.0.0" if os.environ.get("PORT") else "127.0.0.1"
    
    host = os.environ.get("HOST", default_host)
    port = int(os.environ.get("PORT", 8001))
    reload = os.environ.get("RELOAD", "True").lower() in ("true", "1")

    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=reload
    )