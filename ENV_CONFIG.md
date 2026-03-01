# 🔐 环境变量配置完整指南

## 📋 本地开发环境

### 1. 创建 .env.local 文件（已完成）
```bash
# .env.local
DASHSCOPE_API_KEY=sk-23fa9423dc794195a74ed160f7a8fb33
```

### 2. 验证配置
```bash
# 启动开发服务器
npm run dev

# 打开浏览器控制台（F12），查看日志：
# ✅ 如果配置正确，搜索时会看到：🔍 调用 AI API: xxx
# ❌ 如果配置错误，会看到：❌ DASHSCOPE_API_KEY 未配置
```

## 🚀 Vercel 生产环境

### 方法1：通过 Vercel 网页界面配置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 **Settings** 标签
4. 左侧菜单选择 **Environment Variables**
5. 添加新变量：
   - **Name**: `DASHSCOPE_API_KEY`
   - **Value**: `sk-23fa9423dc794195a74ed160f7a8fb33`
   - **Environments**: 勾选 ✅ Production, ✅ Preview, ✅ Development
6. 点击 **Save**
7. 重新部署项目（推送新代码或手动 Redeploy）

### 方法2：通过 Vercel CLI 配置

```bash
# 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 登录
vercel login

# 添加环境变量
vercel env add DASHSCOPE_API_KEY

# 输入值：sk-23fa9423dc794195a74ed160f7a8fb33
# 选择环境：Production, Preview, Development（全选）

# 重新部署
vercel --prod
```

## ✅ 验证部署是否成功

### 1. 检查 Vercel 部署日志

1. 进入 Vercel 项目页面
2. 点击最新的 **Deployment**
3. 查看 **Build Logs**，确认没有错误
4. 查看 **Function Logs**（Runtime Logs）

### 2. 测试生产环境

访问你的 Vercel 网址，打开浏览器控制台（F12）：

**成功标志：**
- 输入食物名称后显示"正在打印风险小票..."
- 2-5秒后显示 AI 生成的小票
- 控制台显示：`✅ AI 返回成功`

**失败标志：**
- 显示"环境变量未配置"
- 显示"API 调用失败"
- 控制台显示：`❌ DASHSCOPE_API_KEY 未配置`

## 🔍 故障排查

### 问题1：显示"环境变量未配置"

**原因**：Vercel 环境变量未设置或未生效

**解决步骤**：
1. 确认在 Vercel Settings → Environment Variables 中已添加 `DASHSCOPE_API_KEY`
2. 确认勾选了 Production 环境
3. 重新部署：
   ```bash
   git commit --allow-empty -m "redeploy"
   git push
   ```

### 问题2：显示"API 调用失败"

**原因**：API Key 无效或余额不足

**解决步骤**：
1. 登录[阿里云控制台](https://dashscope.console.aliyun.com/)
2. 检查 API Key 是否有效
3. 检查账户余额是否充足
4. 尝试重新生成 API Key

### 问题3：本地正常，Vercel 失败

**原因**：环境变量在 Vercel 未配置

**解决步骤**：
1. 对比本地 `.env.local` 和 Vercel 环境变量
2. 确保变量名完全一致：`DASHSCOPE_API_KEY`
3. 确保值没有多余的空格或引号

## 📊 环境变量对比表

| 环境 | 配置位置 | 文件/界面 | 是否提交到 Git |
|------|---------|-----------|----------------|
| 本地开发 | 项目根目录 | `.env.local` | ❌ 不提交（已在 .gitignore） |
| Vercel 生产 | Vercel 平台 | Settings → Environment Variables | ❌ 不在代码中 |

## 🎯 最佳实践

1. ✅ **永远不要**将 `.env.local` 提交到 Git
2. ✅ **使用不同的 Key** 用于开发和生产环境（可选）
3. ✅ **定期轮换** API Key 以提高安全性
4. ✅ **监控** API 使用量和余额

## 🔗 相关链接

- [Vercel 环境变量文档](https://vercel.com/docs/projects/environment-variables)
- [阿里云通义千问控制台](https://dashscope.console.aliyun.com/)
- [Next.js 环境变量文档](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
