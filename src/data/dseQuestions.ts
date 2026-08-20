import { MCQuestion, StructuredQuestion } from '../types';

export const dseMCQuestions: MCQuestion[] = [
  {
    id: 'dse-2012-q11',
    year: 2012,
    paperNumber: 'Paper 1',
    questionNumber: 'Q11',
    topic: 'TR',
    difficulty: 'Level 3',
    questionEn: 'Michelle is a jewelry lover and she says, "I will spend all my monthly salary on jewelry no matter what the price is." From this we can conclude that her demand for jewelry is',
    questionZh: 'Michelle 是一位珠寶愛好者，她說：「無論價格如何，我每個月都會把所有薪金花在珠寶上。」由此我們可以推斷，她對珠寶的需求是',
    optionsEn: [
      { label: 'A', text: 'elastic.' },
      { label: 'B', text: 'inelastic.' },
      { label: 'C', text: 'unitarily elastic.' },
      { label: 'D', text: 'perfectly inelastic.' }
    ],
    optionsZh: [
      { label: 'A', text: '富於彈性。' },
      { label: 'B', text: '缺乏彈性。' },
      { label: 'C', text: '單一彈性。' },
      { label: 'D', text: '完全無彈性。' }
    ],
    correctAnswer: 'C',
    explanationEn: 'Total expenditure = Price × Quantity = Michelle\'s monthly salary (constant). When total expenditure remains unchanged at all price levels, the percentage change in quantity demanded equals the percentage change in price (%ΔQd = %ΔP). Therefore, |Ed| = 1 (Unitarily Elastic).',
    explanationZh: '總開支（Total Expenditure）= 價格 × 數量 = 固定月薪。當價格變動而總開支保持不變時，數量變動百分比等於價格變動百分比（%ΔQd = %ΔP），因此需求價格彈性等於 1（單一彈性）。',
    keyTakeawayEn: 'Constant Total Expenditure at different prices ⟹ Unitarily Elastic Demand (|Ed| = 1).',
    keyTakeawayZh: '價格改變但總開支維持不變 ⟹ 需求屬單一彈性（|Ed| = 1）。',
    hkdseTrapEn: 'Do not confuse "spending the same money" (Unitary, Ed=1) with "buying the same quantity" (Perfect Inelastic, Ed=0).',
    hkdseTrapZh: '切忌混淆「花費相同金額」（單一彈性，Ed=1）與「購買相同數量」（完全無彈性，Ed=0）。'
  },
  {
    id: 'dse-2012-q12',
    year: 2012,
    paperNumber: 'Paper 1',
    questionNumber: 'Q12',
    topic: 'TR',
    difficulty: 'Level 4',
    questionEn: 'Owing to continuous bad weather, the quantity transacted of local vegetables falls by 40% while the price rises by 13%. Which of the following statements are correct?\n(1) The quantity demanded of local vegetables falls.\n(2) The total expenditure on local vegetables rises.\n(3) The demand for imported vegetables rises.\n(4) The total expenditure on imported vegetables may rise or fall depending on the elasticity of demand.',
    questionZh: '由於持續惡劣天氣，本地蔬菜的交易量下跌 40%，而價格上升 13%。下列哪項陳述是正確的？\n(1) 本地蔬菜的需求量下跌。\n(2) 本地蔬菜的總開支上升。\n(3) 進口蔬菜的需求上升。\n(4) 進口蔬菜的總開支可能上升或下跌，視乎需求彈性而定。',
    optionsEn: [
      { label: 'A', text: '(1) and (2) only' },
      { label: 'B', text: '(1) and (3) only' },
      { label: 'C', text: '(2) and (4) only' },
      { label: 'D', text: '(3) and (4) only' }
    ],
    optionsZh: [
      { label: 'A', text: '只有 (1)、(2)' },
      { label: 'B', text: '只有 (1)、(3)' },
      { label: 'C', text: '只有 (2)、(4)' },
      { label: 'D', text: '只有 (3)、(4)' }
    ],
    correctAnswer: 'B',
    explanationEn: '(1) True: As price of local vegetables rises, quantity demanded falls along the demand curve by 40%.\n(2) False: %ΔP (+13%) < %ΔQd (-40%), demand is elastic, so higher price causes total expenditure (P × Q) to fall, not rise.\n(3) True: Imported vegetables are substitutes for local vegetables. Higher local vegetable price shifts demand for imported vegetables rightward.\n(4) False: A rightward shift in demand for imported vegetables will increase both equilibrium price and quantity, so total expenditure must rise (no ambiguity).',
    explanationZh: '(1) 正確：本地菜價上升，沿需求曲線移動導致需求量下跌 40%。\n(2) 錯誤：%ΔQd (-40%) 的幅度大於 %ΔP (+13%)，需求屬富於彈性，加價會令總開支下降。\n(3) 正確：進口菜為本地菜的替代品，本地菜加價引致進口菜需求增加（右移）。\n(4) 錯誤：進口菜需求增加會使均衡價格及數量均上升，總開支必然上升，毋須視乎彈性。',
    keyTakeawayEn: 'When %ΔQ > %ΔP (elastic), a price increase reduces total revenue/expenditure.',
    keyTakeawayZh: '當需求富於彈性（%ΔQ > %ΔP），加價會導致總開支（Total Expenditure）減少。'
  },
  {
    id: 'dse-2014-q13',
    year: 2014,
    paperNumber: 'Paper 1',
    questionNumber: 'Q13',
    topic: 'Factors-Ed',
    difficulty: 'Level 3',
    questionEn: 'Which of the following would reduce the elasticity of demand for the transport service of the Airport Express?',
    questionZh: '下列哪項會降低機場快綫客運服務的需求價格彈性？',
    optionsEn: [
      { label: 'A', text: 'There are more airport bus routes to different districts.' },
      { label: 'B', text: 'Vans are not allowed to pick up passengers at the airport.' },
      { label: 'C', text: 'The fare of the Airport Express is raised.' },
      { label: 'D', text: 'The maintenance cost of the Airport Express trains increases.' }
    ],
    optionsZh: [
      { label: 'A', text: '前往各區的機場巴士路線增加。' },
      { label: 'B', text: '客貨車禁止在機場接載乘客。' },
      { label: 'C', text: '機場快綫車費調高。' },
      { label: 'D', text: '機場快綫列車的維修成本增加。' }
    ],
    correctAnswer: 'B',
    explanationEn: 'When vans are prohibited from picking up passengers at the airport, passengers have FEWER substitutes for airport transport. Fewer close substitutes makes the demand for Airport Express LESS elastic (inelastic).',
    explanationZh: '當客貨車被禁止在機場接載乘客時，旅客前往市區的替代品減少。替代品越少，對機場快綫的需求彈性便會越低（變得更缺乏彈性）。',
    keyTakeawayEn: 'Fewer substitutes available ⟹ Lower Price Elasticity of Demand.',
    keyTakeawayZh: '替代品數量減少 ⟹ 需求價格彈性下降。'
  },
  {
    id: 'dse-2015-q11',
    year: 2015,
    paperNumber: 'Paper 1',
    questionNumber: 'Q11',
    topic: 'TR',
    difficulty: 'Level 4',
    questionEn: 'The table below shows the relationship between the price of and the total expenditure on ice-cream.\nUnit Price ($): 5, 6, 7, 8\nTotal Expenditure ($): 25, 30, 35, 40\nFrom the above table, we can conclude that the elasticity of demand for ice-cream is __________ (without regard to its negative sign).',
    questionZh: '下表顯示雪糕價格與消費者總開支的關係。\n單價 ($)：5, 6, 7, 8\n總開支 ($)：25, 30, 35, 40\n從上表可推斷，雪糕的需求彈性（不考慮負號）是 __________。',
    tableData: {
      headersEn: ['Unit Price ($)', 'Total Expenditure ($)', 'Quantity Demanded (TR/P)'],
      headersZh: ['單價 ($)', '總開支 ($)', '需求量 (TR/P)'],
      rows: [
        [5, 25, '25 / 5 = 5 units'],
        [6, 30, '30 / 6 = 5 units'],
        [7, 35, '35 / 7 = 5 units'],
        [8, 40, '40 / 8 = 5 units']
      ]
    },
    optionsEn: [
      { label: 'A', text: 'between zero and one' },
      { label: 'B', text: 'equal to zero' },
      { label: 'C', text: 'larger than one' },
      { label: 'D', text: 'equal to one' }
    ],
    optionsZh: [
      { label: 'A', text: '介乎 0 與 1 之間' },
      { label: 'B', text: '等於 0' },
      { label: 'C', text: '大於 1' },
      { label: 'D', text: '等於 1' }
    ],
    correctAnswer: 'B',
    explanationEn: 'Calculate quantity at each price: Q = TR / P.\nAt P = 5, Q = 25/5 = 5.\nAt P = 6, Q = 30/6 = 5.\nAt P = 7, Q = 35/7 = 5.\nAt P = 8, Q = 40/8 = 5.\nQuantity demanded remains strictly constant at 5 units despite price increases. Therefore, %ΔQ = 0, which means |Ed| = 0 (Perfect Inelastic).',
    explanationZh: '計算每個價格下的需求量 Q = TR / P：\nP=5 時 Q=5；P=6 時 Q=5；P=7 時 Q=5；P=8 時 Q=5。\n不論價格如何上升，需求量完全沒有改變（ΔQ = 0），因此需求價格彈性等於 0（完全無彈性）。',
    keyTakeawayEn: 'If Total Expenditure increases by the EXACT SAME proportion as price, Quantity is constant ⟹ Ed = 0.',
    keyTakeawayZh: '若總開支隨價格同比例上升，代表數量完全沒有改變 ⟹ Ed = 0（完全無彈性）。'
  },
  {
    id: 'dse-2016-q15',
    year: 2016,
    paperNumber: 'Paper 1',
    questionNumber: 'Q15',
    topic: 'Factors-Es',
    difficulty: 'Level 4',
    questionEn: 'A decrease in the cost of producing Good X results in a 5% and 10% change in its price and quantity transacted respectively. Which of the following best explains the above changes?',
    questionZh: '生產物品 X 的成本下降，導致其價格與交易量分別出現 5% 及 10% 的變動。下列哪項最能解釋上述變動？',
    optionsEn: [
      { label: 'A', text: 'Good X is a durable good.' },
      { label: 'B', text: 'There are no close substitutes for Good X.' },
      { label: 'C', text: 'Firms producing Good X have excess capacity in production.' },
      { label: 'D', text: 'The factors of production for Good X are not easily available.' }
    ],
    optionsZh: [
      { label: 'A', text: '物品 X 是耐用品。' },
      { label: 'B', text: '物品 X 沒有相近替代品。' },
      { label: 'C', text: '生產物品 X 的廠商擁有過剩生產能力。' },
      { label: 'D', text: '生產物品 X 所需的生產要素不易獲取。' }
    ],
    correctAnswer: 'A',
    explanationEn: 'Production cost falls ⟹ Supply increases (shifts right). Market price falls by 5% and quantity increases by 10%. Here, we are observing a movement along the DEMAND curve! Since %ΔQd (10%) > %ΔP (5%), demand for Good X is ELASTIC (|Ed| = 10%/5% = 2 > 1). Durable goods have elastic demand because consumers can readily alter the timing of purchases.',
    explanationZh: '成本下降 ⟹ 供給增加（右移）。在市場中價格下跌 5%，交易量上升 10%。這是在「需求曲線上的點移動」！由於 %ΔQd (10%) > %ΔP (5%)，代表需求富於彈性（|Ed| = 2 > 1）。耐用品（Durable goods）因可隨時延期或提早購買，其需求彈性較高。',
    keyTakeawayEn: 'When Supply shifts, we move along the Demand curve: %ΔQ > %ΔP means Demand is elastic.',
    keyTakeawayZh: '供給移動時，是沿著需求曲線滑動：%ΔQ > %ΔP 代表需求富於彈性。'
  },
  {
    id: 'dse-2017-q15',
    year: 2017,
    paperNumber: 'Paper 1',
    questionNumber: 'Q15',
    topic: 'Ed',
    difficulty: 'Level 3',
    questionEn: 'Refer to the following conversation:\nMandy: "I like coffee very much! No matter how its price changes, I always buy the same amount of coffee every week!"\nShirley: "I like coffee very much too! No matter how its price changes, I always spend the same amount of money on coffee every week!"\nBased on their conversation, Mandy\'s demand for coffee is _________ and Shirley\'s demand for coffee is __________.',
    questionZh: '參考以下對話：\nMandy：「我非常喜歡咖啡！無論價格如何變動，我每星期都買相同數量的咖啡！」\nShirley：「我也很喜歡咖啡！無論價格如何變動，我每星期都花相同金額在咖啡上！」\n根據對話，Mandy 對咖啡的需求是 _________，而 Shirley 對咖啡的需求是 __________。',
    optionsEn: [
      { label: 'A', text: 'perfectly inelastic … perfectly inelastic' },
      { label: 'B', text: 'perfectly inelastic … unitarily elastic' },
      { label: 'C', text: 'unitarily elastic … perfectly inelastic' },
      { label: 'D', text: 'unitarily elastic … unitarily elastic' }
    ],
    optionsZh: [
      { label: 'A', text: '完全無彈性 … 完全無彈性' },
      { label: 'B', text: '完全無彈性 … 單一彈性' },
      { label: 'C', text: '單一彈性 … 完全無彈性' },
      { label: 'D', text: '單一彈性 … 單一彈性' }
    ],
    correctAnswer: 'B',
    explanationEn: 'Mandy buys the same quantity regardless of price ⟹ %ΔQd = 0 ⟹ Perfectly Inelastic (Ed = 0).\nShirley spends the same total expenditure (P × Q) regardless of price ⟹ %ΔQd = %ΔP ⟹ Unitarily Elastic (Ed = 1).',
    explanationZh: 'Mandy 購買固定數量 ⟹ 需求量不隨價格改變（%ΔQ = 0）⟹ 完全無彈性（Ed = 0）。\nShirley 花費固定總開支 ⟹ %ΔQ = %ΔP ⟹ 單一彈性（Ed = 1）。',
    keyTakeawayEn: 'Same quantity = Perfectly Inelastic (0); Same money spent = Unitarily Elastic (1).',
    keyTakeawayZh: '買相同數量 = 完全無彈性；花相同金額 = 單一彈性。'
  },
  {
    id: 'dse-2018-q17',
    year: 2018,
    paperNumber: 'Paper 1',
    questionNumber: 'Q17',
    topic: 'TR',
    difficulty: 'Level 4',
    questionEn: 'The original price of Sausage McMuffin with Egg was $11 each. McDonald\'s introduced a limited-time big discount: "$10 for 2 Sausage McMuffins with Egg". As a result, more people bought Sausage McMuffins during the promotion. Which of the following statements is correct?',
    questionZh: '煙肉蛋漢堡原價每個 $11。麥當勞推出限時優惠：「$10 買 2 個煙肉蛋漢堡」。結果更多人在推廣期間購買。下列哪項陳述正確？',
    optionsEn: [
      { label: 'A', text: 'McDonald\'s was not maximising profit during the promotion period.' },
      { label: 'B', text: 'The demand for Sausage McMuffin with Egg would be higher during the promotion period.' },
      { label: 'C', text: 'The total expenditure of consumers on Sausage McMuffin with Egg would increase if the demand was elastic.' },
      { label: 'D', text: 'There would be a temporary shortage of the food ingredients for making Sausage McMuffins.' }
    ],
    optionsZh: [
      { label: 'A', text: '麥當勞在推廣期間並非爭取最大利潤。' },
      { label: 'B', text: '煙肉蛋漢堡的需求在推廣期間會較高。' },
      { label: 'C', text: '若需求富於彈性，消費者對煙肉蛋漢堡的總開支會增加。' },
      { label: 'D', text: '製作煙肉蛋漢堡的食材會出現暫時性短缺。' }
    ],
    correctAnswer: 'C',
    explanationEn: 'Price dropped from $11 to $5 each (54.5% cut). Movement along the same demand curve increases quantity demanded. If demand is elastic (|Ed| > 1), the % increase in Qd exceeds the % price cut, leading to a net gain in total revenue (Total Expenditure rises). Note: Option B is wrong because it is a change in "quantity demanded" (movement along curve), NOT a change in "demand" (shift of curve).',
    explanationZh: '單價由 $11 降至每個 $5。沿同一需求曲線移動導致需求量上升。若需求富於彈性（|Ed| > 1），數量上升的百分比大於價格下跌的百分比，消費者總開支（即廠商總收益）會增加。注意：選項 B 錯誤，因價格下降只引起「需求量」增加（沿線移動），而非「需求」增加（整條曲線右移）。',
    keyTakeawayEn: 'Price Cut + Elastic Demand ⟹ Total Expenditure / Revenue Increases.',
    keyTakeawayZh: '減價 + 需求富於彈性 ⟹ 總開支／總收益上升。'
  },
  {
    id: 'dse-2019-q11',
    year: 2019,
    paperNumber: 'Paper 1',
    questionNumber: 'Q11',
    topic: 'Es',
    difficulty: 'Level 4',
    questionEn: 'News: "Dengue fever scare has hit HK after 19 local infections... transmitted by Aedes albopictus mosquitoes."\nSuppose the price and quantity of mosquito repellents sold in HK changed by 5% and 120% respectively shortly after the release of the news. This indicates that during that period, there was an:',
    questionZh: '新聞：「香港錄得 19 宗本地登革熱個案，由白紋伊蚊傳播引發恐慌。」\n假設消息公佈後不久，香港蚊怕水的價格和交易量分別變動了 5% 和 120%。這顯示在該期間及價格範圍內，香港蚊怕水具有：',
    optionsEn: [
      { label: 'A', text: 'elastic supply of' },
      { label: 'B', text: 'inelastic supply of' },
      { label: 'C', text: 'elastic demand for' },
      { label: 'D', text: 'inelastic demand for' }
    ],
    optionsZh: [
      { label: 'A', text: '富於彈性的供給' },
      { label: 'B', text: '缺乏彈性的供給' },
      { label: 'C', text: '富於彈性的需求' },
      { label: 'D', text: '缺乏彈性的需求' }
    ],
    correctAnswer: 'A',
    explanationEn: 'The mosquito scare caused a rightward shift of DEMAND. As demand shifted right, the market moved along the SUPPLY curve. Price rose by 5% and quantity supplied increased by 120%. Price elasticity of supply Es = %ΔQs / %ΔP = 120% / 5% = 24 > 1. Hence, the supply is elastic.',
    explanationZh: '登革熱恐慌導致蚊怕水的「需求增加（右移）」。市場沿著「供給曲線」向上移動。價格上升 5%，供給量增加 120%。供給價格彈性 Es = 120% / 5% = 24 > 1，因此供給富於彈性（Elastic supply）。',
    keyTakeawayEn: 'When Demand shifts, movement is along the Supply curve: %ΔQ / %ΔP measures Elasticity of Supply.',
    keyTakeawayZh: '需求曲線移動時，市場沿供給曲線滑動：%ΔQ / %ΔP 衡量的是「供給價格彈性」。'
  },
  {
    id: 'dse-2020-q11',
    year: 2020,
    paperNumber: 'Paper 1',
    questionNumber: 'Q11',
    topic: 'Ed',
    difficulty: 'Level 3',
    questionEn: 'When the price of Australia\'s red wine decreases from $70 to $50, the quantity demanded increases from 100 units to 122 units. What is the arc elasticity of demand for Australia\'s red wine within the above price range?',
    questionZh: '當澳洲紅酒價格由 $70 下跌至 $50 時，需求量由 100 單位增加至 122 單位。在上述價格範圍內，澳洲紅酒的弧需求價格彈性是多少？',
    optionsEn: [
      { label: 'A', text: '0.59' },
      { label: 'B', text: '0.77' },
      { label: 'C', text: '1.30' },
      { label: 'D', text: '1.68' }
    ],
    optionsZh: [
      { label: 'A', text: '0.59' },
      { label: 'B', text: '0.77' },
      { label: 'C', text: '1.30' },
      { label: 'D', text: '1.68' }
    ],
    correctAnswer: 'A',
    explanationEn: 'Apply the HKDSE Arc Elasticity formula (Average Price & Quantity Method):\n%ΔQ = (122 - 100) / ((100 + 122) / 2) = 22 / 111 ≈ 19.82%\n%ΔP = |50 - 70| / ((70 + 50) / 2) = 20 / 60 ≈ 33.33%\nArc Ed = 19.82% / 33.33% = (22/111) / (20/60) = (22 × 60) / (111 × 20) = 1320 / 2220 ≈ 0.5946 ≈ 0.59.',
    explanationZh: '應用 HKDSE 官方弧彈性公式（平均價格與數量法）：\n數量百分比變動 = (122 - 100) / 111 = 22 / 111 ≈ 19.82%\n價格百分比變動 = (70 - 50) / 60 = 20 / 60 ≈ 33.33%\n弧彈性 Ed = (22/111) ÷ (20/60) = 0.5946 ≈ 0.59。',
    keyTakeawayEn: 'Arc Ed = | (ΔQ / ΔP) × (P1 + P2) / (Q1 + Q2) | = (22 / 20) × (120 / 222) = 0.59.',
    keyTakeawayZh: '弧彈性公式 = (ΔQ / ΔP) × (P1 + P2) / (Q1 + Q2) = (22 / 20) × (120 / 222) ≈ 0.59。'
  },
  {
    id: 'dse-2021-q18',
    year: 2021,
    paperNumber: 'Paper 1',
    questionNumber: 'Q18',
    topic: 'Ed',
    difficulty: 'Level 4',
    questionEn: 'News: "In order to reduce pollution, the government imposes a production tax on all kinds of motor vehicles (except electric vehicles)."\nAs a result, the price of gasoline changes by 22% and its quantity transacted changes by 35%. Which of the following statements is correct?',
    questionZh: '新聞：「為減少污染，政府對所有種類的汽車（電動車除外）徵收生產稅。」\n結果，汽油價格變動了 22%，交易量變動了 35%。下列哪項陳述正確？',
    optionsEn: [
      { label: 'A', text: 'The demand for gasoline is elastic.' },
      { label: 'B', text: 'The demand for gasoline is inelastic.' },
      { label: 'C', text: 'The supply of gasoline is elastic.' },
      { label: 'D', text: 'The supply of gasoline is inelastic.' }
    ],
    optionsZh: [
      { label: 'A', text: '汽油的需求富於彈性。' },
      { label: 'B', text: '汽油的需求缺乏彈性。' },
      { label: 'C', text: '汽油的供給富於彈性。' },
      { label: 'D', text: '汽油的供給缺乏彈性。' }
    ],
    correctAnswer: 'C',
    explanationEn: 'Tax on petrol vehicles reduces vehicle ownership, causing a LEFTWARD shift in DEMAND for gasoline (complements). As demand for gasoline shifts left, we move along gasoline\'s SUPPLY curve! Price of gasoline falls by 22% and quantity supplied drops by 35%. Elasticity of Supply Es = %ΔQs / %ΔP = 35% / 22% = 1.59 > 1 (Supply is elastic).',
    explanationZh: '對汽油車徵稅使汽油車數量減少，汽油作為互補品，其「需求減少（左移）」。市場沿著汽油的「供給曲線」向下移動。汽油價格下跌 22%，數量減少 35%。此時沿供給曲線移動，供給價格彈性 Es = 35% / 22% = 1.59 > 1，故汽油的供給富於彈性。',
    keyTakeawayEn: 'Tax on vehicle ⟹ Gasoline demand shifts left ⟹ Movement along gasoline Supply curve ⟹ %ΔQ / %ΔP = 35/22 > 1 (Supply is elastic).',
    keyTakeawayZh: '互補品需求移動 ⟹ 沿汽油供給曲線滑動 ⟹ %ΔQ / %ΔP > 1 顯示供給富於彈性。'
  },
  {
    id: 'dse-2022-q12',
    year: 2022,
    paperNumber: 'Paper 1',
    questionNumber: 'Q12',
    topic: 'TR',
    difficulty: 'Level 4',
    questionEn: 'The table below shows the total expenditure of Mary and Peter on soft drinks:\nUnit Price ($): 1, 2, 3, 4\nMary\'s Total Expenditure ($): 20, 40, 60, 80\nPeter\'s Total Expenditure ($): 60, 60, 60, 60\nMary\'s elasticity of demand for soft drinks is __________ while Peter\'s elasticity of demand for soft drinks is __________ (without regard to negative sign).',
    questionZh: '下表顯示 Mary 和 Peter 在汽水上的總開支：\n單價 ($)：1, 2, 3, 4\nMary 總開支 ($)：20, 40, 60, 80\nPeter 總開支 ($)：60, 60, 60, 60\nMary 對汽水的需求彈性是 __________，而 Peter 對汽水的需求彈性是 __________（不考慮負號）。',
    tableData: {
      headersEn: ['Price ($)', 'Mary TR ($)', 'Mary Q (TR/P)', 'Peter TR ($)', 'Peter Q (TR/P)'],
      headersZh: ['價格 ($)', 'Mary 總開支 ($)', 'Mary 數量', 'Peter 總開支 ($)', 'Peter 數量'],
      rows: [
        [1, 20, '20 / 1 = 20', 60, '60 / 1 = 60'],
        [2, 40, '40 / 2 = 20', 60, '60 / 2 = 30'],
        [3, 60, '60 / 3 = 20', 60, '60 / 3 = 20'],
        [4, 80, '80 / 4 = 20', 60, '60 / 4 = 15']
      ]
    },
    optionsEn: [
      { label: 'A', text: 'between zero and one … equal to zero' },
      { label: 'B', text: 'between zero and one … equal to one' },
      { label: 'C', text: 'equal to zero … equal to zero' },
      { label: 'D', text: 'equal to zero … equal to one' }
    ],
    optionsZh: [
      { label: 'A', text: '介乎 0 與 1 之間 … 等於 0' },
      { label: 'B', text: '介乎 0 與 1 之間 … 等於 1' },
      { label: 'C', text: '等於 0 … 等於 0' },
      { label: 'D', text: '等於 0 … 等於 1' }
    ],
    correctAnswer: 'D',
    explanationEn: 'For Mary: At all prices, quantity demanded Q = TR/P = 20 units (constant). %ΔQ = 0 ⟹ Ed = 0 (equal to zero).\nFor Peter: Total expenditure is constant at $60 at all prices. P × Q = 60 ⟹ %ΔQ = %ΔP ⟹ Ed = 1 (equal to one).',
    explanationZh: 'Mary：在各價格下需求量皆為 20 罐（固定），%ΔQ = 0 ⟹ 彈性等於 0（完全無彈性）。\nPeter：在各價格下總開支皆固定為 $60，%ΔQ = %ΔP ⟹ 彈性等於 1（單一彈性）。',
    keyTakeawayEn: 'Mary: Q is constant ⟹ Ed = 0. Peter: P × Q is constant ⟹ Ed = 1.',
    keyTakeawayZh: 'Mary 數量固定 ⟹ Ed = 0；Peter 開支固定 ⟹ Ed = 1。'
  },
  {
    id: 'dse-2023-q13',
    year: 2023,
    paperNumber: 'Paper 1',
    questionNumber: 'Q13',
    topic: 'Factors-Ed',
    difficulty: 'Level 5',
    questionEn: 'Semiconductor chips are key components for producing smartphones. Due to a global shortage of semiconductor chips, the quantity of smartphones sold has changed by 10% whereas the price of smartphones has increased by 20%. Which of the following best explains the above changes in price and quantity sold?',
    questionZh: '半導體晶片是生產智能手機的關鍵零件。由於全球晶片短缺，智能手機的銷量變動了 10%，而價格上升了 20%。下列哪項最能解釋上述價格與數量的變動？',
    optionsEn: [
      { label: 'A', text: 'Smartphones have no close substitutes.' },
      { label: 'B', text: 'Smartphone manufacturers have excess capacity in production.' },
      { label: 'C', text: 'Consumers\' expenditure on smartphones takes up a large proportion of their total expenditure.' },
      { label: 'D', text: 'The workers for producing smartphones cannot be easily recruited.' }
    ],
    optionsZh: [
      { label: 'A', text: '智能手機沒有相近替代品。' },
      { label: 'B', text: '智能手機製造商擁有過剩生產能力。' },
      { label: 'C', text: '消費者在智能手機上的開支佔其總開支很大比重。' },
      { label: 'D', text: '生產智能手機的工人不易招聘。' }
    ],
    correctAnswer: 'A',
    explanationEn: 'Chip shortage causes a supply decrease (leftward shift of Supply). We move along the DEMAND curve: price rises by 20%, quantity falls by 10%. |Ed| = 10% / 20% = 0.5 < 1 (Demand is inelastic). Demand is inelastic because modern smartphones have become an indispensable daily tool with no close substitutes for communication and payment.',
    explanationZh: '晶片短缺導致供給減少（左移），市場沿「需求曲線」向上移動：價格上升 20%，數量下跌 10%。|Ed| = 10% / 20% = 0.5 < 1（需求缺乏彈性）。智能手機已成為日常生活必需品，沒有相近替代品（No close substitutes），因而需求缺乏彈性。',
    keyTakeawayEn: '%ΔQ (10%) < %ΔP (20%) ⟹ Inelastic Demand (|Ed| < 1) ⟹ Explained by Lack of close substitutes.',
    keyTakeawayZh: '%ΔQ (10%) < %ΔP (20%) ⟹ 需求缺乏彈性 ⟹ 原因為缺乏相近替代品。'
  },
  {
    id: 'dse-2024-q14',
    year: 2024,
    paperNumber: 'Paper 1',
    questionNumber: 'Q14',
    topic: 'Straight-Line',
    difficulty: 'Level 5**',
    questionEn: 'Suppose the demand curve of face masks is a downward-sloping straight line. When the price of face masks falls from $5 to $4, consumers\' total expenditure on face masks remains unchanged. If the price of face masks falls further from $4 to $3, consumers\' total expenditure on face masks:',
    questionZh: '假設口罩的需求曲線是一條向下傾斜的直線。當口罩價格由 $5 下跌至 $4 時，消費者在口罩上的總開支維持不變。若價格進一步由 $4 下跌至 $3，消費者在口罩上的總開支將會：',
    optionsEn: [
      { label: 'A', text: 'will increase.' },
      { label: 'B', text: 'will decrease.' },
      { label: 'C', text: 'will remain unchanged.' },
      { label: 'D', text: 'may increase, decrease or remain unchanged.' }
    ],
    optionsZh: [
      { label: 'A', text: '增加。' },
      { label: 'B', text: '減少。' },
      { label: 'C', text: '維持不變。' },
      { label: 'D', text: '可能增加、減少或維持不變。' }
    ],
    correctAnswer: 'B',
    explanationEn: 'On a straight-line demand curve, elasticity decreases monotonically as price falls. Since total expenditure was unchanged between $5 and $4, this range is centered around the unitary elasticity midpoint (|Ed| = 1). As price falls further to $4 → $3, we enter the LOWER INELASTIC segment (|Ed| < 1). In the inelastic region, a price cut causes total expenditure to DECREASE (%ΔQd < %ΔP).',
    explanationZh: '在直線需求曲線上，價格越低，彈性越小。在 $5 至 $4 區間總開支不變，代表該區間處於中點單一彈性位置（|Ed| = 1）。當價格進一步由 $4 跌至 $3 時，已進入曲線下半段的「缺乏彈性區域」（|Ed| < 1）。在缺乏彈性區間，價格下跌會導致總開支減少。',
    keyTakeawayEn: 'Straight-line Demand: Elastic (top) → Unitary (midpoint, TR max) → Inelastic (bottom, price cut reduces TR).',
    keyTakeawayZh: '直線需求曲線：上半段富於彈性 → 中點單一彈性（TR 最大） → 下半段缺乏彈性（減價令 TR 下降）。'
  },
  {
    id: 'dse-2024-q13',
    year: 2024,
    paperNumber: 'Paper 1',
    questionNumber: 'Q13',
    topic: 'Ed',
    difficulty: 'Level 4',
    questionEn: 'Suppose the government of an economy subsidises the manufacturing of air purifiers. As a result, the price of air purifiers decreases from $1200 to $1000 and the quantity transacted increases from 5 000 to 8 000 units. This indicates that within the price range, the price elasticity (in absolute value) of __________ is __________.',
    questionZh: '假設某經濟體政府資助空氣清新機的生產。結果，空氣清新機的價格由 $1200 下跌至 $1000，交易量由 5 000 單位增加至 8 000 單位。這顯示在該價格範圍內，（絕對值）__________ 的價格彈性是 __________。',
    optionsEn: [
      { label: 'A', text: 'demand … greater than 1' },
      { label: 'B', text: 'demand … smaller than 1' },
      { label: 'C', text: 'supply … greater than 1' },
      { label: 'D', text: 'supply … smaller than 1' }
    ],
    optionsZh: [
      { label: 'A', text: '需求 … 大於 1' },
      { label: 'B', text: '需求 … 小於 1' },
      { label: 'C', text: '供給 … 大於 1' },
      { label: 'D', text: '供給 … 小於 1' }
    ],
    correctAnswer: 'A',
    explanationEn: 'Production subsidy shifts SUPPLY rightward, causing movement along the DEMAND curve. Arc %ΔP = (1200-1000)/1100 = 200/1100 ≈ 18.18%. Arc %ΔQd = (8000-5000)/6500 = 3000/6500 ≈ 46.15%. Since %ΔQd (46.15%) > %ΔP (18.18%), Arc Ed = 46.15% / 18.18% ≈ 2.54 > 1. Therefore, price elasticity of DEMAND is greater than 1.',
    explanationZh: '生產補貼導致供給增加（右移），市場沿著「需求曲線」向下滑動。價格由 $1200 降至 $1000（弧變動約 18.2%），數量由 5000 增至 8000（弧變動約 46.2%）。由於 %ΔQd > %ΔP，需求價格彈性 |Ed| ≈ 2.54 > 1，故「需求價格彈性大於 1」。',
    keyTakeawayEn: 'Subsidy shifts supply ⟹ Movement along demand curve ⟹ %ΔQ > %ΔP ⟹ Elastic Demand (|Ed| > 1).',
    keyTakeawayZh: '補貼令供給右移 ⟹ 沿需求曲線移動 ⟹ %ΔQ > %ΔP ⟹ 需求富於彈性（大於 1）。'
  },
  {
    id: 'dse-2025-q15',
    year: 2025,
    paperNumber: 'Paper 1',
    questionNumber: 'Q15',
    topic: 'Factors-Ed',
    difficulty: 'Level 4',
    questionEn: 'Which of the following will lower Hong Kong households\' price elasticity of demand for foreign domestic helpers?',
    questionZh: '下列哪項會降低香港家庭對外籍家庭傭工的需求價格彈性？',
    optionsEn: [
      { label: 'A', text: 'More Hong Kong people are trained to work as part-time domestic helpers.' },
      { label: 'B', text: 'Fewer child care centres are provided in Hong Kong for parents who both work.' },
      { label: 'C', text: 'The Hong Kong Government reduces the quota of foreign domestic helpers.' },
      { label: 'D', text: 'The wage rate of foreign domestic helpers in Hong Kong increases.' }
    ],
    optionsZh: [
      { label: 'A', text: '更多香港人接受培訓成為兼職家務助理。' },
      { label: 'B', text: '香港為雙職父母提供的幼兒託管中心減少。' },
      { label: 'C', text: '香港政府削減外籍家庭傭工的配額。' },
      { label: 'D', text: '香港外籍家庭傭工的工資率上升。' }
    ],
    correctAnswer: 'B',
    explanationEn: 'Childcare centres and foreign domestic helpers are substitutes for childminding in dual-income families. When fewer childcare centres are available, families have FEWER substitutes for domestic helpers. Fewer substitutes reduces the price elasticity of demand (|Ed| decreases).',
    explanationZh: '幼兒託管中心與外傭為雙職家庭照顧幼兒的替代品。幼兒中心減少意味著替代品減少，使雙職家長對外傭的依賴加深，需求價格彈性因而降低（變得更缺乏彈性）。',
    keyTakeawayEn: 'Reduction in substitute services available ⟹ Lower Price Elasticity of Demand.',
    keyTakeawayZh: '替代服務供應減少 ⟹ 需求價格彈性下降。'
  }
];

