# GitHub PR Image Modal

A tiny Chrome extension that opens images in GitHub pull requests in a modal, instead of sending you to a new tab with the raw image file.

## Features

- Click an image in a PR description or comment to view it in a modal over the page
- Click anywhere outside the image, or press **Esc**, to close it
- Cmd/Ctrl-click and middle-click still open the image in a new tab
- Avatars and emoji are left alone

## Install (unpacked)

1. Clone or download this repo.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the repo folder.
4. Open any pull request on `github.com`.

To update: `git pull`, then click the reload icon on the extension's card in `chrome://extensions`.

## How it works

A single content script (`content.js`) runs on github.com. GitHub moves between pages without full reloads, so the script loads on every page and checks for a `/pull/` URL when you click. It catches clicks on images inside comment bodies before GitHub's own link handling and shows the image in an overlay instead. Permissions: none. No network access and no data collection.

## License

MIT
