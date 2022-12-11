# !/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 定义commit_log
set /p commit_log=请输入 commit 日志信息:
git init
git add -A
git commit -m "%commit_log%"
git pull origin master
git push origin master
