# api/index.py

import requests
import re
from http.cookies import SimpleCookie

# Target URL jise aap clone karna chahte hain
TARGET_URL = "https://studyuk.fun"
# Aapka naya Telegram link
NEW_TELEGRAM_LINK = "https://t.me/+rc5Psv_S2VJkMGM1"
# Original Telegram link ka pattern (case-insensitive)
ORIGINAL_TELEGRAM_PATTERN = r"https:\/\/t\.me\/\+?[\w-]+" # Ye thoda generic rakha hai taaki variations handle ho sakein

def handler(request):
    try:
        path = request.get("path", "")
        # Remove leading slash for clean path handling
        if path.startswith('/'):
            path = path[1:]

        full_target_url = f"{TARGET_URL}/{path}"
        query_params = request.get("query", {})
        method = request.get("method", "GET")
        headers = request.get("headers", {})
        body = request.get("body", None)

        # Remove problematic headers that cause 'Invalid character in header content'
        # Aur hop-by-hop headers ko bhi remove karein jo proxying mein issue karte hain
        headers_to_remove = [
            'accept-encoding', 'content-length', 'connection', 'keep-alive',
            'proxy-authenticate', 'proxy-authorization', 'te', 'trailers',
            'transfer-encoding', 'upgrade', 'host', 'cache-control' # 'cache-control' specifically for your error
        ]
        
        # Original request headers ko filter karein
        filtered_headers = {
            k: v for k, v in headers.items()
            if k.lower() not in headers_to_remove
        }
        
        # 'User-Agent' set karein agar missing ho to avoid blocking by some sites
        if 'user-agent' not in filtered_headers:
            filtered_headers['User-Agent'] =
          
