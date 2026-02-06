![Better Campus Portal](/icon/icon-wide.png)

# 🎓 BetterInfiniteCampus

**Make your Infinite Campus portal better with dark mode, GPA tools, and enhanced UI**

Personal fork of [BetterCanvas](https://github.com/ksucpea/bettercanvas) adapted for Infinite Campus portals. Specifically optimized for Forsyth County GA, but works with any Infinite Campus installation.

## ✨ Key Features

- 🌙 **Dark Mode** - Easy on the eyes with customizable colors
- 📊 **GPA Calculator** - Track weighted & unweighted GPA
- 📝 **Grade Tracking** - Quick view of all your grades
- 🎨 **Custom Themes** - Personalize your portal
- ⚡ **Fast & Lightweight** - No slowdowns

---

## 📍 Quick Navigation

**New here?** Start with [`WHERE_IS_EVERYTHING.md`](WHERE_IS_EVERYTHING.md) - shows where all code is located

**Want to install?** See [`INSTALLATION.md`](INSTALLATION.md) for step-by-step instructions

**Quick start?** Check [`QUICKSTART.md`](QUICKSTART.md) for the 3-minute setup

---

## Original BetterCanvas README

# Better Canvas

Enhancements to Canvas like dark mode, better todo list, GPA calculator, and more!

### Supported on

![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)

![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)

## Inquiries

To contact me, please email ksucpea@gmail.com, or you can open an issue within the "Issues" tab on GitHub.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Version Notes](#version-notes)
- [Color Reference](#color-reference)
- [Contributing](#contributing)
- [Authors](#authors)

## Features

Better Canvas introduces improvements to the Canvas user interface:

- Fully customizable dark mode (choose from premade options or manually edit dark mode)
- Automatic scheduling for dark mode
- Dashboard card color palletes
- Themes created by users
- Assignments due list
- Dashboard notes
- Better todo list
- Custom fonts
- Condensed cards
- Dashboard grades
- Remove sidebar logo
- Customizable card links
- Gradient dashboard cards
- Advanced card customization
- GPA calculator (college and highschool)
- Browser wide popup assignment reminder
- Preview assignments and announcements from the dashboard

## Installation

To install, run, and build with this repository,

- Clone the repository locally with

```bash
  git clone https://github.com/ksucpea/bettercanvas.git
```

- Visit `chrome://extensions` in your browser.
- Enable developer mode by toggling the switch in the upper right corner of the viewport.
- Click the "Load upacked" button in the header.
- When prompted to open a file, select the root directory of this repository.

## Usage

To use Better Canvas, select your browser below to install the extension.

[Chrome](https://chrome.google.com/webstore/detail/better-canvas/cndibmoanboadcifjkjbdpjgfedanolh)

[Firefox](https://addons.mozilla.org/addon/better-canvas/)

### How to use

- Once the extension is installed, navigate to your institution's Canvas homepage.
- To edit the available options, click on the "Extensions" button in the upper right corner of the viewport.
- When the menu opens, click on the Better Canvas extension.
  - A menu will appear with configuration options for your Canvas homepage.

## Version Notes

#### Update 5.10

- Fixed dark mode bug in discussion text boxes
- Added new themes + fonts
- Card colors now change instantly
- Dark mode fixer feature
- Card customization now shows preview of image
- New sidebar options
- Dark mode buttons preview their appearance
- "Remove sidebar logo" feature
- "Hide recent feedback" feature
- Menu redesign
- Fixed card assignment bug
- Card assignment efficiency improvements
- Dark mode rework
- Dark mode now syncs
- Option to use device dark mode settings
- Improved todo list
- "Color coded tab icons" feature
- "Use card colors" option for todo list

## Color Reference

| Color      | Hex                                                              |
| ---------- | ---------------------------------------------------------------- |
| Background | ![#161616](https://via.placeholder.com/10/0a192f?text=+) #161616 |
| Text       | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Accent 01  | ![#ff002e](https://via.placeholder.com/10/ff002e?text=+) #ff002e |
| Accent 02  | ![#ff5200](https://via.placeholder.com/10/ff5200?text=+) #ff5200 |
| Accent 03  | ![#ff47ad](https://via.placeholder.com/10/ff47ad?text=+) #ff47ad |

## Contributing

### Add a new feature

To add a new feature, please follow these guidelines.

Note: I will probably make this automated in the future but it's a bit of work right now.

#### Identifier

- Should be a unqiue one/two word storage identifier to indicate its status. (ie "dark_mode" or "dashboard_grades")
- If it has sub options (options that are specific to the main feature) these will also each need a unique identifier.
- All options are synced and have a 8kb storage limit, so if your feature needs more than this please contact me.

#### Changes to html/popup.html

- Add the appropriate HTML into this file. The corresponding id and name (see below) should be the identifier.
- If it has no sub options, it should be put in the same container as the other options with no sub options:

```
<div class="option" id="<identifier>">
    <input type="radio" id="off" name="<identifier>">
    <input type="radio" id="on" name="<identifier>">
    <div class="slider">
        <div class="sliderknob"></div>
        <div class="sliderbg"></div>
    </div>
    <span class="option-name"><option name></span>
</div>
```

- If it does have sub options it becomes it's own container:

```
<div class="option-container">
  <div class="option" id="<identifier>">
    <input type="radio" id="off" name="<identifier>">
    <input type="radio" id="on" name="<identifier>">
    <div class="slider">
      <div class="sliderknob"></div>
      <div class="sliderbg"></div>
    </div>
    <span class="option-name"><option name></span>
  </div>
  <div class="sub-options">
    <div class="sub-option">
      <input type="checkbox" id="<sub identifier>" name="<sub identifier>">
      <label for="<sub identifier>" class="sub-text"><option name></label>
    </div>
  </div>
</div>
```

#### Changes to js/popup.js

- Add the main identifier into the `syncedSwitches` array.
- If you have sub-options:
  - Add these identifiers to the array found under the comment that says `//checkboxes`.

#### Changes to js/background.js

- Add all identifiers into the `syncedOptions` array.
- Add a default value for your option to the `default_options` array.
  - Preferably this value should be `false` for booleans or ` ""` for strings (`null` can also be used if Canvas has a default for this option already)

#### Changes to js/content.js

- There should be a function(s) included in the this file that does the work. The name should clearly indicate it's purpose.
- Under `applyOptionsChanges()`, add a switch case to call this function when the menu toggle is changed.
- Depending on what your feature does, it needs to be told when to fire.
  - If the function changes any aspect of the dashboard, it should be put inside `checkDashboardReady()`.
  - If the function only adds css, it should be added to `applyAestheticChanges()`, and in this case should not be a separate function, instead add the css to the existing styles found in this function.
  - Anything else should be put under `startExtension()` and should be placed no higher than the `checkDashboardReady` function found here.

### Add a new theme

To add a new theme, please follow these guidelines.

You can export a theme using the export tool in the menu and sending an email to me, or you can merge it here after doing the following:

#### Exporting

- Go to the Themes tab and export dark mode, card images, card colors, and custom font. - The only on/off toggles that need be included are `disable_color_overlay` and `gradient_cards`.
  Any other toggles aren't necessary, so you should manually add these keys and the appropriate values in with the export code.
- Pick a unique id for the theme, doesn't matter how long this is.

#### Changes to js/popup.js

- Add the export code under `getTheme()`.
  - Make sure it follows this format: `"theme-<id>: { "exports": {"..."}, "preview": "..." }`
- For the preivew, try to pick the smallest image size from the card images (under ~50kb is perfect), or you can find a smaller display image that isn't included in the card images.

#### Changes to html/popup.html

- Add the following under all the other theme buttons:

```
<button id="theme-<id>" class="theme-button customization-button"><theme name> by <you></button>
```

- The theme name should be one/two words so it doesn't take up too much space.

## File structure

```
.
├── README.md
├── \_locales
│ ├── en
│ │ └── messages.json
│ └── es
│ └── messages.json
├── css
│ ├── content.css
│ ├── options.css
│ └── popup.css
├── html
│ ├── options.html
│ └── popup.html
├── icon
│ ├── icon-128.png
│ ├── icon-16.png
│ ├── icon-19.png
│ ├── icon-32.png
│ ├── icon-38.png
│ ├── icon-48.png
│ ├── icon-wide.png
│ ├── iconwpadding.png
│ └── oldicon-128.png
├── js
│ ├── background.js
│ ├── content.js
│ └── popup.js
└── manifest.json
```

### Update the file structure

#### Use the tree command

- Linux/Unix
  - Install [tree command line tool](https://www.geeksforgeeks.org/tree-command-unixlinux/)
  - Use the tree command to generate file structure:
  ```
  tree
  ```

Learn more about tree commands for Linux/Unix [here](https://www.geeksforgeeks.org/tree-command-unixlinux/).

- Windows
  - Use the tree command to generate file structure:
  ```
  tree /
  ```

Learn more about tree commands for Windows [here](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tree).

## Authors

#### Owner

- [ksucpea](https://github.com/ksucpea)

#### Contributors

- [fudgeu](https://github.com/fudgeu)
- [Tibo Geeraerts](https://github.com/tibogeeraerts)
- [Jacob Mungle](https://github.com/Jelgnum)
- [FireIsGood](https://github.com/FireIsGood)

## License

This software is licensed under the GNU Affero General Public License v3.0 (AGPL), with the following additional restrictions:

Commercial use is prohibited. You may not use this software, or any modified version of it, in any product or service that is sold, monetized, or used in connection with a commercial or for-profit activity.

No public redistribution. You may not publicly re-upload, fork, or distribute the software (or modified versions) on any platform, repository, or hosting service (e.g., GitHub, npm, Chrome Web Store) without express written permission.

Competing services prohibited. You may not use this software, modified or unmodified, to create or offer a public or private alternative to BetterCanvas — even if the service is offered for free.

![Better Canvas](/icon/icon-48.png)
