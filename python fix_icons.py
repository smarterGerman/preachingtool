import base64
import requests
from pathlib import Path

print("Fixing the ACTUAL icons found in your project...")

# Download icons
icons = {
    'mike_inactive': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-symbol.png',
    'mike_active': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png',
    'skip': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-skip-button-symbol.png'
}

base64_icons = {}
for name, url in icons.items():
    print(f"Converting {name}...")
    response = requests.get(url)
    base64_string = base64.b64encode(response.content).decode('utf-8')
    base64_icons[name] = f"data:image/png;base64,{base64_string}"

# THE ACTUAL URLS FROM YOUR PROJECT
replacements = {
    'https://www.filepicker.io/api/file/g2mJctJsRrWcAjCanOv2': base64_icons['skip'],
    'https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ': base64_icons['mike_inactive'],
    'https://www.filepicker.io/api/file/Qf8Um3rTJihrNb0j2bCg': base64_icons['mike_active'],
}

count = 0
for path in Path('.').rglob('*.html'):
    with open(path, 'r') as f:
        content = original = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        count += 1
        print(f"Fixed: {path}")

for path in Path('.').rglob('*.js'):
    with open(path, 'r') as f:
        content = original = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        count += 1
        print(f"Fixed: {path}")

print(f"\nDone! Fixed {count} files")