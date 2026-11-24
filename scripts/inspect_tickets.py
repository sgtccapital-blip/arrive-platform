import re
import os
import json
import html

SCRIPT_DIR = "/Users/admin/.gemini/antigravity/brain/4192e6d0-d037-4f1f-b599-dfb5723790c9/scratch/mieventos"

for i in range(1, 14):
    file_path = os.path.join(SCRIPT_DIR, f"event_{i}.html")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    print(f"\n==================== EVENT {i} ====================")
    # Event title
    title_m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.S | re.I)
    title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else ""
    print("TITLE:", title)
    
    # Event date / time in body
    date_m = re.search(r'class="[^"]*event-date[^"]*"[^>]*>(.*?)</div>', content, re.S | re.I)
    if date_m:
        print("DATE_ELEM:", re.sub(r'<[^>]+>', ' ', date_m.group(1)).strip())
        
    # Venue in body
    venue_m = re.search(r'class="[^"]*event-venue[^"]*"[^>]*>(.*?)</div>', content, re.S | re.I)
    if venue_m:
        print("VENUE_ELEM:", re.sub(r'<[^>]+>', ' ', venue_m.group(1)).strip())

    # Full description
    desc_m = re.search(r'<div[^>]*class="[^"]*event-description[^"]*"[^>]*>(.*?)</div>\s*</div>', content, re.S | re.I)
    if not desc_m:
        desc_m = re.search(r'id="event-description"[^>]*>(.*?)</div>', content, re.S | re.I)
    desc = re.sub(r'<[^>]+>', '\n', desc_m.group(1)).strip() if desc_m else ""
    # Clean blank lines
    desc_clean = "\n".join([line.strip() for line in desc.splitlines() if line.strip()])
    print("DESCRIPTION:\n", desc_clean[:400] if desc_clean else "None")
    
    # Tickets: find all ticket boxes / names / prices
    # Look for ticket cards
    print("--- TICKETS FOUND ---")
    tickets = re.findall(r'<div[^>]*class="[^"]*ticket-row[^"]*"[^>]*>(.*?)</div>\s*</div>', content, re.S | re.I)
    if not tickets:
        tickets = re.findall(r'<div[^>]*class="[^"]*ticket[^"]*"[^>]*>(.*?)</div>\s*</div>', content, re.S | re.I)
        
    # Search for ticket text blocks
    ticket_names = re.findall(r'<div[^>]*class="[^"]*(?:ticket-name|ticket_title|name)[^"]*"[^>]*>(.*?)</div>', content, re.S | re.I)
    prices = re.findall(r'<div[^>]*class="[^"]*(?:ticket-price|price)[^"]*"[^>]*>(.*?)</div>', content, re.S | re.I)
    
    # Let's search for "$" or "FREE" or "GRATIS"
    money_matches = re.findall(r'(\b(?:FREE|GRATIS|TICKET\s*FREE|OPEN\s*BAR|\$\d+(?:\.\d{2})?)\b[^\n<]*)', content, re.I)
    unique_money = list(set([m.strip() for m in money_matches if len(m.strip()) < 80]))[:10]
    print("PERKS/PRICING HINTS:", unique_money)
