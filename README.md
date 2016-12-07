## Offline Sync
 [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)



It uses pouchDB with websql as adapter to provide offline sync with DB when internet connection of an application goes off.

### Snap
<img src="http://i.imgur.com/TkIOMPm.jpg" width="600" alt="Sky Blue"/>

### Demo

<a target="_blank" href="https://www.dropbox.com/s/g3hrmkhysc2bkt7/offlineSync.apk?dl=0">Android Apk</a>



## Getting Started
* Install Ionic CLI `npm install ionic -g --save`
* Install Cordova `npm install -g cordova`

## Run it on the browser
* Run `ionic serve` in a terminal from the project root.

## Before run it on devices
* Install iOS Sim (npm install -g ios-sim)
* Install iOS Deploy (npm install -g ios-deploy)
* Add Android platform `ionic platform add android`
* Add iOS platform after `ionic platform add ios`

## Before run it on android
* Install [Android Studio](http://developer.android.com/intl/es/sdk/index.html)
* Open Android SDK Manager and install:
  * Android SDK Tools
  * Android SDK Platform-tools
  * Android SDK Build-tools
  * System images (in case you need to use Android Emulator)
  * Android Support Repository
  * Android Support Library
  * Google Play services
  * Google Repository
  * Intel x86 Emulator Accelerator (in case you need to use Android Emulator)

## Build and Run
* ionic build ios/android
* ionic run ios/android --emulator --devices

##To Do
* Use CouchDB for complete sync.
* Netowork status response and action improve.(Offline/Online)
