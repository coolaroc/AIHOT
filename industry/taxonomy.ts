// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * tagColor 是飞书推送卡片里跟在标题后面的这一类小标签的颜色（飞书 text_tag 的颜色名）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "l1-l2", tagColor: "indigo", label: "公链/L2", feedLabel: "公链与 Layer2", section: "公链与 Layer2 进展", guide: "Layer1/Layer2 公链、Rollup、跨链协议、模块化区块链、节点客户端与网络升级等底层基础设施。" },
  { key: "defi", tagColor: "turquoise", label: "DeFi", feedLabel: "DeFi 金融", section: "DeFi 与金融生态", guide: "DEX、借贷、流动性质押(LSD/Restaking)、稳定币、RWA、链上衍生品与资产协议的发布及重大调整。" },
  { key: "ai-depin", tagColor: "violet", label: "AI/DePIN", feedLabel: "AI 与 DePIN", section: "AI 与去中心化基础设施", guide: "去中心化算力与存储、AI Agent+Web3 协议、DePIN 物理基础设施网络与硬件协议。" },
  { key: "security", tagColor: "red", label: "安全", feedLabel: "安全与黑客事件", section: "安全预警与事件", guide: "合约漏洞、黑客攻击、链上异动排查、钓鱼欺诈事件分析、白帽救援与资金追回进展。" },
  { key: "policy", tagColor: "blue", label: "监管", feedLabel: "政策与监管", section: "全球政策与合规", guide: "各国加密监管法案、现货 ETF 审批进展、SEC 等司法诉讼、央行数字货币(CBDC)与合规政策。" },
  { key: "industry", tagColor: "orange", label: "行业", feedLabel: "行业与投融资", section: "行业动态与投融资", guide: "已发生的大额融资并购（千万美元级以上）、机构动作、人事变动、真实商业合作与交易所重大公告。" },
  { key: "opinion", tagColor: "purple", label: "观点", section: "深度研报与观点", guide: "顶级投研机构深度研究报告、核心开发者/创始人反思、宏观周期判断与长篇访谈。", commentary: true },
  { key: "tip", tagColor: "green", label: "教程", section: "深度研报与观点", guide: "智能合约开发实践、节点搭建指南、链上工具用法与技巧复盘。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; tagColor: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布：日报报头的“N 个重大升级”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "l1-l2", tag: "协议升级", unit: "个重大升级" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = [
  "web3", "crypto", "blockchain", "defi", "dao", "btc", "eth", "sol", "nft", "tvl", "apr", "apy",
  "gas", "sec", "etf", "vc", "zk", "l2", "evm", "dex", "pos", "pow", "rollup", "restaking", "depin"
];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "协议升级", "产品更新", "研报/研究", "安全/预警", "融资/并购", "政策/监管", "大佬观点", "教程/实践", "现象/趋势", "开源/仓库", "评测/数据", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "以太坊", "Solana", "Bitcoin", "Sui/Move", "TON", "Layer2", "Layer3", "Rollup", "DeFi", "DEX", "借贷", "Restaking", "稳定币", "RWA", "链上衍生品", "预言机", "预测市场", "AI+Crypto", "DePIN", "链游/GameFi", "NFT", "跨链", "ZK/零知识证明", "MEV", "模块化区块链", "钱包/账户抽象", "代币经济",
] as const;

