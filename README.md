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
* Manage web applications in a standalone environment - isolated from the
regular browsers.
* Start, stop, minimize, restore application from a individual **tile**.
* Arrange web applications in groups.
  * Customize view to see applications in selected groups only.
* Each group and application is identified by a UUID.
  * Makes it easy to share.
* Application URLs are **stored** locally in JSON format.

### In the pipeline
* Fetch and store **favicon** for the web application.
* Reorder desk applications.
* ~~Group desk applications.~~ (Done)
* Clear browser cache.
* Themes.
* Drag and drop URLs to create desk applications.
* Import and export the data file.
* Share desk applications.
* Reconcile tray menu.

### Technical specifications
* Built with node v16.14.2.
* Based on Electron v18.x.y.
* Uses Angular, Angular Material v12.x
* ``contextIsolation`` is ``true`` and ``nodeIntegration`` is ``false``.
  * Translates to better security.

## Privacy
Electron is based on **Chromium**. In this respect, it is no different than
any other browser. WebDesk simply manages bookmarks and application windows.
It **does not** extract/ collate/ transmit any data - personal or otherwise.

WebDesk users must continue to exercise caution - similar to other browsers -
when storing the bookmarks and following links from those web pages.

## License
BSD-3-Clause Copyright [Sanjeev Premi](https://github.com/spremi)
