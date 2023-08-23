#!/bin/bash

echo "Pre-Push Script Running"

protected_develop='develop'
protected_staging='staging'
protected_release='release'

is_protected_branch=0
curr_branch=$(git branch --show-current)

echo "pushing to branch - $curr_branch"
if [[ $protected_develop = $curr_branch
      || $protected_staging = $curr_branch
      || $protected_release = $curr_branch ]]
then
    is_protected_branch=1
    read -p "You're about to push to >>> $curr_branch <<<, is that what you intended? [y|n] " -n 1 -r < /dev/tty
    echo
    if echo $REPLY | grep -E '^[Yy]$' > /dev/null
    then
        echo "Ok.  Pre-Push Script Obeying!"
        exit 0 # execute push
    fi
    echo "Blocking the push!!"
    exit 1 # block push
fi 

if [ "$is_protected_branch" = "0" ]
then
    echo "Pre-Push Script Done (nothing was flagged)."
fi