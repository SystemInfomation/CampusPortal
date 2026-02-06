# 📍 WHERE IS EVERYTHING

Quick reference guide for finding stuff in this extension.

---

## 🎨 WANT TO CHANGE COLORS?

**Dark Mode Colors:** `css/content.css` (lines 1-55)
- Background: `#161616`
- Tables: `#1e1e1e`
- Text: `#f5f5f5`
- Links: `#56Caf0`

**Popup Colors:** `css/popup.css`

---

## 🔧 WANT TO ADD A FEATURE?

Need to edit 4 files:

1. **js/background.js** - Add default setting
2. **html/popup.html** - Add toggle button
3. **js/popup.js** - Register the setting
4. **js/content.js** - Write the feature code

---

## 📂 FILE GUIDE

```
WHAT IT DOES                           WHERE IT IS
────────────────────────────────────────────────────────
Extension settings                  →  manifest.json
Main extension logic               →  js/content.js (2227 lines - BIG!)
Settings interface                 →  js/popup.js (2177 lines - ALSO BIG!)
Background worker                  →  js/background.js (129 lines - small)
Dark mode styles                   →  css/content.css
Popup window design                →  html/popup.html
Popup styling                      →  css/popup.css
Icons                              →  icon/ folder
Test page                          →  test_infinitecampus.html
```

---

## 🎯 COMMON TASKS

### Change dark mode background color
**File:** `css/content.css`  
**Line:** 9  
```css
background-color: #161616 !important;
```

### Add new feature toggle
**Step 1:** `js/background.js` - add `"my_feature": false`  
**Step 2:** `html/popup.html` - copy existing toggle, change id to `"my_feature"`  
**Step 3:** `js/popup.js` - add `"my_feature"` to `syncedSwitches` array  
**Step 4:** `js/content.js` - create function and add case to `applyOptionsChanges()`

### Test changes
1. Edit files
2. Go to `chrome://extensions/`
3. Click reload button on extension
4. Refresh Infinite Campus page

---

## ⚠️ KNOWN PROBLEMS

**Canvas API Calls Don't Work on IC**
- `js/content.js` has lots of `getData('/api/v1/...')` calls
- These are Canvas APIs that don't exist on Infinite Campus
- Features using these won't work until we replace with IC data

**Files Are HUGE**
- `js/content.js` is 2227 lines
- `js/popup.js` is 2177 lines
- Should split into smaller modules

---

## 🔍 FIND SPECIFIC CODE

| Looking for... | Search for... | File |
|---------------|---------------|------|
| Dark mode | `applyDarkMode` | js/content.js |
| GPA calculator | `calculateGPA` | js/content.js |
| Grade display | `insertDashboardGrades` | js/content.js |
| Assignments | `insertDueAssignments` | js/content.js |
| Settings storage | `chrome.storage.sync` | js/popup.js |
| Default settings | `default_options` | js/background.js |

---

## 📁 FOLDER STRUCTURE

```
CampusPortal/
├── manifest.json          Extension config
├── js/
│   ├── content.js         Main logic (NEEDS SPLITTING)
│   ├── popup.js           Settings UI (NEEDS SPLITTING)
│   └── background.js      Background tasks
├── css/
│   ├── content.css        Page styling
│   ├── popup.css          Popup styling
│   └── options.css        Options page styling
├── html/
│   ├── popup.html         Popup interface
│   └── options.html       Options page
├── icon/                  Extension icons
├── _locales/              Translations (en, es)
└── test_infinitecampus.html   Test page
```

---

## 🚀 NEXT STEPS TO IMPROVE

1. **Split js/content.js** into modules:
   - `js/modules/darkmode.js`
   - `js/modules/gpa.js`
   - `js/modules/assignments.js`

2. **Remove Canvas API calls** and replace with IC data extraction

3. **Update selectors** to match actual IC portal HTML

4. **Add error handling** so features fail gracefully

5. **Clean up** commented-out code and console.logs

---

*Last updated: 2026-02-06*