/** 可选的实体标签（公司、机构、公链、平台）。 */
export const ENTITY_TAGS = [
  "以太坊基金会", "Solana", "Bitcoin", "Sui", "Aptos", "TON", "Monad", "Berachain", "Uniswap", "Aave", "MakerDAO", "Lido", "Curve", "Hyperliquid", "Ethena", "Pendle", "Chainlink", "Ondo", "Arbitrum", "Optimism", "Base", "Starknet", "ZKsync", "Polygon", "Celestia", "EigenLayer", "Binance", "Coinbase", "OKX", "Tether", "Circle", "Polymarket", "Paradigm", "a16z crypto", "SlowMist", "PeckShield", "CertiK", "Flashbots", "Vitalik",
] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "教程/玩法": "教程/实践", "技巧/最佳实践": "教程/实践", "合作/生态": "行业动态", "融资/收购": "融资/并购", "公司动态": "行业动态",
  合作: "行业动态", 生态: "行业动态", 融资: "融资/并购", 收购: "融资/并购", 投资: "融资/并购", 并购: "融资/并购",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 合规: "政策/监管",
  安全: "安全/预警", 漏洞: "安全/预警", 黑客: "安全/预警", 攻击: "安全/预警",
  论文: "研报/研究", 研究: "研报/研究", 研报: "研报/研究", paper: "研报/研究", research: "研报/研究",
  "open-source": "开源/仓库", 开源: "开源/仓库", 仓库: "开源/仓库", repo: "开源/仓库",
  教程: "教程/实践", 玩法: "教程/实践", 指南: "教程/实践", 技巧: "教程/实践", 最佳实践: "教程/实践", 实践: "教程/实践",
  产品: "产品更新", 更新: "产品更新", 发布: "协议升级", 升级: "协议升级", 主网上线: "协议升级", 硬分叉: "协议升级",
  趋势: "现象/趋势", 现象: "现象/趋势", 观点: "大佬观点",
  行业: "行业动态", 动态: "行业动态",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 机构/主体主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；orgNames 是这家机构发消息时开头用的组织名，
 * 在它自己的主题页上读者知道说的是谁，可以省去；otherNames 是机构的其他称呼（官方账号名、子品牌）。
 * 所有这些名字都用来认出说的是哪家机构，比如把事实的主体对到发布方。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; orgNames?: string[]; otherNames?: string[] }> = {
  ethereum: { name: "Ethereum / 以太坊", displayTag: "Ethereum", aliases: ["Ethereum", "以太坊", "以太坊基金会", "Ethereum Foundation", "ETH"], orgNames: ["Ethereum Foundation", "以太坊基金会", "Ethereum"], otherNames: ["Vitalik Buterin", "Vitalik"] },
  solana: { name: "Solana", displayTag: "Solana", aliases: ["Solana", "SOL", "Solana Foundation", "Solana Labs"], orgNames: ["Solana Foundation", "Solana Labs", "Solana"], otherNames: ["Anatoly Yakovenko", "toly"] },
  bitcoin: { name: "Bitcoin / 比特币", displayTag: "Bitcoin", aliases: ["Bitcoin", "BTC", "比特币", "Satoshi"], orgNames: ["Bitcoin Core", "Bitcoin Optech"] },
  sui: { name: "Sui", displayTag: "Sui", aliases: ["Sui", "Sui Network", "Mysten Labs"], orgNames: ["Sui Foundation", "Mysten Labs"] },
  aptos: { name: "Aptos", displayTag: "Aptos", aliases: ["Aptos", "APT", "Aptos Labs"], orgNames: ["Aptos Foundation", "Aptos Labs"] },
  ton: { name: "TON", displayTag: "TON", aliases: ["TON", "The Open Network", "Toncoin"], orgNames: ["TON Foundation"] },
  uniswap: { name: "Uniswap", displayTag: "Uniswap", aliases: ["Uniswap", "UNI", "Uniswap Labs", "Unichain"], orgNames: ["Uniswap Labs", "Uniswap"], otherNames: ["Hayden Adams"] },
  aave: { name: "Aave", displayTag: "Aave", aliases: ["Aave", "AAVE", "Avara", "GHO"], orgNames: ["Aave Labs", "Aave", "Aave DAO"], otherNames: ["Stani Kulechov"] },
  makerdao: { name: "MakerDAO / Sky", displayTag: "MakerDAO", aliases: ["MakerDAO", "Sky", "MKR", "DAI", "USDS"], orgNames: ["MakerDAO", "Sky Ecosystem"] },
  lido: { name: "Lido", displayTag: "Lido", aliases: ["Lido", "Lido Finance", "LDO", "stETH"], orgNames: ["Lido DAO", "Lido Finance"] },
  curve: { name: "Curve", displayTag: "Curve", aliases: ["Curve", "Curve Finance", "CRV", "crvUSD"], orgNames: ["Curve Finance"] },
  hyperliquid: { name: "Hyperliquid", displayTag: "Hyperliquid", aliases: ["Hyperliquid", "HYPE", "HyperEVM"], orgNames: ["Hyperliquid", "Hyper Foundation"] },
  ethena: { name: "Ethena", displayTag: "Ethena", aliases: ["Ethena", "ENA", "USDe", "Ethena Labs"], orgNames: ["Ethena Labs"] },
  pendle: { name: "Pendle", displayTag: "Pendle", aliases: ["Pendle", "Pendle Finance", "PENDLE"], orgNames: ["Pendle Finance"] },
  chainlink: { name: "Chainlink", displayTag: "Chainlink", aliases: ["Chainlink", "LINK", "CCIP"], orgNames: ["Chainlink Labs", "Chainlink"] },
  arbitrum: { name: "Arbitrum", displayTag: "Arbitrum", aliases: ["Arbitrum", "ARB", "Offchain Labs"], orgNames: ["Arbitrum Foundation", "Offchain Labs"] },
  optimism: { name: "Optimism", displayTag: "Optimism", aliases: ["Optimism", "OP", "OP Mainnet", "Superchain"], orgNames: ["Optimism Foundation", "OP Labs"] },
  starknet: { name: "Starknet", displayTag: "Starknet", aliases: ["Starknet", "StarkWare", "STRK"], orgNames: ["Starknet Foundation", "StarkWare"] },
  zksync: { name: "ZKsync", displayTag: "ZKsync", aliases: ["ZKsync", "zkSync", "Matter Labs"], orgNames: ["Matter Labs", "ZKsync"] },
  polygon: { name: "Polygon", displayTag: "Polygon", aliases: ["Polygon", "POL", "MATIC", "Polygon Labs"], orgNames: ["Polygon Labs"] },
  celestia: { name: "Celestia", displayTag: "Celestia", aliases: ["Celestia", "TIA"], orgNames: ["Celestia Labs", "Celestia"] },
  eigenlayer: { name: "EigenLayer", displayTag: "EigenLayer", aliases: ["EigenLayer", "EIGEN", "EigenDA", "EigenCloud"], orgNames: ["Eigen Labs", "Eigen Foundation"] },
  binance: { name: "Binance / 币安", displayTag: "Binance", aliases: ["Binance", "币安", "BNB", "BNB Chain", "CZ"], orgNames: ["Binance", "币安", "Binance Labs", "Binance Research"], otherNames: ["Changpeng Zhao", "赵长鹏"] },
  coinbase: { name: "Coinbase / Base", displayTag: "Coinbase", aliases: ["Coinbase", "Base"], orgNames: ["Coinbase", "Coinbase Assets", "Base"], otherNames: ["Brian Armstrong"] },
  okx: { name: "OKX", displayTag: "OKX", aliases: ["OKX", "欧易", "OKB", "X Layer"], orgNames: ["OKX", "OKX Ventures"] },
  tether: { name: "Tether / USDT", displayTag: "Tether", aliases: ["Tether", "USDT"], orgNames: ["Tether"] },
  circle: { name: "Circle / USDC", displayTag: "Circle", aliases: ["Circle", "USDC"], orgNames: ["Circle"] },
  polymarket: { name: "Polymarket", displayTag: "Polymarket", aliases: ["Polymarket"], orgNames: ["Polymarket"] },
  paradigm: { name: "Paradigm", displayTag: "Paradigm", aliases: ["Paradigm", "Paradigm Research"], orgNames: ["Paradigm"] },
  "a16z-crypto": { name: "a16z crypto", displayTag: "a16z crypto", aliases: ["a16z crypto", "a16z"], orgNames: ["a16z crypto", "Andreessen Horowitz"] },
  slowmist: { name: "SlowMist / 慢雾", displayTag: "SlowMist", aliases: ["SlowMist", "慢雾", "慢雾科技", "余弦"], orgNames: ["SlowMist", "慢雾科技"] },
  peckshield: { name: "PeckShield / 派盾", displayTag: "PeckShield", aliases: ["PeckShield", "派盾", "PeckShieldAlert"], orgNames: ["PeckShield"] },
  certik: { name: "CertiK", displayTag: "CertiK", aliases: ["CertiK", "CertiK Alert"], orgNames: ["CertiK"] },
  flashbots: { name: "Flashbots", displayTag: "Flashbots", aliases: ["Flashbots", "MEV-Boost", "SUAVE"], orgNames: ["Flashbots"] },
  vitalik: { name: "Vitalik Buterin", displayTag: "Vitalik", aliases: ["Vitalik", "Vitalik Buterin", "V神"], orgNames: ["Vitalik Buterin"] },
};

