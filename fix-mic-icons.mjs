#!/usr/bin/env node
// fix-mic-icons.mjs
// Usage:
//   node fix-mic-icons.mjs                # dry run (no changes), writes fix-report.json
//   node fix-mic-icons.mjs --apply        # applies changes + backups
//   node fix-mic-icons.mjs --aggressive   # dry run, replace any base64 PNG (not just "mic"-context)
//   node fix-mic-icons.mjs --apply --aggressive
//
// What it does:
// - Scans *.js, *.ts, *.jsx, *.tsx, *.html for long base64 PNGs
// - Replaces them with the provided RAW GitHub icon URL
// - Conservative by default: only lines that look like microphone-related code
// - Writes fix-report.json so you can review changes before applying
//
// Safety:
// - Dry run by default (NO changes)
// - When --apply is used, creates backup copies in ./backup_pre_fix/
//
// Requirements: Node 18+

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RAW_ICON_URL = 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png';

// CLI flags
const APPLY = process.argv.includes('--apply');
const AGGRESSIVE = process.argv.includes('--aggressive');

// Root to scan (current directory)
const ROOT = process.cwd();

// File globs to include
const EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx', '.html']);

// Heuristics: words that indicate mic-related context
const MIC_HINTS = ['mic', 'microphone', 'audio_img', 'button', 'icon'];

// Base64 PNG matcher (very long)
const BASE64_PNG_RE = /data:image\/png;base64,[A-Za-z0-9+/=]{1000,}/g;

// Utility to walk the repo
async function* walk(dir) {
  for (const entry of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip common large/vendor dirs
      const lower = entry.name.toLowerCase();
      if (['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage'].includes(lower)) continue;
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

// Check mic-related context (conservative)
function looksMicRelated(content, matchIndex) {
  // Look +/- 200 chars around the match
  const START = Math.max(0, matchIndex - 200);
  const END = Math.min(content.length, matchIndex + 200);
  const window = content.slice(START, END).toLowerCase();
  return MIC_HINTS.some(h => window.includes(h));
}

function ensureBackupDir() {
  const backupDir = path.join(ROOT, 'backup_pre_fix');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  return backupDir;
}

function backupFile(absPath, backupDir) {
  const rel = path.relative(ROOT, absPath);
  const dest = path.join(backupDir, rel);
  const destDir = path.dirname(dest);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(absPath, dest);
}

const report = {
  mode: APPLY ? (AGGRESSIVE ? 'apply-aggressive' : 'apply') : (AGGRESSIVE ? 'dry-run-aggressive' : 'dry-run'),
  root: ROOT,
  replacedInFiles: [],
  skipped: [],
  startTime: new Date().toISOString(),
};

(async () => {
  let filesScanned = 0;
  let filesModified = 0;
  let totalReplacements = 0;

  for await (const abs of walk(ROOT)) {
    const ext = path.extname(abs).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;

    filesScanned++;
    let content = await fs.promises.readFile(abs, 'utf8');
    let modified = false;
    const before = content;

    // Collect proposed changes (for report)
    const fileChanges = [];

    // Find all base64 occurrences
    let m;
    while ((m = BASE64_PNG_RE.exec(content)) !== null) {
      const idx = m.index;

      if (!AGGRESSIVE && !looksMicRelated(content, idx)) {
        // Skip if not mic-related in conservative mode
        report.skipped.push({ file: path.relative(ROOT, abs), reason: 'not-mic-related', index: idx });
        continue;
      }

      // Replace exactly this occurrence
      const found = m[0];
      content = content.slice(0, idx) + RAW_ICON_URL + content.slice(idx + found.length);

      modified = true;
      totalReplacements++;

      fileChanges.push({
        index: idx,
        beforeSnippet: found.slice(0, 60) + '...(' + found.length + ' chars)...',
        afterSnippet: RAW_ICON_URL,
      });

      // Adjust regex lastIndex after manual string surgery
      BASE64_PNG_RE.lastIndex = idx + RAW_ICON_URL.length;
    }

    if (modified) {
      filesModified++;
      report.replacedInFiles.push({
        file: path.relative(ROOT, abs),
        replacements: fileChanges.length,
        changes: fileChanges,
      });

      if (APPLY) {
        const backupDir = ensureBackupDir();
        backupFile(abs, backupDir);
        await fs.promises.writeFile(abs, content, 'utf8');
      }
    }
  }

  report.endTime = new Date().toISOString();
  report.stats = { filesScanned, filesModified, totalReplacements };

  // Write report
  const reportPath = path.join(ROOT, 'fix-report.json');
  await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`\n=== Mic Icon Fix Report (${report.mode}) ===`);
  console.log(`Scanned: ${filesScanned} file(s)`);
  console.log(`Would change: ${filesModified} file(s)`);
  console.log(`Total replacements: ${totalReplacements}`);
  console.log(`Report written to: ${reportPath}`);
  if (APPLY) {
    console.log(`Backups stored in ./backup_pre_fix/`);
  } else {
    console.log(`(Dry run) No files were modified.`);
    console.log(`Run again with --apply to perform the changes.`);
  }
})();