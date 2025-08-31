import os
import re

# Read the base64 from file
with open('base64.txt', 'r') as f:
    new_image = f.read().strip()

# Pattern to find the broken image src
pattern = r'audio_img\.src = "https://raw\.githubusercontent\.com[^"]*preaching-tool-microphone-button-active-symbol\.png[^"]*"'
replacement = f'audio_img.src = "{new_image}"'

# Process all JS files
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.js'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace all occurrences
            new_content = re.sub(pattern, replacement, content)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed: {filepath}")