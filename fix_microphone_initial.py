import os

count = 0
for root, dirs, files in os.walk('.'):
    if 'index.html' in files:
        filepath = os.path.join(root, 'index.html')
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Fix the microphone button to show inactive icon initially
        if 'id="audio-img"' in content:
            content = content.replace(
                'onclick="turnOnMicro();" src="https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png" id="audio-img"',
                'onclick="turnOnMicro();" src="https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-symbol.png" id="audio-img"'
            )
            
            with open(filepath, 'w') as f:
                f.write(content)
            count += 1
            print(f"Fixed microphone initial state in: {filepath}")

print(f"\nFixed {count} files")