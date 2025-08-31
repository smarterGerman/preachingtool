import re
from pathlib import Path

print("Finding ALL Filepicker URLs in your project...\n")

urls = {}
pattern = r'https://www\.filepicker\.io/api/file/[a-zA-Z0-9]+'

for level in ['A1', 'A2', 'B1', 'B2']:
    if not Path(level).exists():
        continue
    
    for lesson in Path(level).iterdir():
        if not lesson.is_dir():
            continue
            
        for file in lesson.glob('*.html'):
            with open(file, 'r') as f:
                content = f.read()
                found = re.findall(pattern, content)
                for url in found:
                    if url not in urls:
                        urls[url] = []
                    urls[url].append(str(file))
        
        for file in lesson.glob('*.js'):
            with open(file, 'r') as f:
                content = f.read()
                found = re.findall(pattern, content)
                for url in found:
                    if url not in urls:
                        urls[url] = []
                    urls[url].append(str(file))

print(f"Found {len(urls)} unique Filepicker URLs:\n")
for url, files in urls.items():
    print(f"{url}")
    print(f"  Used in {len(files)} files")
    print(f"  First occurrence: {files[0]}\n")