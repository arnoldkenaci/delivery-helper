import os
from dotenv import load_dotenv

load_dotenv()

GRAPHHOPPER_URL = os.getenv("GRAPHHOPPER_URL", "http://localhost:8989/route")
