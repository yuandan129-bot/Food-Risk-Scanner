"use server"

import OpenAI from "openai"

// 检查环境变量
const apiKey = process.env.DASHSCOPE_API_KEY
if (!apiKey) {
  console.error("❌ DASHSCOPE_API_KEY 未配置！请在 Vercel 或 .env.local 中设置")
}

const openai = new OpenAI({
  apiKey: apiKey || "dummy-key",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
})

// 简单的内存缓存
const cache = new Map<string, AIFoodResult>()

export interface AIFoodResult {
  emoji: string
  summary: string
  risks: Array<{
    label: string
    severity: "high" | "medium" | "low"
  }>
  slogan: string
}

export async function analyzeFoodWithAI(
  foodName: string
): Promise<AIFoodResult> {
  const normalizedName = foodName.toLowerCase().trim()

  // 检查 API Key
  if (!apiKey) {
    console.error("❌ API Key 未配置")
    return {
      emoji: "⚠️",
      summary: "环境变量未配置。请在 Vercel 设置中添加 DASHSCOPE_API_KEY，或在本地创建 .env.local 文件。",
      risks: [
        { label: "环境变量缺失", severity: "high" },
        { label: "请配置 DASHSCOPE_API_KEY", severity: "high" },
        { label: "参考 VERCEL_DEPLOY.md", severity: "medium" },
      ],
      slogan: "配置缺失",
    }
  }

  // 检查缓存
  if (cache.has(normalizedName)) {
    console.log("✅ 使用缓存:", normalizedName)
    return cache.get(normalizedName)!
  }

  console.log("🔍 调用 AI API:", normalizedName)

  try {
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content: `你是一个营养学毒舌专家。用户输入食物名称，请返回严格的 JSON 格式（不要包含任何其他文字）：
{
  "emoji": "代表该食物的 emoji（单个emoji字符）",
  "summary": "一段客观的诊断性描述，说明其危害原理（50字左右，要有毒舌风格）",
  "risks": [
    {"label": "副作用名称", "severity": "high"},
    {"label": "副作用名称", "severity": "medium"},
    {"label": "副作用名称", "severity": "low"}
  ],
  "slogan": "一句简短有力的警示语（10字以内）"
}

注意：
- risks 数组至少包含 3-5 个副作用
- severity 只能是 "high", "medium", "low" 三个值之一
- 返回纯 JSON，不要有其他解释文字`,
        },
        {
          role: "user",
          content: foodName,
        },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("No response from OpenAI")
    }

    const result = JSON.parse(content) as AIFoodResult

    // 存入缓存
    cache.set(normalizedName, result)
    console.log("✅ AI 返回成功")

    return result
  } catch (error) {
    console.error("❌ API 调用失败:", error)
    
    // 详细错误信息
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("错误详情:", errorMessage)

    // 返回默认错误响应
    return {
      emoji: "🖨️",
      summary: `API 调用失败：${errorMessage.slice(0, 50)}。请检查 API Key 是否正确，或阿里云账户是否有余额。`,
      risks: [
        { label: "API 调用失败", severity: "high" },
        { label: "请检查 Vercel 环境变量", severity: "high" },
        { label: "或检查 API Key 余额", severity: "medium" },
      ],
      slogan: "技术故障中...",
    }
  }
}
