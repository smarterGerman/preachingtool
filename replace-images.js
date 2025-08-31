const fs = require('fs');
const path = require('path');

// The old base64 image string (truncated for readability, but using full string)
const OLD_IMAGE = 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png';

// The new GitHub raw URL
const NEW_IMAGE = 'https://raw.githubusercontent.com/smarterGerman/preachingtool/main/icons/preaching-tool-microphone-button-active-symbol.png';

// Function to recursively find and replace in files
function replaceInFiles(dir, extensions = ['.html', '.js', '.jsx', '.ts', '.tsx', '.css']) {
    let filesProcessed = 0;
    let replacementsMade = 0;

    function walkDir(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        files.forEach(file => {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
                // Recursively walk subdirectories
                walkDir(filePath);
            } else if (stat.isFile()) {
                // Check if file has an allowed extension
                const ext = path.extname(file).toLowerCase();
                if (extensions.includes(ext)) {
                    try {
                        let content = fs.readFileSync(filePath, 'utf8');
                        
                        // Count replacements in this file
                        const matches = (content.match(new RegExp(OLD_IMAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
                        
                        if (matches > 0) {
                            // Replace all occurrences
                            content = content.split(OLD_IMAGE).join(NEW_IMAGE);
                            
                            // Write the file back
                            fs.writeFileSync(filePath, content, 'utf8');
                            
                            filesProcessed++;
                            replacementsMade += matches;
                            console.log(`✓ Processed ${filePath} - ${matches} replacement(s)`);
                        }
                    } catch (err) {
                        console.error(`Error processing ${filePath}:`, err.message);
                    }
                }
            }
        });
    }
    
    walkDir(dir);
    
    console.log('\n=== Summary ===');
    console.log(`Files processed: ${filesProcessed}`);
    console.log(`Total replacements made: ${replacementsMade}`);
}

// Run the replacement starting from current directory
// You can change '.' to a specific path if needed
replaceInFiles('.');

console.log('Replacement complete!');