import urllib.request
import re
import json
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

os.makedirs('public/clinic', exist_ok=True)

# Search queries for Pearl Clinic Jabalpur photos
queries = [
    'Pearl Clinic Vijay Nagar Jabalpur',
    'Dr Diksha Asati Pearl Clinic Jabalpur',
    'Pearl Clinic Jabalpur interior'
]

downloaded = []

for query in queries:
    q_str = urllib.parse.quote(query)
    url = f"https://www.bing.com/images/search?q={q_str}&form=HDRSC2"
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
        
        # Extract murl (image URL)
        murls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', html)
        print(f"Query '{query}' found {len(murls)} images.")
        
        for murl in murls:
            if murl not in downloaded and not murl.endswith('.svg'):
                # Try downloading
                idx = len(downloaded) + 1
                out_path = f"public/clinic/photo_{idx}.jpg"
                try:
                    img_req = urllib.request.Request(murl, headers=headers)
                    img_data = urllib.request.urlopen(img_req, timeout=5).read()
                    if len(img_data) > 10000: # at least 10KB
                        with open(out_path, 'wb') as f:
                            f.write(img_data)
                        print(f"Saved {out_path} ({len(img_data)} bytes) from {murl}")
                        downloaded.append(out_path)
                        if len(downloaded) >= 6:
                            break
                except Exception as e:
                    pass
    except Exception as e:
        print("Search error:", e)

print(f"Total downloaded clinic photos: {len(downloaded)}")
