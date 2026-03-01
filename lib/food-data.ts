export interface FoodRisk {
  name: string
  emoji: string
  summary: string
  sideEffects: { label: string; severity: string; count: number }[]
  slogan: string
}

export interface Additive {
  name: string
  code: string
  category: string
  status: "safe" | "caution" | "avoid"
  usage: string
  riskNote: string
  advice: string
}

export const foodDatabase: Record<string, FoodRisk> = {
  "cherry tomato": {
    name: "Cherry Tomato",
    emoji: "\uD83C\uDF45",
    summary:
      "Cherry tomatoes contain lycopene and are generally nutritious. However, they are a cold-natured food and contain significant amounts of pectin. Eating them on an empty stomach can cause pectin to react with gastric acid, forming indigestible clumps that may lead to stomach discomfort. They also contain solanine in unripe forms, which is mildly toxic.",
    sideEffects: [
      { label: "Gastric Acid Reaction", severity: "medium", count: 1 },
      { label: "Cold Constitution Aggravation", severity: "low", count: 1 },
      { label: "Solanine Risk (if unripe)", severity: "high", count: 1 },
      { label: "Digestive Bloating", severity: "low", count: 1 },
      { label: "Allergic Skin Reaction", severity: "low", count: 1 },
    ],
    slogan: "Eat at your own risk.",
  },
  tomato: {
    name: "Tomato",
    emoji: "\uD83C\uDF45",
    summary:
      "Tomatoes are rich in vitamin C and lycopene, but eating them raw on an empty stomach may cause abdominal pain due to high acid levels. Green or unripe tomatoes contain solanine which can cause nausea. Excessive consumption may worsen acid reflux symptoms.",
    sideEffects: [
      { label: "Acid Reflux Trigger", severity: "medium", count: 1 },
      { label: "Solanine Toxicity (green)", severity: "high", count: 1 },
      { label: "Stomach Irritation", severity: "medium", count: 1 },
      { label: "Oral Allergy Syndrome", severity: "low", count: 1 },
    ],
    slogan: "Ripe is right. Green is a gamble.",
  },
  milk: {
    name: "Milk",
    emoji: "\uD83E\uDD5B",
    summary:
      "Milk is calcium-rich but roughly 68% of the global population has some degree of lactose intolerance. Overconsumption may lead to bloating, acne flare-ups, and increased mucus production. Some studies suggest links between high dairy intake and certain hormonal imbalances.",
    sideEffects: [
      { label: "Lactose Intolerance Flare", severity: "high", count: 1 },
      { label: "Acne Breakout", severity: "medium", count: 1 },
      { label: "Mucus Overproduction", severity: "low", count: 1 },
      { label: "Bloating & Gas", severity: "medium", count: 1 },
      { label: "Hormonal Disruption", severity: "low", count: 1 },
    ],
    slogan: "Got milk? Got problems?",
  },
  coffee: {
    name: "Coffee",
    emoji: "\u2615",
    summary:
      "Coffee boosts alertness through caffeine but stimulates cortisol production and stomach acid. Drinking it on an empty stomach may cause anxiety, jitteriness, and digestive discomfort. Long-term overconsumption can lead to adrenal fatigue, sleep disruption, and dependency.",
    sideEffects: [
      { label: "Anxiety & Jitters", severity: "medium", count: 1 },
      { label: "Stomach Acid Surge", severity: "medium", count: 1 },
      { label: "Sleep Disruption", severity: "high", count: 1 },
      { label: "Caffeine Dependency", severity: "medium", count: 1 },
      { label: "Teeth Staining", severity: "low", count: 1 },
      { label: "Cortisol Spike", severity: "medium", count: 1 },
    ],
    slogan: "Your morning ritual has a dark side.",
  },
  banana: {
    name: "Banana",
    emoji: "\uD83C\uDF4C",
    summary:
      "Bananas are potassium-rich and energy-boosting, but eating them on an empty stomach can cause a sudden spike in magnesium levels, potentially affecting heart rhythm. Overripe bananas have high sugar content that may trigger blood sugar spikes. They also produce excess gas during digestion.",
    sideEffects: [
      { label: "Blood Sugar Spike", severity: "medium", count: 1 },
      { label: "Magnesium Imbalance", severity: "medium", count: 1 },
      { label: "Digestive Gas", severity: "low", count: 1 },
      { label: "Constipation (unripe)", severity: "low", count: 1 },
    ],
    slogan: "Peel back the truth.",
  },
  rice: {
    name: "White Rice",
    emoji: "\uD83C\uDF5A",
    summary:
      "White rice is a staple food but has a high glycemic index, causing rapid blood sugar spikes. The refining process strips away most fiber, B vitamins, and minerals. Some rice varieties may contain trace amounts of arsenic absorbed from soil and water during cultivation.",
    sideEffects: [
      { label: "Blood Sugar Spike", severity: "high", count: 1 },
      { label: "Nutrient Deficiency", severity: "medium", count: 1 },
      { label: "Arsenic Trace Risk", severity: "low", count: 1 },
      { label: "Weight Gain Factor", severity: "medium", count: 1 },
    ],
    slogan: "The staple that strips itself bare.",
  },
  bread: {
    name: "Bread",
    emoji: "\uD83C\uDF5E",
    summary:
      "Commercial bread often contains refined flour, added sugars, and preservatives. Gluten in wheat bread can cause inflammation in sensitive individuals. White bread has a high glycemic index and offers minimal nutritional value compared to whole grain alternatives.",
    sideEffects: [
      { label: "Gluten Sensitivity", severity: "high", count: 1 },
      { label: "Blood Sugar Spike", severity: "medium", count: 1 },
      { label: "Preservative Intake", severity: "low", count: 1 },
      { label: "Bloating", severity: "medium", count: 1 },
      { label: "Weight Gain", severity: "medium", count: 1 },
    ],
    slogan: "Not all that rises is healthy.",
  },
  egg: {
    name: "Egg",
    emoji: "\uD83E\uDD5A",
    summary:
      "Eggs are protein-rich but contain high cholesterol in the yolk. While dietary cholesterol impact is debated, overconsumption may contribute to cardiovascular concerns in some individuals. Raw eggs carry Salmonella risk. Some people develop egg allergies, particularly children.",
    sideEffects: [
      { label: "Cholesterol Concern", severity: "medium", count: 1 },
      { label: "Salmonella Risk (raw)", severity: "high", count: 1 },
      { label: "Allergy Trigger", severity: "medium", count: 1 },
      { label: "Sulfur Gas", severity: "low", count: 1 },
    ],
    slogan: "The incredible, edible risk.",
  },
  apple: {
    name: "Apple",
    emoji: "\uD83C\uDF4E",
    summary:
      "Apples are fiber-rich but their seeds contain amygdalin, which releases cyanide when chewed. Non-organic apples frequently top the 'Dirty Dozen' pesticide list. The high fiber and fructose content can cause bloating and discomfort when consumed in excess.",
    sideEffects: [
      { label: "Pesticide Residue", severity: "high", count: 1 },
      { label: "Cyanide in Seeds", severity: "low", count: 1 },
      { label: "Fructose Overload", severity: "medium", count: 1 },
      { label: "Tooth Enamel Erosion", severity: "low", count: 1 },
    ],
    slogan: "An apple a day keeps... what exactly?",
  },
  soda: {
    name: "Soda",
    emoji: "\uD83E\uDD64",
    summary:
      "Soda contains massive amounts of sugar or artificial sweeteners, phosphoric acid that erodes teeth and bones, and caffeine that causes dependency. Regular consumption is strongly linked to obesity, type 2 diabetes, and metabolic syndrome.",
    sideEffects: [
      { label: "Sugar Overload", severity: "high", count: 1 },
      { label: "Tooth Enamel Erosion", severity: "high", count: 1 },
      { label: "Bone Density Loss", severity: "medium", count: 1 },
      { label: "Obesity Risk", severity: "high", count: 1 },
      { label: "Caffeine Dependency", severity: "medium", count: 1 },
      { label: "Insulin Resistance", severity: "high", count: 1 },
    ],
    slogan: "Fizzy feelings, lasting damage.",
  },
  chocolate: {
    name: "Chocolate",
    emoji: "\uD83C\uDF6B",
    summary:
      "Chocolate, especially milk and white varieties, is loaded with sugar and saturated fat. It contains caffeine and theobromine which can trigger migraines. The high oxalate content may contribute to kidney stone formation. Dark chocolate in moderation has some benefits, but most commercial chocolate is heavily processed.",
    sideEffects: [
      { label: "Sugar Rush & Crash", severity: "medium", count: 1 },
      { label: "Migraine Trigger", severity: "medium", count: 1 },
      { label: "Kidney Stone Risk", severity: "low", count: 1 },
      { label: "Acne Flare-up", severity: "medium", count: 1 },
      { label: "Caffeine Sensitivity", severity: "low", count: 1 },
    ],
    slogan: "Sweet poison in a pretty wrapper.",
  },
  "instant noodles": {
    name: "Instant Noodles",
    emoji: "\uD83C\uDF5C",
    summary:
      "Instant noodles are deep-fried, high in sodium, and contain preservatives like TBHQ. A single pack can exceed half your daily sodium intake. They provide virtually no nutritional value and the wax coating may burden digestion. Regular consumption is linked to metabolic syndrome and cardiovascular risks.",
    sideEffects: [
      { label: "Sodium Overload", severity: "high", count: 1 },
      { label: "TBHQ Preservative", severity: "medium", count: 1 },
      { label: "Metabolic Syndrome Risk", severity: "high", count: 1 },
      { label: "Nutrient Void", severity: "medium", count: 1 },
      { label: "Digestive Burden", severity: "medium", count: 1 },
    ],
    slogan: "3 minutes to cook. Years off your life.",
  },
}

