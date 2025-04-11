git init
git add .
git commit -m "🎉 ci: 推送脚本更新"
git checkout master
git merge dev
git push --all
git push --tags
git checkout dev
