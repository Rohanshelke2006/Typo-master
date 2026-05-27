# Typo-Master | Typing Speed Test

A sleek, dark-themed typing speed test application to measure your WPM (Words Per Minute) and accuracy.

## Features

- ⚡ **60-second typing test** - Challenge yourself with timed tests
- 📊 **Real-time stats** - Track WPM and accuracy as you type
- 🎨 **Dark theme** - Easy on the eyes with a modern interface
- 🎯 **Visual feedback** - Color-coded correct/wrong words
- 📱 **Responsive design** - Works on desktop and mobile

## How to Use

1. Open `index.html` in your web browser
2. Click in the text input field and start typing
3. The timer automatically starts when you begin typing
4. Complete as many words as you can in 60 seconds
5. Your WPM and accuracy are calculated automatically
6. Click the reset button (⟳) to start a new test

## Files

- **index.html** - Main HTML structure
- **style.css** - Styling and theme
- **script.js** - Game logic and timer

## Deploy on GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository: `typo-master` (or any name)
3. Choose "Public" for GitHub Pages to work
4. Click "Create repository"

### Step 2: Upload Files

**Option A: Using Git (Recommended)**

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/typo-master.git
cd typo-master

# Copy the three files (index.html, style.css, script.js) into this folder

# Stage files for commit
git add .

# Commit your changes
git commit -m "Add Typo-Master typing test application"

# Push to GitHub
git push origin main
```

**Option B: Using GitHub Web Interface**

1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop or select `index.html`, `style.css`, and `script.js`
4. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Under "Branch", select `main` (or `master`)
4. Click "Save"

Your site will be live at: **`https://YOUR_USERNAME.github.io/typo-master`**

## What Was Fixed

❌ **Before:** Hardcoded local Windows paths
```html
<link rel="stylesheet" href="D:\Html\Typo-Master(Typing test Software)\style.css">
<script src="D:\Html\Typo-Master(Typing test Software)\script.js"></script>
```

✅ **After:** Relative paths (works everywhere)
```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

This ensures your files work:
- ✓ Locally on your computer
- ✓ On GitHub Pages
- ✓ On any web server
- ✓ In any folder structure

## Performance Tips

- All files are static (no backend needed)
- Fast loading and smooth performance
- Optimized CSS with CSS variables for theming

## License

Feel free to use, modify, and share!

---

**Enjoy improving your typing speed!** 🚀
