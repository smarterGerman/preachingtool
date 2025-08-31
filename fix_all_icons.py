#!/usr/bin/env python3
"""
Robustes Script zum Ersetzen ALLER kaputten Bilder im Preaching Tool.
Findet und ersetzt alle filepicker.io URLs und base64-Bilder.
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

# GitHub URLs für die funktionierenden Icons
GITHUB_URLS = {
    'mic_inactive': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-symbol.png',
    'mic_active': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png',
    'skip': 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-skip-button-symbol.png'
}

class IconReplacer:
    def __init__(self, root_dir='.'):
        self.root_dir = Path(root_dir)
        self.stats = {
            'files_processed': 0,
            'html_files': 0,
            'js_files': 0,
            'replacements': 0,
            'filepicker_urls_found': set(),
            'base64_found': 0
        }
        
    def create_backup(self):
        """Erstellt ein Backup des gesamten Projekts"""
        backup_dir = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        print(f"📦 Erstelle Backup in {backup_dir}/...")
        
        # Erstelle Backup-Verzeichnis
        Path(backup_dir).mkdir(exist_ok=True)
        
        # Kopiere nur die relevanten Ordner
        for folder in ['A1', 'A2', 'B1', 'B2', 'tts']:
            src = self.root_dir / folder
            if src.exists():
                dst = Path(backup_dir) / folder
                try:
                    shutil.copytree(src, dst)
                    print(f"  ✓ {folder} gesichert")
                except Exception as e:
                    print(f"  ⚠️ {folder} konnte nicht gesichert werden: {e}")
        
        return backup_dir
    
    def identify_icon_type(self, context, url):
        """Identifiziert welches Icon basierend auf Kontext"""
        context_lower = context.lower()
        
        # Check für Skip/Next Button
        if any(word in context_lower for word in ['next', 'skip', 'trigger', 'next-button']):
            return 'skip'
        
        # Check für aktives Mikrofon (base64 oder bestimmte URLs)
        if 'data:image' in url or 'base64' in url:
            return 'mic_active'
        
        # Check ob es in einem mic-container ist oder audio-img ID hat
        if any(word in context_lower for word in ['mic-container', 'audio-img', 'turnon', 'microphone']):
            # Wenn es ein base64 ist, dann aktiv, sonst inaktiv
            if 'data:image' in url:
                return 'mic_active'
            return 'mic_inactive'
        
        # Default: Mikrofon inaktiv
        return 'mic_inactive'
    
    def process_html_file(self, filepath):
        """Verarbeitet HTML-Dateien"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Finde alle img tags mit filepicker.io URLs
        img_pattern = r'(<img[^>]*src=["\'])(https://www\.filepicker\.io/api/file/[^"\']+)(["\'][^>]*>)'
        
        for match in re.finditer(img_pattern, content):
            full_match = match.group(0)
            before = match.group(1)
            url = match.group(2)
            after = match.group(3)
            
            self.stats['filepicker_urls_found'].add(url)
            
            # Bestimme Icon-Typ basierend auf Kontext
            # Hole 200 Zeichen vor und nach dem Match für Kontext
            start = max(0, match.start() - 200)
            end = min(len(content), match.end() + 200)
            context = content[start:end]
            
            icon_type = self.identify_icon_type(context, url)
            new_url = GITHUB_URLS[icon_type]
            
            # Ersetze URL
            new_img = before + new_url + after
            content = content.replace(full_match, new_img, 1)
            
            print(f"    📷 {icon_type}: {url[:50]}... → GitHub")
            self.stats['replacements'] += 1
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    
    def process_js_file(self, filepath):
        """Verarbeitet JavaScript-Dateien für base64 und URL Ersetzungen"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Ersetze alle filepicker.io URLs in JavaScript
        filepicker_pattern = r'https://www\.filepicker\.io/api/file/[A-Za-z0-9]+'
        
        for match in re.finditer(filepicker_pattern, content):
            url = match.group(0)
            self.stats['filepicker_urls_found'].add(url)
            
            # Hole Kontext
            start = max(0, match.start() - 200)
            end = min(len(content), match.end() + 200)
            context = content[start:end]
            
            icon_type = self.identify_icon_type(context, url)
            new_url = GITHUB_URLS[icon_type]
            
            content = content.replace(url, new_url)
            print(f"    🔧 JS: {icon_type} URL ersetzt")
            self.stats['replacements'] += 1
        
        # 2. Ersetze base64-kodierte Bilder (für aktives Mikrofon)
        # WICHTIG: Base64 Strings können SEHR lang sein (10000+ Zeichen)
        # Wir suchen nach dem Anfang und Ende separat
        
        # Pattern für base64 Bilder - erfasst ALLES zwischen den Quotes
        # Das [^"]+ bedeutet: alle Zeichen außer ", beliebig viele
        base64_pattern = r'"data:image/[^;]+;base64,[^"]+"'
        
        # Zusätzlich ohne Anführungszeichen für direkte Zuweisungen
        base64_pattern_no_quotes = r'data:image/[^;]+;base64,[A-Za-z0-9+/=]+'
        
        # Ersetze mit Anführungszeichen
        matches_found = 0
        for match in re.finditer(base64_pattern, content, re.DOTALL):
            base64_str = match.group(0)
            # Zeige Länge des gefundenen Strings zur Kontrolle
            print(f"    🔧 JS: base64 gefunden ({len(base64_str)} Zeichen)")
            
            # Ersetze mit GitHub URL für aktives Mikrofon
            new_url = f'"{GITHUB_URLS["mic_active"]}"'
            content = content.replace(base64_str, new_url, 1)
            print(f"    ✓ JS: base64 Mikrofon-aktiv ersetzt (war {len(base64_str)} Zeichen lang)")
            self.stats['base64_found'] += 1
            self.stats['replacements'] += 1
            matches_found += 1
        
        # Auch ohne Quotes ersetzen (falls irgendwo direkt zugewiesen)
        for match in re.finditer(base64_pattern_no_quotes, content):
            if not match.group(0).startswith('"'):  # Nur wenn nicht schon oben ersetzt
                base64_str = match.group(0)
                new_url = GITHUB_URLS["mic_active"]
                content = content.replace(base64_str, new_url, 1)
                print(f"    ✓ JS: base64 ohne Quotes ersetzt ({len(base64_str)} Zeichen)")
                self.stats['base64_found'] += 1
                self.stats['replacements'] += 1
                matches_found += 1
        
        # 3. Spezialfall: Auch 'data:image... ohne Anführungszeichen
        base64_pattern2 = r'audio_img\.src\s*=\s*"data:image[^"]*"'
        for match in re.finditer(base64_pattern2, content):
            old_assignment = match.group(0)
            new_assignment = f'audio_img.src = "{GITHUB_URLS["mic_active"]}"'
            content = content.replace(old_assignment, new_assignment)
            print(f"    🔧 JS: audio_img.src base64 ersetzt")
            self.stats['replacements'] += 1
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    
    def find_and_process_files(self):
        """Findet und verarbeitet alle relevanten Dateien"""
        # Durchsuche A1, A2, B1, B2 und tts Ordner
        folders_to_search = ['A1', 'A2', 'B1', 'B2', 'tts']
        
        for folder in folders_to_search:
            folder_path = self.root_dir / folder
            if not folder_path.exists():
                print(f"⚠️  Ordner {folder} nicht gefunden, überspringe...")
                continue
            
            print(f"\n📂 Durchsuche {folder}/...")
            
            # Finde alle HTML und JS Dateien
            for filepath in folder_path.rglob('*.html'):
                print(f"  📄 {filepath.relative_to(self.root_dir)}")
                if self.process_html_file(filepath):
                    self.stats['html_files'] += 1
                self.stats['files_processed'] += 1
            
            for filepath in folder_path.rglob('*.js'):
                print(f"  📜 {filepath.relative_to(self.root_dir)}")
                if self.process_js_file(filepath):
                    self.stats['js_files'] += 1
                self.stats['files_processed'] += 1
    
    def print_summary(self):
        """Zeigt Zusammenfassung der Änderungen"""
        print("\n" + "="*60)
        print("📊 ZUSAMMENFASSUNG")
        print("="*60)
        print(f"✓ Dateien durchsucht: {self.stats['files_processed']}")
        print(f"✓ HTML-Dateien geändert: {self.stats['html_files']}")
        print(f"✓ JS-Dateien geändert: {self.stats['js_files']}")
        print(f"✓ Ersetzungen gesamt: {self.stats['replacements']}")
        print(f"✓ Verschiedene filepicker URLs gefunden: {len(self.stats['filepicker_urls_found'])}")
        print(f"✓ Base64-Bilder ersetzt: {self.stats['base64_found']}")
        
        if self.stats['filepicker_urls_found']:
            print("\n📋 Gefundene filepicker.io URLs:")
            for url in sorted(self.stats['filepicker_urls_found']):
                print(f"   - {url}")
    
    def run(self, create_backup=True):
        """Hauptmethode zum Ausführen aller Ersetzungen"""
        print("🚀 Starte Icon-Replacer für Preaching Tool")
        print("="*60)
        
        # Backup erstellen
        if create_backup:
            backup_dir = self.create_backup()
            print(f"✓ Backup erstellt in: {backup_dir}")
        
        # Dateien verarbeiten
        self.find_and_process_files()
        
        # Zusammenfassung
        self.print_summary()
        
        print("\n✅ FERTIG! Alle Icons sollten jetzt funktionieren.")
        print("\n📝 Nächste Schritte:")
        print("1. Teste eine Datei im Browser (z.B. A1/1/index.html)")
        print("2. Wenn alles funktioniert:")
        print("   git add -A")
        print("   git commit -m 'Fix all broken icons'")
        print("   git push")

if __name__ == "__main__":
    # Prüfe ob wir im richtigen Verzeichnis sind
    if not any(Path(folder).exists() for folder in ['A1', 'A2', 'B1', 'B2']):
        print("❌ FEHLER: Bitte führe das Script im Hauptverzeichnis")
        print("   des preachingtool Repositories aus!")
        print("   (Dort wo die Ordner A1, A2, B1, B2 sind)")
        exit(1)
    
    replacer = IconReplacer()
    replacer.run(create_backup=True)