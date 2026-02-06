# 🚀 Quick Start Guide - BetterInfiniteCampus

## What This Extension Does

This personal Chrome extension adds a **dark mode theme** to your Infinite Campus student portal (Forsyth County GA), making it easier on your eyes during late-night study sessions!

**Based on**: BetterCanvas by ksucpea  
**Adapted for**: Infinite Campus (Forsyth County Schools)  
**For**: Personal use only

---

## Installation (3 Simple Steps)

### 1️⃣ Download This Repository

Click the green **"Code"** button on GitHub → **"Download ZIP"**  
Extract the ZIP file to a folder (remember where you save it!)

### 2️⃣ Load in Chrome

1. Open Chrome and go to: `chrome://extensions/`
2. Turn ON **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"** (button in top-left)
4. Select the folder where you extracted the files
5. Done! The extension is now installed ✓

### 3️⃣ Test It

**Option A - Test with demo page:**
- Open the `test_infinitecampus.html` file in Chrome
- You'll see a simulated Infinite Campus page
- The dark theme applies automatically!

**Option B - Use on real portal:**
- Go to your Infinite Campus login: `campus.forsyth.k12.ga.us`
- Log in as normal
- Dark mode activates automatically!

---

## What You'll See

### Before (Default Light Theme)
![Before](https://github.com/user-attachments/assets/cb9e5e53-a0cf-4d7f-b5a4-d1943fa8fdbf)

### After (Dark Theme Applied)
![After](https://github.com/user-attachments/assets/ec25b2af-1310-4feb-9aa4-bd8448e9dd7f)

---

## Features Included

✅ **Dark Background** - Easy on the eyes (#161616)  
✅ **Dark Tables** - Grades and schedules with dark theme  
✅ **Light Text** - High contrast for readability  
✅ **Themed Links** - Cyan/blue links that stand out  
✅ **Works Everywhere** - Applies to all Infinite Campus pages  
✅ **Auto-Apply** - No need to toggle on/off  

---

## Troubleshooting

**Extension not loading?**
- Make sure you selected the right folder (the one with `manifest.json` in it)
- Check for error messages in chrome://extensions/

**Dark mode not showing?**
- Verify you're on the Infinite Campus domain
- Try refreshing the page (Ctrl+R or Cmd+R)
- Check that the extension is enabled

**Want to customize colors?**
- Edit `css/content.css` 
- Look for the dark mode section at the top
- Change hex colors to your preference

---

## File Structure

```
bettercanvas/
├── manifest.json          ← Extension config
├── css/
│   └── content.css        ← Dark mode styles (customize here!)
├── js/
│   ├── content.js         ← Main extension logic
│   ├── background.js      ← Background processes
│   └── popup.js           ← Settings popup
├── html/
│   ├── popup.html         ← Settings interface
│   └── options.html       ← Advanced options
├── icon/                  ← Extension icons
└── test_infinitecampus.html  ← Test page
```

---

## Next Steps

1. **Test on the demo page** (`test_infinitecampus.html`)
2. **Try on real Infinite Campus** after logging in
3. **Customize colors** if you want different shades
4. **Report issues** if something doesn't look right

---

## Credits

Original **BetterCanvas** by [ksucpea](https://github.com/ksucpea/bettercanvas)  
Adapted for Infinite Campus personal use

**License Note**: This is a personal fork. Not for public distribution or commercial use.