/**
 * 身份词典：摘要和标题里出现的实体，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "ethereum", name: "Ethereum / 以太坊", patterns: [/ethereum|以太坊|\beth\b/i] },
  { id: "solana", name: "Solana", patterns: [/solana|\bsol\b/i] },
  { id: "bitcoin", name: "Bitcoin / 比特币", patterns: [/bitcoin|比特币|\bbtc\b/i] },
  { id: "sui", name: "Sui", patterns: [/\bsui\b|mysten\s?labs/i] },
  { id: "aptos", name: "Aptos", patterns: [/\baptos\b|\bapt\b/i] },
  { id: "ton", name: "TON", patterns: [/\bton\b|toncoin|the\s+open\s+network/i] },
  { id: "uniswap", name: "Uniswap", patterns: [/uniswap|unichain|\buni\b/i] },
  { id: "aave", name: "Aave", patterns: [/\baave\b|\bgho\b/i] },
  { id: "makerdao", name: "MakerDAO / Sky", patterns: [/makerdao|\bmkr\b|\bdai\b|\bsky\s?ecosystem\b|\busds\b/i] },
  { id: "lido", name: "Lido", patterns: [/\blido\b|\bsteth\b|\bldo\b/i] },
  { id: "curve", name: "Curve", patterns: [/\bcurve\b|\bcrv\b|crvusd/i] },
  { id: "hyperliquid", name: "Hyperliquid", patterns: [/hyperliquid|hyperevm|\bhype\b/i] },
  { id: "ethena", name: "Ethena", patterns: [/ethena|\busde\b|\bena\b/i] },
  { id: "pendle", name: "Pendle", patterns: [/\bpendle\b/i] },
  { id: "chainlink", name: "Chainlink", patterns: [/chainlink|\blink\b|\bccip\b/i] },
  { id: "arbitrum", name: "Arbitrum", patterns: [/arbitrum|\barb\b|offchain\s?labs/i] },
  { id: "optimism", name: "Optimism", patterns: [/optimism|\bop\s?labs\b|superchain/i] },
  { id: "starknet", name: "Starknet", patterns: [/starknet|starkware|\bstrk\b/i] },
  { id: "zksync", name: "ZKsync", patterns: [/zksync|matter\s?labs/i] },
  { id: "polygon", name: "Polygon", patterns: [/polygon|\bmatic\b|\bpol\b/i] },
  { id: "celestia", name: "Celestia", patterns: [/celestia|\btia\b/i] },
  { id: "eigenlayer", name: "EigenLayer", patterns: [/eigenlayer|eigenda|\beigen\b/i] },
  { id: "binance", name: "Binance / 币安", patterns: [/binance|币安|\bbnb\b|赵长鹏|\bcz\b/i] },
  { id: "coinbase", name: "Coinbase / Base", patterns: [/coinbase|\bbase\b/i] },
  { id: "okx", name: "OKX", patterns: [/\bokx\b|欧易|\bokb\b/i] },
  { id: "tether", name: "Tether / USDT", patterns: [/tether|\busdt\b/i] },
  { id: "circle", name: "Circle / USDC", patterns: [/circle|\busdc\b/i] },
  { id: "polymarket", name: "Polymarket", patterns: [/polymarket/i] },
  { id: "paradigm", name: "Paradigm", patterns: [/paradigm/i] },
  { id: "a16z-crypto", name: "a16z crypto", patterns: [/a16z\s?crypto|\ba16z\b/i] },
  { id: "slowmist", name: "SlowMist / 慢雾", patterns: [/slowmist|慢雾|余弦/i] },
  { id: "peckshield", name: "PeckShield / 派盾", patterns: [/peckshield|派盾/i] },
  { id: "certik", name: "CertiK", patterns: [/certik/i] },
  { id: "flashbots", name: "Flashbots", patterns: [/flashbots/i] },
  { id: "vitalik", name: "Vitalik Buterin", patterns: [/vitalik|buterin|v神/i] },
];

/** 这些域名上的文章，发布方就是对应的机构（托管平台如 GitHub 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "ethereum", domains: ["blog.ethereum.org", "ethereum.org"] },
  { entityId: "vitalik", domains: ["vitalik.eth.limo", "vitalik.ca"] },
  { entityId: "uniswap", domains: ["uniswap.org", "blog.uniswap.org"] },
  { entityId: "solana", domains: ["solana.com"] },
  { entityId: "chainlink", domains: ["chain.link", "blog.chain.link"] },
  { entityId: "lido", domains: ["lido.fi", "blog.lido.fi"] },
  { entityId: "celestia", domains: ["celestia.org", "blog.celestia.org"] },
  { entityId: "arbitrum", domains: ["arbitrum.foundation", "offchainlabs.com"] },
  { entityId: "binance", domains: ["binance.com", "research.binance.com"] },
  { entityId: "coinbase", domains: ["coinbase.com", "blog.coinbase.com"] },
  { entityId: "paradigm", domains: ["paradigm.xyz"] },
  { entityId: "a16z-crypto", domains: ["a16zcrypto.com"] },
  { entityId: "slowmist", domains: ["slowmist.com"] },
  { entityId: "certik", domains: ["certik.com"] },
  { entityId: "flashbots", domains: ["flashbots.net", "writings.flashbots.net"] },
];

/** 原文里的这些写法也算提到了对应机构。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "ethereum", pattern: /@ethereum\b|@ethdotorg\b/i },
  { entityId: "vitalik", pattern: /@VitalikButerin\b/i },
  { entityId: "solana", pattern: /@solana\b|@aeyakovenko\b/i },
  { entityId: "uniswap", pattern: /@Uniswap\b|@haydenzadams\b/i },
  { entityId: "aave", pattern: /@aave\b|@StaniKulechov\b/i },
  { entityId: "binance", pattern: /@binance\b|@cz_binance\b|@BinanceResearch\b/i },
  { entityId: "coinbase", pattern: /@coinbase\b|@base\b|@brian_armstrong\b/i },
  { entityId: "slowmist", pattern: /@SlowMist_Team\b|@evilcos\b/i },
  { entityId: "peckshield", pattern: /@PeckShieldAlert\b/i },
];
