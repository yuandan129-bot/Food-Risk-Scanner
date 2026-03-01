# 🚀 Vercel 部署指南

## ✅ 已修复的问题

### 1. 语法错误修复
- ✅ 修复了 [`app/actions.ts`](app/actions.ts:6) 中的 `apiKey:` 重复问题

## 📋 Vercel 部署步骤

### 1. 在 Vercel 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入你的 Vercel 项目
2. 点击 **Settings** → **Environment Variables**
3. 添加以下变量：

```
Name: DASHSCOPE_API_KEY
Value: sk-23fa9423dc794195a74ed160f7a8fb33
```

4. 选择应用到：**Production**, **Preview**, **Development**
5. 点击 **Save**

### 2. 重新部署

配置环境变量后，需要重新部署：

1. 进入 **Deployments** 页面
2. 点击最新部署右侧的 **...** 菜单
3. 选择 **Redeploy**

或者直接推送新的代码到 GitHub：

```bash
git add .
git commit -m "fix: 修复 API Key 语法错误"
git push
```

## 🔍 关于"功能2搜索添加剂无法搜索"的问题

**Scanner 页面（功能2）使用的是本地静态数据，不需要 API。**

检查 [`app/scanner/page.tsx`](app/scanner/page.tsx:1)：
- 这个页面从 [`lib/food-data.ts`](lib/food-data.ts:187) 读取 `additiveDatabase`
- 搜索功能是纯前端过滤，不调用任何 API
- 如果搜索不工作，可能是前端 JavaScript 没有正确加载

### 排查步骤：

1. **打开浏览器开发者工具**（F12）
2. 查看 **Console** 是否有错误
3. 查看 **Network** 标签，确认 JavaScript 文件加载成功
4. 尝试清除浏览器缓存后刷新

## ✅ 测试清单

- [ ] 首页搜索功能正常（调用 AI API）
- [ ] 显示加载状态"正在打印风险小票..."
- [ ] AI 返回结果并显示小票
- [ ] Scanner 页面搜索添加剂正常（本地数据）
- [ ] 点击添加剂标签显示详情弹窗

## 🐛 常见问题

### 问题1：首页搜索后没有返回结果
**原因**：环境变量未配置或 API Key 无效
**解决**：在 Vercel 配置 `DASHSCOPE_API_KEY`

### 问题2：显示"打印机卡纸"错误
**原因**：API 调用失败
**解决**：
1. 检查 API Key 是否正确
2. 检查阿里云账户余额
3. 查看 Vercel 部署日志

### 问题3：Scanner 页面搜索不工作
**原因**：前端 JavaScript 加载问题
**解决**：
1. 清除浏览器缓存
2. 检查浏览器控制台错误
3. 确认 Vercel 构建成功

## 📞 调试命令

本地测试：
```bash
npm run dev
```

查看 Vercel 日志：
```bash
vercel logs
```
