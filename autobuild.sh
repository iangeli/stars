#!/bin/sh
# Powered by Magic

logInfo=`git log -1 --pretty=format:"%s"`
npm run build
mkdir temp
cp -rf assets temp
cp index.html temp
git push origin develop
git checkout master
git pull origin master
rm -rf assets
rm index.html
cp -rf temp/* .
rm -rf temp
git add .
git commit -m "version: $logInfo"
git push origin master
git checkout develop
