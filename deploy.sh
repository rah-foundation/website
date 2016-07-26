#!/bin/bash

export HEROKU_ACCOUNT=$(heroku whoami)

echo "Deploying with $HEROKU_ACCOUNT account ..."

# Make sure we are in master and it is up to date
git checkout master && git pull --rebase origin master

# Get the latest SHA from master
export SHA=$(git rev-parse origin/master)

# Make a new branch with that SHA
git checkout -b "deploy-$SHA"
echo "Switched to new branch:"
git branch

# Remove .gitignore
rm -f .gitignore

# Make a new build
npm run build

# Commit everything
git add -A && git commit -m "build at $SHA"

# Push it to Heroku
echo "Pushing to Heroku"
git push -f heroku "deploy-$SHA:master" && git checkout -
