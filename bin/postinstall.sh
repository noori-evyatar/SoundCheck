#!/usr/bin/env bash

# iOS Patches
# patch -N $PWD/node_modules/react-native-navigation/ios/RCCTabBarController.m ./patches/RCCTabBarController.patch
# patch -N $PWD/node_modules/react-native-beacons-manager/ios/RNiBeacon/RNiBeacon/RNiBeacon.m ./patches/react-native-beacons-manager/RNiBeacon.patch
# patch -N $PWD/node_modules/react-native-interactable/lib/ios/Interactable/InteractableView.m ./patches/InteractableView.m.patch
# patch -N $PWD/node_modules/react-native-maps/react-native-google-maps.podspec ./patches/GoogleMapsSDK.patch
# patch -N $PWD/node_modules/react-native/Libraries/Geolocation/RCTLocationObserver.m ./patches/RCTLocationObserver.patch

# Android Patches
# patch -N $PWD/node_modules/react-native-interactable/lib/android/src/main/java/com/wix/interactable/InteractableView.java ./patches/InteractableView.patch
# patch -N $PWD/node_modules/react-native-interactable/lib/android/src/main/java/com/wix/interactable/physics/PhysicsAnimator.java ./patches/PhysicsAnimator.patch
# patch -N $PWD/node_modules/react-native-facebook-account-kit/android/build.gradle ./patches/react-native-facebook-account-kit/build.gradle.patch
# patch -N $PWD/node_modules/react-native-facebook-account-kit/android/src/main/java/io/underscope/react/fbak/RNAccountKitModule.java ./patches/react-native-facebook-account-kit/RNAccountKitModule.patch
# patch -N $PWD/node_modules/react-native-beacons-manager/android/build.gradle ./patches/react-native-beacons-manager/build.gradle.patch
# patch -N $PWD/node_modules/react-native-maps/lib/android/build.gradle ./patches/RNMaps-build.gradle.patch

if [ ! -z "$APPCENTER_XCODE_PROJECT" ] || [ -z "$APPCENTER_BUILD_ID" ]; then
    cd ios && bundle install && bundle exec pod install --repo-update
fi