import os
import sys

# Ensure the gateway directory is in sys.path for absolute imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.api_service import app