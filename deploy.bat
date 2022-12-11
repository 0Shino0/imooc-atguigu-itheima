set /p commit_log=请输入 commit 日志信息:
git status
git add -A
git commit -m "%commit_log%"
git pull origin master
git push origin master
pause
