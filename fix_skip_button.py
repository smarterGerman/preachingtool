import os

count = 0
for root, dirs, files in os.walk('.'):
    if 'index.html' in files:
        filepath = os.path.join(root, 'index.html')
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Fix ONLY the next/skip button
        if 'class="next-button"' in content:
            content = content.replace(
                'class="next-button"><img src="https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png"',
                'class="next-button"><img src="https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-skip-button-symbol.png"'
            )
            
            with open(filepath, 'w') as f:
                f.write(content)
            count += 1
            print(f"Fixed skip button in: {filepath}")

print(f"\nFixed {count} files")