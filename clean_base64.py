import os
import re

count = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith(('.js', '.html')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Delete ANY base64 garbage after .png
            new_content = re.sub(r'\.png[A-Za-z0-9+/=]{20,}"', '.png"', content)
            
            if content != new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                count += 1
                print(f"Cleaned: {filepath}")

print(f"\nDone! Fixed {count} files")