"use server"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
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

  // 检查缓存
  if (cache.has(normalizedName)) {
    return cache.get(normalizedName)!
  }

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

    return result
  } catch (error) {
    console.error("OpenAI API Error:", error)

    // 返回默认错误响应
    return {
      emoji: "🖨️",
      summary: "打印机卡纸了，请稍后再试。可能是 API 配额用完或网络问题。",
      risks: [
        { label: "API 调用失败", severity: "high" },
        { label: "请检查 API Key", severity: "medium" },
        { label: "或稍后重试", severity: "low" },
      ],
      slogan: "技术故障中...",
    }
  }
}
