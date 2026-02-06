# 📥 How to Download and Test This Extension

## For You (The User)

This extension is **ready to download and test right now!** Here's exactly what to do:

---

## Step 1: Download from GitHub

### Option A: Download ZIP (Easiest)
1. Go to: https://github.com/SystemInfomation/bettercanvas
2. Click the branch dropdown (says "main" or current branch)
3. Select: **`copilot/create-betterinfinitecampus-fork`**
4. Click the green **"Code"** button
5. Click **"Download ZIP"**
6. Save it somewhere you'll remember (like Downloads folder)
7. **Extract the ZIP file** (right-click → Extract All)

### Option B: Git Clone (If you have Git)
```bash
git clone https://github.com/SystemInfomation/bettercanvas.git
cd bettercanvas
git checkout copilot/create-betterinfinitecampus-fork
```

---

## Step 2: Install in Chrome

1. Open **Google Chrome**
2. Go to: `chrome://extensions/`
3. Turn ON **"Developer mode"** (toggle switch in top-right)
4. Click **"Load unpacked"** (button in top-left corner)
5. Browse to the folder where you extracted/cloned
6. Select the **`bettercanvas`** folder (the one containing `manifest.json`)
7. Click **"Select Folder"**

You should now see **"BetterInfiniteCampus"** in your extensions list! 🎉

---

## Step 3: Test It Works

### Quick Test (No Login Required)

1. In the extracted folder, find `test_infinitecampus.html`
2. **Right-click** on it → **Open with Google Chrome**
3. You should see a dark-themed Infinite Campus page!

**What to look for:**
- ✅ Dark background (not white)
- ✅ Light colored text
- ✅ Blue/cyan links
- ✅ Dark tables

**If it's still light colored:**
- The extension only works on `campus.forsyth.k12.ga.us` or `infinitecampus.org` domains
- For the local test file, you need to temporarily allow file:// URLs:
  1. Go to `chrome://extensions/`
  2. Find "BetterInfiniteCampus"
  3. Click "Details"
  4. Scroll down and enable "Allow access to file URLs"
  5. Refresh the test page

### Real Test (Requires Login)

1. Go to your Infinite Campus portal: **`campus.forsyth.k12.ga.us`**
2. Log in with your student credentials
3. The dark theme should apply automatically!

**Note:** It might take a second to load. Try refreshing if needed.

---

## Step 4: Verify Extension is Active

### Check in Chrome Toolbar
- Look for the **puzzle piece icon** (🧩) in Chrome toolbar
- Click it to see all extensions
- **Pin** the BetterInfiniteCampus extension for easy access
- Click the extension icon to open settings popup

### Check Extension is Enabled
- Go to `chrome://extensions/`
- Find **BetterInfiniteCampus**
- Make sure the toggle is **ON** (blue)
- Should say "Manifest V3"

---

## Customize It (Optional)

Want different colors? You can customize!

1. Open the extension folder
2. Edit: `css/content.css`
3. Find the section at the top that says "BetterInfiniteCampus Dark Mode"
4. Change the hex color codes:
   - Background: `#161616` (currently dark charcoal)
   - Text: `#f5f5f5` (currently off-white)
   - Links: `#56Caf0` (currently cyan)
   - etc.
5. Save the file
6. Go to `chrome://extensions/`
7. Click the **refresh icon** (🔄) on BetterInfiniteCampus
8. Reload your IC page to see changes

---

## Troubleshooting

### "Extension failed to load"
- Make sure you selected the right folder (must contain `manifest.json`)
- Check the error message in red - it will tell you what's wrong

### "Dark mode not showing"
- Check you're on the right domain (`campus.forsyth.k12.ga.us` or `.infinitecampus.org`)
- Make sure extension is enabled in `chrome://extensions/`
- Try refreshing the page (F5)
- Check browser console (F12) for errors

### "Can't find the extension icon"
- Click the puzzle piece 🧩 in Chrome toolbar
- Look for "BetterInfiniteCampus"
- Click the pin icon to pin it to toolbar

### "Test page is still light colored"
- Enable "Allow access to file URLs" in extension settings
- OR upload the test page to a web server
- OR just test on the real IC portal instead

---

## What's Included

When you download, you'll get:

- ✅ `manifest.json` - Extension configuration
- ✅ `css/content.css` - Dark mode styles
- ✅ `js/*.js` - Extension logic
- ✅ `html/*.html` - Settings interface
- ✅ `icon/*.png` - Extension icons
- ✅ `test_infinitecampus.html` - Test page
- ✅ `INSTALLATION.md` - Detailed guide
- ✅ `QUICKSTART.md` - Quick reference
- ✅ `CHANGES.md` - What was changed
- ✅ `README.md` - Project info

---

## Need Help?

- Check `INSTALLATION.md` for detailed troubleshooting
- Check `QUICKSTART.md` for quick reference
- Check `CHANGES.md` to see what was modified

---

## Summary

1. **Download** the ZIP from GitHub (branch: `copilot/create-betterinfinitecampus-fork`)
2. **Extract** it to a folder
3. **Load** in Chrome (`chrome://extensions/` → Load unpacked)
4. **Test** with `test_infinitecampus.html` or real IC portal
5. **Enjoy** dark mode! 🌙

The extension is **100% ready to use** - no build steps, no dependencies, just download and load!
