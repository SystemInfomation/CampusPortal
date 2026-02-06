# BetterInfiniteCampus - Installation & Testing Guide

## How to Install and Test as a Chrome Extension

### Step 1: Download the Extension Files

You can download this extension in one of two ways:

**Option A: Clone the repository**
```bash
git clone https://github.com/SystemInfomation/bettercanvas.git
cd bettercanvas
git checkout copilot/create-betterinfinitecampus-fork
```

**Option B: Download as ZIP**
1. Go to the GitHub repository
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a folder on your computer

### Step 2: Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click "Load unpacked" button in the top-left
5. Browse to the folder containing the extension files (the folder with `manifest.json`)
6. Click "Select Folder"

The extension should now be loaded and visible in your extensions list!

### Step 3: Test the Extension

#### Option A: Test with the Included Test Page

1. Open the `test_infinitecampus.html` file in Chrome:
   - Right-click the file and choose "Open with Google Chrome"
   - OR drag the file into a Chrome window
   - OR use File > Open in Chrome

2. **IMPORTANT**: The test page won't trigger the extension by default because it's a local file

3. To test with the local file, temporarily modify the manifest:
   - Open `manifest.json`
   - Add `"file:///*"` to the matches array in content_scripts
   - Reload the extension in `chrome://extensions/`
   - Refresh the test page

4. You should see:
   - Dark background (#161616)
   - Dark tables with light text
   - Blue hyperlinks
   - Dark themed forms and inputs

#### Option B: Test on Real Infinite Campus

1. Navigate to your Infinite Campus portal:
   - `https://campus.forsyth.k12.ga.us/campus/portal/...`
   - OR any other Infinite Campus portal

2. The extension will automatically inject the dark mode styles

3. Click the extension icon (puzzle piece in Chrome toolbar) to access settings

### Step 4: Verify Extension is Working

Check for these indicators:

✅ **Extension appears in chrome://extensions/**
- Name: "BetterInfiniteCampus"
- Status: Enabled (toggle should be blue/on)

✅ **Extension icon is visible**
- Click the puzzle piece icon in Chrome toolbar
- Pin the BetterInfiniteCampus extension for easy access

✅ **Dark mode is applied**
- Background should be dark (#161616)
- Text should be light (#f5f5f5)
- Tables should have dark background

✅ **Popup menu opens**
- Click the extension icon
- Settings popup should appear

### Troubleshooting

**Problem: Extension won't load**
- Make sure you selected the correct folder (the one containing `manifest.json`)
- Check for errors in chrome://extensions/ (red error messages)
- Make sure all required files are present (js/, css/, html/, icon/ folders)

**Problem: Dark mode not applying**
- Check that you're on a matching URL (campus.forsyth.k12.ga.us or infinitecampus.org)
- Open DevTools (F12) and check the Console for errors
- Verify the extension is enabled in chrome://extensions/

**Problem: Extension icon not showing**
- Click the puzzle piece icon in Chrome toolbar
- Pin the extension by clicking the pin icon next to "BetterInfiniteCampus"

**Problem: Local test file doesn't work**
- Add `"file:///*"` to matches in manifest.json (only for testing!)
- Remove it before using on real sites for security

### Testing the Test Page

The `test_infinitecampus.html` file includes:
- Realistic grade tables
- Schedule tables
- Attendance grid
- Announcements section
- Various Infinite Campus-like elements

Before dark mode:
- White background
- Dark blue headers
- Light gray alternating rows

After dark mode (with extension):
- Dark background
- Light text
- Dark tables with borders
- Themed inputs

### Next Steps

Once you confirm the extension is working:

1. **Test on real Infinite Campus portal**
2. **Adjust dark mode colors** in css/content.css if needed
3. **Enable/disable features** in the popup menu
4. **Report any issues** or elements that need additional styling

### Files You Can Customize

- `css/content.css` - Add more dark mode rules for specific Infinite Campus elements
- `manifest.json` - Add more URL patterns if needed
- `js/content.js` - Modify behavior and features
- `html/popup.html` - Customize the settings interface

### Security Note

This is a personal extension for local use. Never:
- Share your Infinite Campus credentials
- Install extensions from untrusted sources
- Load extensions with excessive permissions

---

**Original BetterCanvas by ksucpea**  
**Adapted for personal Infinite Campus use**