export const dseStructuredQuestions: StructuredQuestion[] = [
  {
    id: 'dse-2013-b9',
    year: 2013,
    questionRef: 'Paper 2 Section B Q9(a)',
    marks: 5,
    titleEn: 'MTR Fare Adjustment and Total Expenditure',
    titleZh: '港鐵票價調整與乘客總開支',
    scenarioEn: 'The MTR Corporation raised railway fares by 5.4% based on the Fare Adjustment Mechanism. To respond to public discontent, the Corporation introduced a concessionary measure "Ride 10 Get 1 Free".',
    scenarioZh: '港鐵公司根據可加可減機制調高鐵路票價 5.4%。為回應公眾對加價的不滿，港鐵推出了「搭十送一」的特惠措施。',
    subQuestions: [
      {
        part: '(a)',
        marks: 5,
        questionEn: 'With the aid of a diagram, explain under what condition the total expenditure of passengers on the MTR will increase because of the rise in fare.',
        questionZh: '試輔以圖示，解釋在甚麼條件下，乘客在港鐵上的總開支會因加價而增加。（5分）',
        hintsEn: [
          'State the relationship between Total Expenditure (TE) and Total Revenue (TR).',
          'Identify whether demand is elastic, inelastic, or unitary.',
          'Compare the gain in revenue from price rise with the loss in revenue from quantity fall.',
          'Draw movement along the same downward-sloping demand curve.'
        ],
        hintsZh: [
          '指出乘客總開支（TE）即等於港鐵公司的總收益（TR = P × Q）。',
          '明確指出需求價格彈性的條件（缺乏彈性 Inelastic，|Ed| < 1）。',
          '比較加價帶來的收益增加（Gain）與客量減少帶來的收益損失（Loss）。',
          '圖示：繪畫同一條向下傾斜需求曲線上的點移動。'
        ],
        modelAnswerEn: 'Condition:\nTotal expenditure of passengers on the MTR will increase if the demand for MTR service is INELASTIC (|Ed| < 1).\n\nEconomic Explanation:\n1. Total expenditure of passengers = Price (P) × Quantity of passenger trips (Q).\n2. When fare increases from P1 to P2, there is a movement upwards along the SAME demand curve, causing quantity demanded to fall from Q1 to Q2.\n3. Since demand is inelastic, the percentage increase in fare (%ΔP) is greater than the percentage decrease in passenger trips (%ΔQ).\n4. Thus, the gain in revenue from the higher fare (Area P1P2BA) is GREATER than the loss in revenue from fewer passenger trips (Area Q2Q1AC).\n5. Consequently, total expenditure of passengers (and MTR\'s total revenue) will increase.',
        modelAnswerZh: '條件：\n當乘客對港鐵服務的需求【缺乏彈性】（Inelastic demand, |Ed| < 1）時，乘客的總開支便會增加。\n\n經濟學分析步驟：\n1. 乘客總開支 = 票價 (P) × 乘客人次 (Q)。\n2. 票價由 P1 上升至 P2 時，市場沿【同一條需求曲線】向上移動，乘客人次由 Q1 下跌至 Q2。\n3. 由於需求缺乏彈性，票價上升的百分比（%ΔP）大於乘客人次下降的百分比（%ΔQ）。\n4. 因此，因加價而【增加的收益面積】（Gain）大於因客量減少而【損失的收益面積】（Loss）。\n5. 最終結果：乘客總開支（即港鐵總收益）必然增加。',
        rubricCriteria: [
          {
            criterionEn: 'Correct diagram showing movement along the SAME demand curve with correct labels (P1, P2, Q1, Q2, shaded Gain & Loss areas)',
            criterionZh: '正確繪製圖示：標註軸線、同一條需求曲線、P1/P2/Q1/Q2 及加價收益增益區與損失區',
            mark: 2,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Stating that demand for MTR services must be INELASTIC (|Ed| < 1)',
            criterionZh: '明確指出條件：對港鐵服務的需求必須為「缺乏彈性」（|Ed| < 1）',
            mark: 1,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Explaining %ΔP > %ΔQd (percentage increase in price exceeds percentage decrease in quantity)',
            criterionZh: '解釋價格上升的百分比大於數量下跌的百分比（%ΔP > %ΔQd）',
            mark: 1,
            type: 'Explanation'
          },
          {
            criterionEn: 'Stating gain in revenue from price rise > loss in revenue from quantity reduction, concluding TE rises',
            criterionZh: '說明加價之增益大於銷量減少之損失，得出總開支上升之結論',
            mark: 1,
            type: 'Conclusion'
          }
        ]
      }
    ]
  },
  {
    id: 'dse-2021-b10',
    year: 2021,
    questionRef: 'Paper 2 Section B Q10(c)',
    marks: 7,
    titleEn: 'Surgical Mask Subsidy Scheme and Consumer Expenditure',
    titleZh: '外科口罩生產資助計劃與消費者總開支',
    scenarioEn: 'To stabilise the supply of surgical masks in Hong Kong, the Government launched the "Local Mask Production Subsidy Scheme", providing a per-unit subsidy to local mask producers.',
    scenarioZh: '為穩定香港外科口罩的供應，政府推出了「本地口罩生產資助計劃」，向本地口罩生產商提供每單位補貼。',
    subQuestions: [
      {
        part: '(c)',
        marks: 7,
        questionEn: 'With the aid of a diagram, explain under what condition the total expenditure of consumers on surgical masks will DECREASE because of the subsidy. (For simplicity, the subsidy is assumed to be a per-unit one.)',
        questionZh: '試輔以圖示，解釋在甚麼條件下，消費者在外科口罩上的總開支會因補貼而「減少」。（假設補貼為從量補貼）（7分）',
        hintsEn: [
          'How does a production subsidy affect the supply curve? (Supply shifts right/downward).',
          'What happens to market price and quantity along the demand curve? (P falls, Q rises).',
          'When does a price drop lead to a DECREASE in total expenditure? (When demand is INELASTIC).',
          'Illustrate the Gain area vs Loss area on the demand curve diagram.'
        ],
        hintsZh: [
          '生產補貼如何影響供給？（供給增加，S 右移／下移）。',
          '沿需求曲線移動時價格和數量如何變動？（價格 P 下跌，需求量 Q 增加）。',
          '在甚麼情況下減價會導致總開支「減少」？（當需求「缺乏彈性」Inelastic 時）。',
          '在圖上標註減價的損失面積（Loss）與增銷的增益面積（Gain），並比較兩者大小。'
        ],
        modelAnswerEn: 'Condition:\nConsumers\' total expenditure on surgical masks will decrease if the demand for surgical masks is INELASTIC (|Ed| < 1).\n\nEconomic Explanation:\n1. The unit subsidy lowers production cost, shifting the supply curve rightwards/downwards from S1 to S2.\n2. The equilibrium moves downward along the SAME demand curve: market price falls from P1 to P2, and equilibrium quantity increases from Q1 to Q2.\n3. Since demand is inelastic (|Ed| < 1), the percentage decrease in price (%ΔP) is greater than the percentage increase in quantity demanded (%ΔQ).\n4. The loss in expenditure from the lower price per unit (Area P1P2E2A) is LARGER than the gain in expenditure from buying more units (Area Q1Q2E2B).\n5. Therefore, consumers\' total expenditure on masks will decrease.',
        modelAnswerZh: '條件：\n當消費者對外科口罩的需求【缺乏彈性】（Inelastic demand, |Ed| < 1）時，消費者總開支會減少。\n\n經濟學分析步驟：\n1. 每單位生產補貼降低邊際成本，供給曲線由 S1 向右／向下平移至 S2。\n2. 市場沿著【同一條需求曲線】向下滑動：口罩市價由 P1 下跌至 P2，交易量由 Q1 增加至 Q2。\n3. 由於需求缺乏彈性（|Ed| < 1），價格下跌的百分比（%ΔP）大於需求量增加的百分比（%ΔQ）。\n4. 因價格下降而【損失的開支面積】（Loss）大於因購買量增加而【獲得的開支面積】（Gain）。\n5. 結論：消費者在外科口罩上的總開支（P × Q）必然減少。',
        rubricCriteria: [
          {
            criterionEn: 'Correct supply-demand diagram showing rightward shift of Supply curve (S1 to S2) and downward movement along the SAME Demand curve with correct equilibrium points (P1, P2, Q1, Q2)',
            criterionZh: '正確繪圖：S1 右移至 S2，沿同一需求曲線移動，標明新舊價格及數量',
            mark: 3,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Stating the condition: Demand for surgical masks is INELASTIC (|Ed| < 1)',
            criterionZh: '明確指出條件：口罩需求必須為「缺乏彈性」（|Ed| < 1）',
            mark: 1,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Explaining that price decreases from P1 to P2 while quantity increases from Q1 to Q2',
            criterionZh: '指出市價由 P1 下跌至 P2，數量由 Q1 增加至 Q2',
            mark: 1,
            type: 'Explanation'
          },
          {
            criterionEn: 'Comparing %ΔP > %ΔQd: percentage decrease in price is larger than percentage increase in quantity demanded',
            criterionZh: '分析 %ΔP > %ΔQd：降價幅度百分比大於銷量增加百分比',
            mark: 1,
            type: 'Explanation'
          },
          {
            criterionEn: 'Explaining loss in revenue from price drop > gain from quantity increase, confirming total expenditure decreases',
            criterionZh: '說明降價之損失大於增量之增益，得出總開支減少之結論',
            mark: 1,
            type: 'Conclusion'
          }
        ]
      }
    ]
  },
  {
    id: 'dse-2025-b11',
    year: 2025,
    questionRef: 'Paper 2 Section B Q11(b)',
    marks: 6,
    titleEn: 'Public Rental Housing Rent Hike & Total Rental Payment',
    titleZh: '公屋加租與租戶總租金支出',
    scenarioEn: 'The Government decided to raise the monthly rental of public rental housing (PRH) units by 10%. A politician commented: "We expect that the increase in monthly rental by 10% would raise PRH tenants\' total rental payment by 10%."',
    scenarioZh: '政府決定將公屋單位的每月租金調高 10%。一名政客評論道：「我們預期每月租金增加 10% 將會令公屋租戶的總租金支出增加 10%。」',
    subQuestions: [
      {
        part: '(b)',
        marks: 6,
        questionEn: 'With the aid of a supply-demand diagram showing shortage/waiting time, explain under what condition(s) the politician\'s comment about PRH tenants\' total rental payment is correct.',
        questionZh: '試輔以供求圖示（顯示短缺／輪候時間），解釋在甚麼條件下，政客關於公屋租戶總租金支出的評論是正確的。（6分）',
        hintsEn: [
          'If price rises by 10% and total payment rises by exactly 10%, what must happen to quantity transacted?',
          'Quantity transacted must remain UNCHANGED (%ΔQ = 0).',
          'Explain why quantity transacted remains unchanged (e.g. price is still below equilibrium resulting in excess demand/shortage, or demand is perfectly inelastic).',
          'Draw the price ceiling / controlled rent below equilibrium with shortage.'
        ],
        hintsZh: [
          '若租金上升 10% 同時總租金支出亦剛好上升 10%，租住的公屋數量必須如何？',
          '租出數量必須「完全不變」（%ΔQ = 0）。',
          '解釋數量不變的條件：加租後租金仍低於均衡租金（仍存在超額需求／短缺），或需求完全無彈性（Ed = 0）。',
          '繪圖顯示租金管制低於均衡點時的短缺及交易量。'
        ],
        modelAnswerEn: 'Condition:\nThe politician\'s comment is correct if the quantity of PRH units rented by tenants REMAINS UNCHANGED (%ΔQ = 0).\nThis occurs when:\n1. The new rent is STILL BELOW the market equilibrium rent, such that excess demand (shortage/waiting list) persists and all existing PRH units remain fully occupied; OR\n2. The demand for PRH units is PERFECTLY INELASTIC (|Ed| = 0).\n\nEconomic Analysis:\nTotal Rental Payment = Rent (P) × Number of units occupied (Q).\nIf Q remains constant when P increases by 10%, %ΔTotal Payment = %ΔP + %ΔQ = 10% + 0% = 10%.\nThus, total rental payment rises by exactly 10%.',
        modelAnswerZh: '條件：\n若公屋租戶租住的單位數量【維持不變】（%ΔQ = 0），政客的言論便是正確的。\n成立條件為：\n1. 加租後的新租金【仍然低於市場均衡租金】，市場依然存在超額需求（短缺／輪候長龍），所有公屋單位依然全部租出；或\n2. 租戶對公屋的需求屬【完全無彈性】（Perfect Inelastic, |Ed| = 0）。\n\n經濟學分析：\n總租金支出 = 單位租金 (P) × 租住數量 (Q)。\n當數量 Q 維持完全不變時，租金上升 10% 便會使總租金支出剛好上升 10%（1.10P × Q = 1.10 TR）。',
        rubricCriteria: [
          {
            criterionEn: 'Correct diagram showing controlled rent below equilibrium with shortage/excess demand and fixed supply/transaction quantity',
            criterionZh: '正確繪圖：顯示低於均衡水平的受管制租金、超額需求（短缺）及固定交易量',
            mark: 2,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Stating that quantity transacted must remain unchanged (%ΔQ = 0)',
            criterionZh: '指出關鍵條件：租住數量／交易量必須維持完全不變（%ΔQ = 0）',
            mark: 1,
            type: 'Diagram / Condition'
          },
          {
            criterionEn: 'Explaining that even after the 10% rent hike, rent remains below equilibrium price (or demand is perfectly inelastic)',
            criterionZh: '解釋原因：加租後租金仍低於市場均衡價，公屋仍供不應求（或需求完全無彈性）',
            mark: 2,
            type: 'Explanation'
          },
          {
            criterionEn: 'Formulating TR = P × Q and concluding that a 10% increase in P with constant Q leads to exactly a 10% increase in total rental payment',
            criterionZh: '以 TR = P × Q 論證：P 增加 10% 且 Q 不變，總租金支出必然精確上升 10%',
            mark: 1,
            type: 'Conclusion'
          }
        ]
      }
    ]
  }
];
