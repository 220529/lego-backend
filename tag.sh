#!/bin/bash

# 获取当前时间并格式化成 YYYY-MM-DD-HH-MM-SS
dateString=$(date +"%Y-%m-%d-%H-%M-%S")

# 打印生成的标签名
echo "生成的标签名: $dateString"

# 获取项目的 Git 仓库地址
gitRepoURL=$(git remote get-url origin)
echo "Git 仓库地址: $gitRepoURL"

# 创建标签
git tag "$dateString"

# 提示用户是否要推送标签到远程仓库
read -p "是否要推送标签到远程仓库？(y/n): " choice
if [ "$choice" = "y" ]; then
  git push origin "$dateString"
  echo "标签已成功推送到远程仓库。"
else
  echo "标签未推送到远程仓库。"
fi
