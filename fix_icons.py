import base64
import requests
import re
from pathlib import Path

print("Starting icon fix...")

# Download icons from GitHub
icons = {
    'mike_inactive': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-symbol.png',
    'mike_active': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png',
    'skip': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-skip-button-symbol.png'
}

# Convert to base64
base64_icons = {}
for name, url in icons.items():
    print(f"Downloading {name}...")
    response = requests.get(url)
    base64_string = base64.b64encode(response.content).decode('utf-8')
    base64_icons[name] = f"data:image/png;base64,{base64_string}"

# These are the URLs to replace - ADD MORE IF YOU FIND THEM
replacements = {
    'https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5': base64_icons['mike_inactive'],
    'https://www.filepicker.io/api/file/WPV0ut4XRqqLIv7R9SYa': base64_icons['skip'],
    'https://www.filepicker.io/api/file/Qf8Um3rTJihrNb0j2bCg': base64_icons['mike_active'],

}

# Find and replace in all files
count = 0
for level in ['A1', 'A2', 'B1', 'B2']:
    if not Path(level).exists():
        print(f"Skipping {level} - folder not found")
        continue
    
    print(f"Processing {level}...")
    
    for lesson in Path(level).iterdir():
        if not lesson.is_dir():
            continue
            
        # Fix HTML files
        for html in lesson.glob('*.html'):
            with open(html, 'r') as f:
                content = f.read()
            
            changed = False
            for old_url, new_data in replacements.items():
                if old_url in content:
                    content = content.replace(old_url, new_data)
                    changed = True
            
            if changed:
                with open(html, 'w') as f:
                    f.write(content)
                count += 1
                print(f"  Fixed: {html}")
        
        # Fix JS files
        for js in lesson.glob('*.js'):
            with open(js, 'r') as f:
                content = f.read()
            
            changed = False
            for old_url, new_data in replacements.items():
                if old_url in content:
                    content = content.replace(old_url, new_data)
                    changed = True
            
            if changed:
                with open(js, 'w') as f:
                    f.write(content)
                count += 1
                print(f"  Fixed: {js}")

print(f"\nDone! Fixed {count} files")