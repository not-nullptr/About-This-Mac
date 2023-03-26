# About This Mac
A clone of Snow Leopard's About This Mac dialogue written in Electron.

![An image of About This Mac](https://raw.github.com/madeline-xoxo/About-This-Mac/main/resources/screenshot.png)

## DISCLAIMER!!
This tool has only been tested on Arch. It is intended for use with my Aqua-ish dotfiles, but it works standalone.

## Installation
1. Clone this repository
2. Install packages via npm (`npm i`)
3. Build pacman package (`npm run build`)
4. Install pacman package (`npm run install`)
5. You're done! Open via `/usr/bin/about-this-mac`, or just `about-this-mac`.

## Support for other distributions
You can hack in support for other distros by changing the build target in the package.json. `-l pacman` should be replaced with whatever package manager your distro uses.