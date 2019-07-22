#!/usr/bin/env bash

watchman watch-del-all 1>/dev/null

# ( cd ios && xcodebuild clean )
# ( cd android && ./gradlew clean )

rm -rf node_modules 1>/dev/null
rm -rf package-lock.json 1>/dev/null
rm -rf ./ios/Gemfile.lock 1>/dev/null
rm -rf ./ios/Pods 1>/dev/null
rm -rf ./ios/Podfile.lock 1>/dev/null

# rm -rf $TMPDIR/react-packager-* 1>/dev/null
# rm -rf ios/build 1>/dev/null

npm cache clean --force -s 1>/dev/null
npm cache verify 1>/dev/null

npm i
# RNFB_ANDROID_PERMISSIONS=true react-native link
