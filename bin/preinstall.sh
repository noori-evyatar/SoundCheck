#!/usr/bin/env bash
if [ ! -z "$APPCENTER_BUILD_ID" ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    which ssh-agent || ( apt-get update -y && apt-get install openssh-client git -y )
    eval "$(ssh-agent -s)"
    echo "$AWEAR_PRIVATE_KEY" | base64 -D > ~/.ssh/appcenter
    chmod 400 ~/.ssh/appcenter
    echo SG9zdCAqCiBBZGRLZXlzVG9BZ2VudCB5ZXMKIFVzZUtleWNoYWluIHllcwogSWRlbnRpdHlGaWxlIH4vLnNzaC9hcHBjZW50ZXIK | base64 -D >> ~/.ssh/config
    ssh-add ~/.ssh/appcenter
    ssh-keyscan github.com >> ~/.ssh/known_hosts
    chmod 644 ~/.ssh/known_hosts
    ssh -T git@github.com
fi

if [ ! -z "$APPCENTER_XCODE_PROJECT" ] || [ -z "$APPCENTER_BUILD_ID" ]; then
    gem update --system
    gem install bundler --no-document
fi