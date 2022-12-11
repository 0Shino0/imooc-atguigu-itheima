# !/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 定义commit_log
set /p commit_log=请输入 commit 日志信息:


# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

git init
# git config user.name "0shino0"
# git config user.email "1471386835@qq.com"
git add -A
# git commit -m `date +"%y/%m/%d"`
git commit -m "%commit_log%"

# 如果你想要部署到 https://USERNAME.github.io
# ssh git@github.com:0Shino0/imooc-atguigu-itheima.git
git pull
git push origin master

# 返回进入此目录之前所在目录 
cd - 