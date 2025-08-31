# fix_icon_urls.py
import os
import re

# Fix the skip button to use skip icon, not microphone active
for root, dirs, files in os.walk('.'):
    for file in files:
        if file == 'script.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # The skip button is probably using microphone-button-active-symbol.png
            # It should use skip-button-symbol.png
            
            # Find where skip functionality uses wrong icon
            content = re.sub(
                r'(nextButton.*?src.*?=.*?)microphone-button-active-symbol\.png',
                r'\1skip-button-symbol.png',
                content,
                flags=re.DOTALL
            )
            
            # Also check if the active microphone URL itself is correct
            if 'microphone-button-active-symbol.png' not in content:
                # The active mic icon might be missing entirely
                # Look for where it switches to active state
                content = re.sub(
                    r'(audio_img\.src = "https://raw\.githubusercontent\.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-symbol\.png)',
                    r'audio_img.src = "https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png',
                    content
                )
            
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Fixed: {filepath}")

print("Done!")