export const additiveDatabase: Additive[] = [
  // Preservatives
  {
    name: "Sodium Benzoate",
    code: "E211",
    category: "Preservatives",
    status: "caution",
    usage: "Used in acidic foods like salad dressings, carbonated drinks, and fruit juices to inhibit microbial growth.",
    riskNote: "May form benzene (a carcinogen) when combined with vitamin C. Some studies link it to hyperactivity in children.",
    advice: "Check labels for combinations with ascorbic acid (vitamin C). Limit intake from processed beverages.",
  },
  {
    name: "Potassium Sorbate",
    code: "E202",
    category: "Preservatives",
    status: "safe",
    usage: "Widely used in cheese, yogurt, wine, and baked goods to prevent mold and yeast growth.",
    riskNote: "Generally recognized as safe (GRAS). Very low toxicity. May cause mild skin irritation in rare cases.",
    advice: "Safe for regular consumption within normal dietary amounts.",
  },
  {
    name: "Sodium Nitrite",
    code: "E250",
    category: "Preservatives",
    status: "avoid",
    usage: "Used in cured meats like bacon, ham, and hot dogs to prevent botulism and add pink color.",
    riskNote: "Can form nitrosamines (carcinogenic compounds) during cooking at high temperatures. Linked to increased colorectal cancer risk.",
    advice: "Minimize consumption of processed meats. If eating cured meats, pair with vitamin C-rich foods.",
  },
  {
    name: "BHA (Butylated Hydroxyanisole)",
    code: "E320",
    category: "Preservatives",
    status: "avoid",
    usage: "Antioxidant preservative in fats, oils, snack foods, and cereals.",
    riskNote: "Classified as 'reasonably anticipated to be a human carcinogen' by the National Toxicology Program.",
    advice: "Choose products without BHA. Opt for foods preserved with natural antioxidants like vitamin E.",
  },
  // Sweeteners
  {
    name: "Aspartame",
    code: "E951",
    category: "Sweeteners",
    status: "caution",
    usage: "Used in diet sodas, sugar-free gum, and low-calorie desserts. 200x sweeter than sugar.",
    riskNote: "Classified as 'possibly carcinogenic to humans' by IARC in 2023. May cause headaches in sensitive individuals.",
    advice: "Limit daily intake. Consider natural alternatives like stevia for regular use.",
  },
  {
    name: "Sucralose",
    code: "E955",
    category: "Sweeteners",
    status: "caution",
    usage: "Found in baked goods, beverages, and tabletop sweeteners. Heat-stable artificial sweetener.",
    riskNote: "May alter gut microbiome composition. When heated, can produce harmful chlorinated compounds.",
    advice: "Avoid using in cooking or baking at high temperatures. Moderate consumption recommended.",
  },
  {
    name: "Stevia",
    code: "E960",
    category: "Sweeteners",
    status: "safe",
    usage: "Natural sweetener from Stevia rebaudiana plant. Used in beverages, dairy, and tabletop sweeteners.",
    riskNote: "Generally recognized as safe. Purified extracts show no significant health concerns in studies.",
    advice: "A good alternative to artificial sweeteners. Safe for regular use within recommended amounts.",
  },
  {
    name: "Acesulfame K",
    code: "E950",
    category: "Sweeteners",
    status: "caution",
    usage: "Often combined with other sweeteners in diet beverages and sugar-free products.",
    riskNote: "Some animal studies suggest potential carcinogenic effects, though evidence is inconclusive in humans.",
    advice: "Consume in moderation. Avoid products that combine multiple artificial sweeteners.",
  },
  // Colors
  {
    name: "Tartrazine (Yellow 5)",
    code: "E102",
    category: "Colors",
    status: "caution",
    usage: "Used in candies, soft drinks, cereals, and snack foods for bright yellow color.",
    riskNote: "Linked to hyperactivity in children. Can cause allergic reactions, especially in aspirin-sensitive individuals.",
    advice: "Check labels if your child shows hyperactive behavior. Avoid if aspirin-sensitive.",
  },
  {
    name: "Allura Red (Red 40)",
    code: "E129",
    category: "Colors",
    status: "caution",
    usage: "Most common red dye in candies, beverages, condiments, and cereals.",
    riskNote: "Associated with hyperactivity in children. Contains benzidine, a known carcinogen, as a contaminant.",
    advice: "Limit exposure especially for children. Choose naturally colored alternatives when possible.",
  },
  {
    name: "Caramel Color",
    code: "E150d",
    category: "Colors",
    status: "caution",
    usage: "Used in colas, soy sauce, beer, and baked goods for brown coloring.",
    riskNote: "Class IV caramel color (E150d) contains 4-MEI, which is a possible carcinogen at high doses.",
    advice: "Moderate cola and dark soda consumption. The amounts in food are generally within safe limits.",
  },
  {
    name: "Titanium Dioxide",
    code: "E171",
    category: "Colors",
    status: "avoid",
    usage: "White pigment used in candies, chewing gum, icing, and supplements.",
    riskNote: "Banned in the EU since 2022 due to genotoxicity concerns. Nanoparticles may accumulate in organs.",
    advice: "Avoid products containing E171. Banned in several countries for food use.",
  },
  // Flavor Enhancers
  {
    name: "MSG (Monosodium Glutamate)",
    code: "E621",
    category: "Flavor Enhancers",
    status: "safe",
    usage: "Ubiquitous in processed foods, snacks, soups, and restaurant cooking for umami flavor.",
    riskNote: "Despite popular belief, extensive research shows MSG is safe for most people. 'Chinese Restaurant Syndrome' is largely debunked. Some individuals may experience mild, short-term symptoms.",
    advice: "Safe for general consumption. If you notice sensitivity, reduce intake and observe.",
  },
  {
    name: "Disodium Inosinate",
    code: "E631",
    category: "Flavor Enhancers",
    status: "safe",
    usage: "Often used with MSG to enhance savory flavor in chips, instant noodles, and seasonings.",
    riskNote: "Generally safe. Derived from animal or microbial sources. Not suitable for those with gout due to purine content.",
    advice: "Safe for most people. Avoid if you have gout or uric acid issues.",
  },
  // Emulsifiers
  {
    name: "Carboxymethyl Cellulose",
    code: "E466",
    category: "Emulsifiers",
    status: "caution",
    usage: "Thickener and stabilizer in ice cream, salad dressings, and processed cheese.",
    riskNote: "Recent studies suggest it may promote intestinal inflammation and alter gut microbiome, potentially contributing to metabolic syndrome.",
    advice: "Limit consumption of heavily processed foods containing this additive.",
  },
  {
    name: "Polysorbate 80",
    code: "E433",
    category: "Emulsifiers",
    status: "caution",
    usage: "Used in ice cream, sauces, and pickles as an emulsifier and stabilizer.",
    riskNote: "Animal studies show it can damage the gut barrier and promote inflammation. May contribute to inflammatory bowel conditions.",
    advice: "Reduce intake by choosing minimally processed foods. Especially cautious if you have gut issues.",
  },
  {
    name: "Lecithin",
    code: "E322",
    category: "Emulsifiers",
    status: "safe",
    usage: "Natural emulsifier from soy or sunflower. Used in chocolate, margarine, and baked goods.",
    riskNote: "Generally recognized as safe. Naturally occurring in eggs and soybeans. Very low risk profile.",
    advice: "Safe for regular consumption. Note soy source if you have soy allergies.",
  },
]

export const additiveCategories = [
  "Preservatives",
  "Sweeteners",
  "Colors",
  "Flavor Enhancers",
  "Emulsifiers",
]

export function searchFood(query: string): FoodRisk | null {
  const normalizedQuery = query.toLowerCase().trim()
  if (foodDatabase[normalizedQuery]) {
    return foodDatabase[normalizedQuery]
  }
  // Fuzzy match
  for (const key of Object.keys(foodDatabase)) {
    if (key.includes(normalizedQuery) || normalizedQuery.includes(key)) {
      return foodDatabase[key]
    }
  }
  return null
}
