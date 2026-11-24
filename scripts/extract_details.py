import json
import re
import os
import urllib.request

SCRIPT_DIR = "/Users/admin/.gemini/antigravity/brain/4192e6d0-d037-4f1f-b599-dfb5723790c9/scratch/mieventos"
OUT_IMG_DIR = "/Users/admin/Documents/Arrive Platform/public/images/events-nov"

with open(os.path.join(SCRIPT_DIR, "tabs_meta.json")) as f:
    tabs = json.load(f)

with open(os.path.join(SCRIPT_DIR, "extracted_raw.json")) as f:
    events = json.load(f)

detailed_list = []

for ev in events:
    idx = ev["index"]
    tab_info = tabs[idx - 1]
    file_path = tab_info["html_file"]
    
    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Extract ticket tiers
    # Looking for ticket name, price, description in MiEventos
    # Common patterns: class="ticket-name", class="ticket-price", etc.
    ticket_blocks = re.findall(r'<div[^>]*class="[^"]*ticket[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>', html, re.S | re.I)
    
    # Also find any text like "OPEN BAR", "HASTA", "ENTRADA", etc.
    ld = ev.get("ld_info", {})
    
    # Download high-res image
    img_urls = ld.get("image", [])
    img_url = img_urls[0] if img_urls else ev.get("og_img", "")
    
    local_img_name = f"flyer-event-{idx}.jpg"
    local_img_path = os.path.join(OUT_IMG_DIR, local_img_name)
    
    if img_url:
        try:
            req = urllib.request.Request(img_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=10) as response, open(local_img_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {img_url} -> {local_img_name}")
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
            local_img_name = ev.get("og_img", "")

    # Clean title
    title = ld.get("name") or ev.get("og_title")
    # Date formatting
    start_date = ld.get("startDate", "")
    end_date = ld.get("endDate", "")
    
    # Performers
    performers = []
    for p in ld.get("performer", []):
        performers.append({
            "name": p.get("name", ""),
            "role": "DJ" if "dj" in p.get("name", "").lower() else "Artista"
        })
        
    detailed_list.append({
        "index": idx,
        "url": ev["url"],
        "title": title,
        "desc": ld.get("description", ev.get("og_desc", "")),
        "venue": ld.get("location", {}).get("name", ""),
        "address": ld.get("location", {}).get("address", {}).get("streetAddress", ""),
        "startDate": start_date,
        "endDate": end_date,
        "price": ld.get("offers", {}).get("price", 0),
        "performers": performers,
        "local_img": f"/images/events-nov/{local_img_name}"
    })

with open(os.path.join(SCRIPT_DIR, "detailed_summary.json"), "w", encoding="utf-8") as f:
    json.dump(detailed_list, f, indent=2, ensure_ascii=False)

print("\n--- SUMMARY OF EXTRACTED EVENTS ---")
for d in detailed_list:
    print(f"[{d['index']}] {d['title']} | Venue: {d['venue']} | Start: {d['startDate']} | Price: ${d['price']}")
