<div align="center">
<h1>Focusly: Active & Focused Tabs</h1>
<h2>
<a href="https://snyk.io/test/github/crisboarna/focusly">
  <img src="https://snyk.io/test/github/crisboarna/focusly/badge.svg?targetFile=package.json">
</a>
<a href="https://codecov.io/gh/crisboarna/focusly">
  <img src="https://img.shields.io/codecov/c/github/crisboarna/focusly.svg">
</a>
<a href="http://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/github/license/crisboarna/focusly">
</a>
<a href="https://github.com/semantic-release/semantic-release">
  <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)">
</a>
<a href="http://commitizen.github.io/cz-cli/">
  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)">
</a>
<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">
<a href="https://github.com/crisboarna/focusly">
  <img src="https://img.shields.io/github/stars/crisboarna/focusly.svg">
</a>
<a href="https://github.com/crisboarna/focusly">
  <img src="https://img.shields.io/github/issues/crisboarna/focusly.svg">
</a>
<a href="https://github.com/crisboarna">
  <img src="https://img.shields.io/badge/made%20by-crisboarna-blue.svg" >
</a>
<a href="https://github.com/crisboarna/focusly/pulls">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
</a>
<img src="./docs/images/intro.gif" width="100%">
</h2>
<div>
<a href="https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en">
  <img src="./docs/images/branding-chrome.png"/>
</a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/focusly-active-focused-tabs">
  <img src="./docs/images/branding-firefox.png" />
</a>
</div>
</div>

## Description

Focusly is a browser extension that keeps configured tabs focused/active even when they are not in the foreground.

This extension modifies the browser's reported behaviour to the websites you visit against tracking the activity state of the page. This prevents the website from only offering some features when you are actively on it.

Maximize your web experience with Focusly, a configurable and modern browser extension designed to revolutionize the way you multitask online. Engineered for professionals, developers, and multitaskers alike, Focusly offers unparalleled control over your browser's visibility and focus states, ensuring that every website behaves as if it’s always in the spotlight, even when it’s not.

### Key Features:
- Complete Event Control: Seamlessly manage a comprehensive list of browser events to maintain the illusion of focus. This includes but is not limited to:
  - visibilityState changes
  - document.hasFocus()
  - document.hidden
  - window.blur
  - window.focus
  - Page visibility changes
- Customizable Event Spoofing: With Focusly, you gain the power to configure event responses. This ensures that every website remains fully operational, believing it remains in focus, regardless of your actual activity.
- Intuitive Interface: Whether you’re a tech guru or just getting started, the user-friendly dashboard makes customization easy and efficient. Adjust settings in real-time with a few simple clicks.
- Enhanced Productivity: Keep your workflow uninterrupted by allowing background tabs to operate as if they’re in the foreground, perfect for keeping live feeds active, maintaining chat responsiveness, and ensuring continuous playback.
- Universal Compatibility: Designed to work flawlessly across all websites, Focusly ensures your browsing experience is never compromised, providing you the freedom to navigate the web on your terms.
- Privacy First: We believe in your right to privacy. Focusly operates entirely locally, with no data sent back to us. Your browsing habits and configurations stay yours alone.

### Why Focusly?

In today's fast-paced digital world, multitasking isn't just an option; it's a necessity. Focusly is built on the understanding that your digital presence shouldn’t be hampered by background limitations. From seamless media streaming to uninterrupted gaming sessions and productive multitasking, Focusly is the only tool you need to keep your online activities uninterrupted and efficient.

Get Focusly and experience the true freedom of uninterrupted digital multitasking.

# Documentation
Documentation can be found [here](https://crisboarna.github.io/focusly).


# Table of Contents

* [Installation](#installation)
* [Description](#description)
* [Development](#development)
  * [Extension](#extension)
    * [Running](#running)
      * [Chrome](#chrome)
      * [Firefox](#firefox)
    * [Linting](#linting)
    * [Testing](#testing)
    * [Building](#building)
    * [Packaging](#packaging)
* [How To Contribute](#how-to-contribute)
  * [Bots used](#bots-used)
* [License](#license)

# Installation
| Browser         | Market Store                                                                                                          |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|
| Google Chrome   | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en) |
| Mozilla Firefox | [Install](https://addons.mozilla.org/en-US/firefox/addon/focusly-active-focused-tabs)                                 |
| Microsoft Edge  | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en)  |
| Brave           | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en)  |
| Opera           | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en)  |
| Vivaldi         | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en)  |
| Iridium         | [Download](https://chromewebstore.google.com/detail/focusly-active-focused-ta/gphpkhlmamgiodhpkbpnffaieandbkih?hl=en) |

# Development
## Extension
### Running
#### Chrome
```shell
cd apps/extension && yarn dev
```
#### Firefox
```shell
cd apps/extension && yarn dev:firefox
```

### Linting
```shell
cd apps/extension && yarn lint
```

### Testing
```shell
cd apps/extension && yarn test
```
`vitest` is used as the testing framework.

### Building
```shell
cd apps/extension && yarn build && yarn build:firefox
```
The extension is built and the output is placed in the `.output` folder.

### Packaging
```shell
cd apps/extension && yarn zip && yarn zip:firefox
```

# How to Contribute

1. Clone repo and create a new branch:
```shell
git checkout https://github.com/crisboarna/react-skillbars -b name_for_new_branch`.
````
2. Make changes and test
3. Submit Pull Request with comprehensive description of changes

## Bots used
To facilitate development the following bots are integrated into the repository:
1. [Request Info](https://github.com/behaviorbot/request-info)
2. [Semantic Pull Requests](https://github.com/apps/semantic-pull-requests)
2. [Welcome](https://github.com/apps/welcome)
3. [Snyk](https://github.com/marketplace/snyk)
4. [Todo](https://github.com/apps/todo)

## License
[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

Full license details can be found in [LICENSE.md](./LICENSE.md)
