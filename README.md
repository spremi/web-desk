# WebDesk
Launch webpages as desktop application.

## Introduction
A mix of bookmarks and launcher for frequently used web pages / applications.
**WebDesk** provides an isolated environment to maintain bookmarks viz. Mail
clients, WhatsApp, Slack, ...

Each bookmark (**DeskApp**) launches in a new 'electron' window - with custom
label. None of these windows show in the task bar.

These bookmarks can also be accessed via the tray menu.

## Demo
![DEMO](./docs/web-desk-01.gif)

## Features
* Manage select web applications in a standalone environment - isolated from
regular browsers.
* Start, stop, minimize, restore application from a single **tile**.
* Bookmarks are **stored** locally in JSON format.
* ``contextIsolation`` is ``true`` and ``nodeIntegration`` is ``false``.

## In the pipeline
* Fetch and store **favicon** for the web application.
* Reorder bookmarks.
* Group bookmarks.
* Clearing browser cache.
* Themes.

## Privacy
Electron is based on **Chromium**. In this respect, it is no different that
any other browser. WebDesk simply manages bookmarks and application windows.
It **does not** extract/ collate/ transmit any data - personal or otherwise.

WebDesk users must continue to exercise caution - similar to other browsers -
when storing the bookmarks and following links from those web pages.

## License
BSD-3-Clause Copyright [Sanjeev Premi](https://github.com/spremi)
