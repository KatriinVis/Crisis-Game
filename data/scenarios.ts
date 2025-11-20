
import { MetricType, Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    title: "Major Data Breach",
    description: "Hackers have stolen sensitive customer credit card data. The breach is massive and partial leaks are already appearing on the dark web.",
    category: "Cyber Security",
    choices: [
      {
        id: "c1_1",
        text: "Full Transparency Immediately",
        description: "Issue a complete public statement detailing the breach immediately. This prioritizes long-term trust over short-term panic, though it will cause stock volatility.",
        riskLevel: "High",
        narrativeOutcome: "Trust takes a hit, but honesty is respected.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c1_2",
        text: "Internal Investigation First",
        description: "Delay any announcement until the full extent of the damage is confirmed. This avoids spreading misinformation but risks leaking the story before you control the narrative.",
        riskLevel: "Medium",
        narrativeOutcome: "Delays anger some, but the info was accurate.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c1_3",
        text: "Cover Up & Pay Ransom",
        description: "Secretly pay the hackers to delete the data and deny everything. This protects the brand image now but risks catastrophic legal failure if discovered later.",
        riskLevel: "High",
        narrativeOutcome: "The secret holds for now, but morale rots.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c1_4",
        text: "Upgrade Security Systems",
        description: "Focus all resources on patching the vulnerability immediately and quietly. This secures the future but leaves current victims uninformed.",
        riskLevel: "Low",
        narrativeOutcome: "Systems are safe, but PR fallout is bad.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s2",
    title: "CEO Scandal",
    description: "Photos of the CEO engaging in illegal activities have surfaced. The board is panicking and investors are calling for heads to roll.",
    category: "PR",
    choices: [
      {
        id: "c2_1",
        text: "Fire CEO Immediately",
        description: "Terminate the CEO for cause to demonstrate zero tolerance. This creates a leadership vacuum but protects the company's ethical standing.",
        riskLevel: "Medium",
        narrativeOutcome: "Leadership vacuum creates chaos, but image recovers.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 3 }
      },
      {
        id: "c2_2",
        text: "Deny and Fight",
        description: "Claim the evidence is deepfaked or manipulated. This rallies the base if true, but will destroy credibility if proven false.",
        riskLevel: "High",
        narrativeOutcome: "The lie backfires spectacularly.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c2_3",
        text: "Temporary Leave",
        description: "Place the CEO on administrative leave pending an investigation. A safe middle ground that avoids immediate chaos but satisfies no one completely.",
        riskLevel: "Low",
        narrativeOutcome: "A safe middle ground that satisfies no one.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c2_4",
        text: "Apology Tour",
        description: "Have the CEO publicly admit to 'personal struggles' and ask for forgiveness. This attempts to humanize the error but risks looking weak.",
        riskLevel: "Medium",
        narrativeOutcome: "Some buy it, others are disgusted.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s3",
    title: "Supply Chain Collapse",
    description: "A key supplier has gone bankrupt without warning. Production will halt in 48 hours if materials aren't secured.",
    category: "Supply Chain",
    choices: [
      {
        id: "c3_1",
        text: "Rush Order from Competitor",
        description: "Pay a significant premium to source parts from a rival's supplier immediately. This saves the schedule but obliterates quarterly profit margins.",
        riskLevel: "Low",
        narrativeOutcome: "Production continues, but profits tank.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 3, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c3_2",
        text: "Pause Production",
        description: "Halt the assembly lines to vet and onboard a proper long-term partner. This ensures quality safety but stops revenue flow entirely for weeks.",
        riskLevel: "Medium",
        narrativeOutcome: "Revenue stops, but quality is maintained.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c3_3",
        text: "Acquire the Bankrupt Supplier",
        description: "Buy out the failing supplier to take direct control of the factory. A massive financial risk that grants total supply chain security if managed well.",
        riskLevel: "High",
        narrativeOutcome: "Huge financial strain, but total control secured.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: 4, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c3_4",
        text: "Use Inferior Substitutes",
        description: "Switch to lower-grade materials that are readily available. This keeps the lines moving cheaply but risks product recalls and brand damage.",
        riskLevel: "High",
        narrativeOutcome: "Product quality drops, risking recalls.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 2, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s4",
    title: "Viral Customer Complaint",
    description: "An influencer posted a video of your product injuring a pet. It has 50M views and #Boycott is trending.",
    category: "PR",
    choices: [
      {
        id: "c4_1",
        text: "Full Recall",
        description: "Voluntarily recall all units to demonstrate an abundance of caution. Extremely expensive, but often the only way to restore long-term faith.",
        riskLevel: "Low",
        narrativeOutcome: "Expensive, but restores faith.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 3 }
      },
      {
        id: "c4_2",
        text: "Blame User Error",
        description: "Release technical data showing the product was misused. This defends the product's engineering but risks appearing heartless and victim-blaming.",
        riskLevel: "High",
        narrativeOutcome: "Seen as victim blaming. PR disaster.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c4_3",
        text: "Settlement & NDA",
        description: "Quietly pay the influencer a large sum to delete the video and sign a non-disclosure agreement. Efficient, unless the payment leaks.",
        riskLevel: "Medium",
        narrativeOutcome: "Quiet for now, but leaks suggest bribery.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c4_4",
        text: "Launch Safety Campaign",
        description: "Pivot the conversation to educational content on proper usage. A slow response that hopes the news cycle moves on.",
        riskLevel: "Low",
        narrativeOutcome: "Slow response, but positive long term.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      }
    ]
  },
  {
    id: "s5",
    title: "Employee Strike",
    description: "Warehouse workers have walked out demanding 20% raises and better conditions. Distribution is paralyzed.",
    category: "HR",
    choices: [
      {
        id: "c5_1",
        text: "Meet Demands",
        description: "Agree to the 20% raise to end the strike immediately. This restores operations but sets a high precedent for future labor costs.",
        riskLevel: "Low",
        narrativeOutcome: "Workers return happy, budget is blown.",
        impacts: { [MetricType.MORALE]: 3, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 2, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c5_2",
        text: "Hire Scabs",
        description: "Bring in temporary workers to bypass the union. This breaks the strike's leverage but typically leads to violence and severe reputational damage.",
        riskLevel: "High",
        narrativeOutcome: "Violence on picket lines, image tanks.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c5_3",
        text: "Negotiate Hard",
        description: "Offer a modest 5% raise and some perks. This prolongs the strike and supply chain pain but keeps long-term costs manageable.",
        riskLevel: "Medium",
        narrativeOutcome: "Strike drags on, supply chain suffers.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c5_4",
        text: "Automate Warehouse",
        description: "Announce a strategic shift to robotics to replace striking workers. A ruthless move that kills the strike via fear but destroys company morale.",
        riskLevel: "High",
        narrativeOutcome: "Strike ends in fear, morale destroyed.",
        impacts: { [MetricType.MORALE]: -4, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 3, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s6",
    title: "Ransomware Attack",
    description: "All internal servers are encrypted. Hackers demand $10M in Bitcoin within 24 hours to release the keys.",
    category: "Cyber Security",
    choices: [
      {
        id: "c6_1",
        text: "Pay the Ransom",
        description: "Transfer the $10M immediately. It's the fastest way to resume operations, but it funds criminals and marks you as an easy target.",
        riskLevel: "Medium",
        narrativeOutcome: "Keys work, but you funded criminals.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c6_2",
        text: "Restore from Backups",
        description: "Wipe the servers and rebuild from the last safe backup. This takes weeks of downtime but refuses to negotiate with terrorists.",
        riskLevel: "Low",
        narrativeOutcome: "Slow recovery, revenue lost.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: -3, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c6_3",
        text: "Fight Back",
        description: "Involve the FBI and cyber warfare experts to attempt to crack the lock. A high-integrity move that risks losing data permanently.",
        riskLevel: "Medium",
        narrativeOutcome: "Systems locked for months, but legal high ground.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -4, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c6_4",
        text: "Go Analog",
        description: "Switch to paper and pen operations to keep the business running. It creates administrative chaos but maintains some cash flow.",
        riskLevel: "High",
        narrativeOutcome: "Chaos ensues, mistakes multiply.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s7",
    title: "Product Obsolescence",
    description: "A competitor has launched a revolutionary product that makes your flagship offering look like a relic.",
    category: "Market",
    choices: [
      {
        id: "c7_1",
        text: "Slash Prices",
        description: "Deeply discount your product to compete on value rather than features. This maintains market share but destroys profit margins.",
        riskLevel: "Medium",
        narrativeOutcome: "Sales hold, margins vanish.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c7_2",
        text: "Rush R&D",
        description: "Force the engineering team to crunch and build a copycat product. High risk of burnout and bugs, but it's the only way to catch up tech-wise.",
        riskLevel: "High",
        narrativeOutcome: "Buggy release, team burned out.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c7_3",
        text: "Pivot Niche",
        description: "Abandon the mass market to focus on a specific user segment the competitor ignores. A safer, smaller, sustainable business model.",
        riskLevel: "Low",
        narrativeOutcome: "Smaller market, stable income.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c7_4",
        text: "Buy the Competitor",
        description: "Attempt a hostile takeover to acquire their tech. It requires massive debt financing but eliminates the threat instantly.",
        riskLevel: "High",
        narrativeOutcome: "Massive debt, but threat eliminated.",
        impacts: { [MetricType.MORALE]: 2, [MetricType.FINANCES]: -5, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: 2 }
      }
    ]
  },
  {
    id: "s8",
    title: "Whistleblower",
    description: "An engineer revealed your company knowingly polluted a local river. Evidence is strong and the EPA is investigating.",
    category: "Legal",
    choices: [
      {
        id: "c8_1",
        text: "Admit and Clean Up",
        description: "Take full responsibility publicly and fund the cleanup. It's the most expensive option upfront but the only way to restore ethical standing.",
        riskLevel: "Low",
        narrativeOutcome: "Expensive fines, but ethics restored.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c8_2",
        text: "Discredit Witness",
        description: "Aggressively attack the whistleblower's credibility. A ruthless tactic that might win the legal case but backfire horribly in the court of public opinion.",
        riskLevel: "High",
        narrativeOutcome: "Cruel tactic backfires publicly.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -4 }
      },
      {
        id: "c8_3",
        text: "Settle Quietly",
        description: "Pay the fines and settle without admitting guilt. This minimizes legal exposure but leaves a cloud of suspicion over the company.",
        riskLevel: "Medium",
        narrativeOutcome: "Suspicion lingers.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c8_4",
        text: "Greenwashing Campaign",
        description: "Launch a massive ad campaign highlighting minor eco-friendly initiatives to distract from the scandal. Often seen as hypocritical.",
        riskLevel: "Medium",
        narrativeOutcome: "Seen as hypocritical.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s9",
    title: "Hostile Takeover",
    description: "A ruthless equity firm is buying up shares to seize control and dismantle the company for spare parts.",
    category: "Finance",
    choices: [
      {
        id: "c9_1",
        text: "Poison Pill Strategy",
        description: "Artificially dilute shares to make the acquisition prohibitively expensive. This kills the stock price but keeps the company independent.",
        riskLevel: "High",
        narrativeOutcome: "Stock value crashes, but independence kept.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c9_2",
        text: "Seek White Knight",
        description: "Find a friendly buyer to acquire the company instead. You save the company, but lose your autonomy to the new owners.",
        riskLevel: "Medium",
        narrativeOutcome: "Saved, but new owners call shots.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: 2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c9_3",
        text: "Sell Assets",
        description: "Liquidate profitable divisions to buy back your own stock. The company survives, but as a hollow shell of its former self.",
        riskLevel: "Medium",
        narrativeOutcome: "Company survives, but is a shell of itself.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -3, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c9_4",
        text: "Employee Buyout",
        description: "Rally the staff to pool resources and buy controlling shares. A morale-boosting moonshot that leaves the company capital-poor.",
        riskLevel: "Low",
        narrativeOutcome: "Morale soars, but capital is tight.",
        impacts: { [MetricType.MORALE]: 4, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      }
    ]
  },
  {
    id: "s10",
    title: "Regulatory Fine",
    description: "Your compliance team missed new EU regulations. You now face a massive fine that could cripple liquidity.",
    category: "Legal",
    choices: [
      {
        id: "c10_1",
        text: "Pay Full Fine",
        description: "Accept the penalty and pay immediately. It's a heavy financial blow, but it ends the uncertainty and allows business to resume.",
        riskLevel: "Low",
        narrativeOutcome: "Wallet hurts, business continues.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c10_2",
        text: "Fight in Court",
        description: "Appeal the decision legally. This delays the payment and might reduce it, but legal fees will mount and uncertainty will drag on.",
        riskLevel: "Medium",
        narrativeOutcome: "Legal fees mount, uncertainty drags on.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c10_3",
        text: "Exit Market",
        description: "Withdraw completely from the EU market to avoid jurisdiction. You save the fine money but lose a huge chunk of global revenue.",
        riskLevel: "High",
        narrativeOutcome: "Revenue collapse, but fine avoided.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c10_4",
        text: "Negotiate Settlement",
        description: "Admit partial fault and ask for a reduced fine. A diplomatic approach that might save money but invites increased monitoring.",
        riskLevel: "Low",
        narrativeOutcome: "Fine reduced, monitoring increased.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s11",
    title: "Natural Disaster",
    description: "A hurricane has destroyed your main distribution center. Inventory is ruined and logistics are severed.",
    category: "Supply Chain",
    choices: [
      {
        id: "c11_1",
        text: "Rebuild Elsewhere",
        description: "Abandon the site and build a new modern facility in a safer zone. A smart long-term move that is slow and leaves you offline for months.",
        riskLevel: "Low",
        narrativeOutcome: "Safe long term, slow restart.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c11_2",
        text: "Temporary Tents",
        description: "Set up makeshift operations in the parking lot. It allows shipping to resume fast, but conditions are inefficient and unsafe.",
        riskLevel: "Medium",
        narrativeOutcome: "Fast, but inefficient and unsafe.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c11_3",
        text: "Outsource Logistics",
        description: "Hire a third-party logistics (3PL) provider to handle everything. It solves the problem instantly but at a much higher cost per unit.",
        riskLevel: "Low",
        narrativeOutcome: "Expensive but reliable.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 2, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c11_4",
        text: "Claim Insurance & Wait",
        description: "Pause operations and wait for the insurance payout to rebuild properly. Low cost, but customers will defect to competitors in the meantime.",
        riskLevel: "High",
        narrativeOutcome: "Customers leave during the wait.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: -4, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s12",
    title: "AI Hallucination",
    description: "Your new customer support AI has started swearing at customers and promising free products.",
    category: "Tech",
    choices: [
      {
        id: "c12_1",
        text: "Shutdown AI",
        description: "Pull the plug immediately and revert to human agents. It ensures safety but wait times will skyrocket, frustrating users.",
        riskLevel: "Low",
        narrativeOutcome: "Slow response times, but safe.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c12_2",
        text: "Patch & Apologize",
        description: "Keep the AI running while frantically patching the code. A risky middle ground that tries to fix the plane while flying it.",
        riskLevel: "Medium",
        narrativeOutcome: "Memes circulate, but it passes.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c12_3",
        text: "Blame Hackers",
        description: "Claim the AI was compromised by external actors. A convenient lie that avoids blame for bad engineering but risks exposure.",
        riskLevel: "High",
        narrativeOutcome: "Truth comes out, trust evaporates.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c12_4",
        text: "Make it a 'Feature'",
        description: "Spin the erratic behavior as a temporary 'Edgy Mode' marketing stunt. A bizarre gamble that confuses customers and alienates professionals.",
        riskLevel: "High",
        narrativeOutcome: "Confuses everyone, alienates elders.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s13",
    title: "Office Mold",
    description: "Toxic black mold has been found in the HQ ventilation. Employees are reporting respiratory issues.",
    category: "HR",
    choices: [
      {
        id: "c13_1",
        text: "Remote Work Forever",
        description: "Close the office permanently and shift to a full-remote model. You save on rent, but lose the collaborative company culture.",
        riskLevel: "Low",
        narrativeOutcome: "Save rent, lose culture.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: 2, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c13_2",
        text: "Expensive Cleanup",
        description: "Hire specialists to strip the building to the studs. It guarantees safety but drains the bank account severely.",
        riskLevel: "Low",
        narrativeOutcome: "Safe office, drained bank.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c13_3",
        text: "Paint Over It",
        description: "Perform a cosmetic fix to hide the problem. Highly illegal and dangerous; if discovered, lawsuits will be catastrophic.",
        riskLevel: "High",
        narrativeOutcome: "Lawsuits follow when sickness spikes.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c13_4",
        text: "Relocate HQ",
        description: "Move the entire company to a new city. A fresh start that disrupts employees' lives and costs a fortune in moving fees.",
        riskLevel: "Medium",
        narrativeOutcome: "Disrupts lives, but fresh start.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 1 }
      }
    ]
  },
  {
    id: "s14",
    title: "Diversity Scandal",
    description: "Leaked emails show hiring managers systematically discriminating against minority candidates.",
    category: "HR",
    choices: [
      {
        id: "c14_1",
        text: "Fire Managers",
        description: "Immediately terminate everyone involved. It cleans the rot but creates fear and leaves key positions empty.",
        riskLevel: "Medium",
        narrativeOutcome: "Internal fear, external praise.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c14_2",
        text: "Diversity Training",
        description: "Mandate company-wide sensitivity workshops. Often seen as a 'check-the-box' activity that doesn't solve the root issue.",
        riskLevel: "Low",
        narrativeOutcome: "Seen as doing the bare minimum.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c14_3",
        text: "Hire Chief Diversity Officer",
        description: "Create an executive role to oversee culture. A structural change that shows commitment but takes time to yield results.",
        riskLevel: "Low",
        narrativeOutcome: "Good step, takes time.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c14_4",
        text: "Ignore Emails",
        description: "Dismiss the leak as 'locker room talk'. This alienates talent and invites boycotts from the public.",
        riskLevel: "High",
        narrativeOutcome: "Talent flees, boycotts start.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -4 }
      }
    ]
  },
  {
    id: "s15",
    title: "Cloud Provider Outage",
    description: "Your primary cloud provider (AWS/Azure) is down globally. Your app and services are completely offline.",
    category: "Tech",
    choices: [
      {
        id: "c15_1",
        text: "Wait it Out",
        description: "Do nothing and wait for the provider to fix it. It's the cheapest option, but customers will be furious at your helplessness.",
        riskLevel: "Low",
        narrativeOutcome: "Customers angry, but cheap.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c15_2",
        text: "Switch Providers",
        description: "Attempt a frantic migration to a different cloud host. Extremely technically risky and likely to result in data loss during the rush.",
        riskLevel: "High",
        narrativeOutcome: "Data lost in haste, but online sooner.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c15_3",
        text: "Tweet Updates",
        description: "Dedicate the team to constant transparent communication on social media. It manages expectations well but doesn't fix the tech.",
        riskLevel: "Low",
        narrativeOutcome: "Transparency appreciated.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c15_4",
        text: "Refund Customers",
        description: "Proactively offer credits for the downtime. A costly move that buys goodwill and retains loyalty.",
        riskLevel: "Medium",
        narrativeOutcome: "Costly, but retains loyalty.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      }
    ]
  },
  {
    id: "s16",
    title: "Insider Trading",
    description: "Rumors are swirling that your CFO sold a massive block of stock just before a bad earnings report.",
    category: "Legal",
    choices: [
      {
        id: "c16_1",
        text: "Cooperate with SEC",
        description: "Invite regulators to audit the books fully. The stock will dip on the news, but it establishes the company's integrity.",
        riskLevel: "Low",
        narrativeOutcome: "Stock dips, but integrity intact.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c16_2",
        text: "Defend CFO",
        description: "Publicly back the CFO, claiming the sale was scheduled. If evidence proves otherwise, you look complicit in the crime.",
        riskLevel: "High",
        narrativeOutcome: "Looks like collusion.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c16_3",
        text: "Fire CFO",
        description: "Scapegoat the CFO immediately to distance the company. A ruthless tactic that solves the optics problem but shakes investor confidence.",
        riskLevel: "Medium",
        narrativeOutcome: "Ruthless, but effective.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c16_4",
        text: "Suspend Trading",
        description: "Voluntarily halt stock trading to stop the sell-off. It signals panic to the market, causing a crash when trading resumes.",
        riskLevel: "High",
        narrativeOutcome: "Panic selling when it reopens.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s17",
    title: "Fake News Attack",
    description: "A viral internet hoax claims your flagship health product causes baldness. Sales are plummeting.",
    category: "PR",
    choices: [
      {
        id: "c17_1",
        text: "Ignore It",
        description: "Refuse to acknowledge the troll to avoid giving it oxygen. However, without a rebuttal, the rumor spreads unchecked.",
        riskLevel: "Medium",
        narrativeOutcome: "Rumor spreads unchecked.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c17_2",
        text: "Scientific Rebuttal",
        description: "Publish dry, factual lab data proving safety. It's the correct professional response, though often too boring to go viral.",
        riskLevel: "Low",
        narrativeOutcome: "Boring, but factual.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c17_3",
        text: "Sue the Source",
        description: "Aggressively litigate against the creators of the hoax. This triggers the 'Streisand Effect', drawing even more attention to the claim.",
        riskLevel: "High",
        narrativeOutcome: "Streisand effect triggers.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c17_4",
        text: "Humorous Response",
        description: "Mock the claim with a funny social media campaign. High risk; if it lands, you win the internet. If it fails, you look unprofessional.",
        riskLevel: "Medium",
        narrativeOutcome: "High risk, high reward viral win.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      }
    ]
  },
  {
    id: "s18",
    title: "Key Executive Poached",
    description: "Your visionary CTO has announced they are leaving for your biggest rival, potentially taking trade secrets.",
    category: "HR",
    choices: [
      {
        id: "c18_1",
        text: "Counter Offer",
        description: "Match the rival's offer with double the salary. It keeps the talent, but other executives will demand similar raises immediately.",
        riskLevel: "Medium",
        narrativeOutcome: "They stay, but others demand raises.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c18_2",
        text: "Let Them Go",
        description: "Wish them luck and focus on the team. You lose a key brain, but you avoid a bidding war and maintain dignity.",
        riskLevel: "Low",
        narrativeOutcome: "Brain drain hurts innovation.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c18_3",
        text: "Enforce Non-Compete",
        description: "Sue to prevent them from working for the competitor. It looks petty and scares away future talent who value freedom.",
        riskLevel: "High",
        narrativeOutcome: "Petty look, talent avoids you.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c18_4",
        text: "Promote from Within",
        description: "Give a junior star the CTO role. A risky move for the product, but it massively boosts morale among the rank and file.",
        riskLevel: "Medium",
        narrativeOutcome: "Risky, but boosts team spirit.",
        impacts: { [MetricType.MORALE]: 2, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s19",
    title: "Vendor Bankruptcy",
    description: "Your primary logistics partner has folded overnight. Trucks are stalled and warehouses are locked.",
    category: "Supply Chain",
    choices: [
      {
        id: "c19_1",
        text: "Bid for Assets",
        description: "Buy the bankrupt company's trucks and depots. You achieve vertical integration, but you're now running a trucking company instead of your core business.",
        riskLevel: "Medium",
        narrativeOutcome: "Vertical integration achieved.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 3, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c19_2",
        text: "Switch to Gig Logistics",
        description: "Use services like Uber Freight for ad-hoc shipping. It's highly flexible but completely unreliable for large scale operations.",
        riskLevel: "Low",
        narrativeOutcome: "Unreliable but flexible.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c19_3",
        text: "Delay Shipments",
        description: "Inform customers their orders will be late while you find a real partner. Honest, but causes immediate revenue drops.",
        riskLevel: "Medium",
        narrativeOutcome: "Sales drop.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c19_4",
        text: "Use Postal Service",
        description: "Shift to national postal carriers. It's slow and steady, but lacks the tracking and care your products usually require.",
        riskLevel: "Low",
        narrativeOutcome: "Slow and steady.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s20",
    title: "IPO Flop",
    description: "Your long-awaited public listing has opened 30% down. Employees with stock options are watching their wealth evaporate.",
    category: "Finance",
    choices: [
      {
        id: "c20_1",
        text: "Stock Buyback",
        description: "Use company cash reserves to buy shares and artificially prop up the price. It saves face but leaves the company cash-poor.",
        riskLevel: "Medium",
        narrativeOutcome: "Cash reserves depleted.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c20_2",
        text: "Blame Market Conditions",
        description: "Issue a statement blaming macroeconomics. It deflects fault but investors remain skeptical of your leadership.",
        riskLevel: "Low",
        narrativeOutcome: "Investors stay skeptical.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c20_3",
        text: "Cut Forecasts",
        description: "Lower guidance for the next quarter to reset expectations. The stock drops further now, but stabilizes later.",
        riskLevel: "Medium",
        narrativeOutcome: "Stock drops more, then stabilizes.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c20_4",
        text: "Media Blitz",
        description: "Go on every financial news show to hype the future. It looks desperate if you don't have real news to share.",
        riskLevel: "High",
        narrativeOutcome: "Seen as desperate.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s21",
    title: "Sexual Harassment",
    description: "High profile accusations have been levied against the VP of Sales. The culture is toxic.",
    category: "HR",
    choices: [
      {
        id: "c21_1",
        text: "Immediate Termination",
        description: "Fire the VP without an investigation to send a message. You invite a wrongful termination lawsuit, but you win public approval.",
        riskLevel: "High",
        narrativeOutcome: "Wrongful termination suit, but good optics.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c21_2",
        text: "Third Party Investigation",
        description: "Hire an external firm to investigate fairly. It's the correct legal move, but the slow process lets the scandal fester.",
        riskLevel: "Low",
        narrativeOutcome: "Slow, but just.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c21_3",
        text: "Quiet Settlement",
        description: "Pay the accusers to sign NDAs and leave. It makes the problem go away today, but guarantees a worse explosion later.",
        riskLevel: "Medium",
        narrativeOutcome: "Secret stays... for now.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c21_4",
        text: "Ignore It",
        description: "Demand concrete proof before acting. This signals that you don't believe victims, triggering mass boycotts.",
        riskLevel: "High",
        narrativeOutcome: "Boycotts begin.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -4 }
      }
    ]
  },
  {
    id: "s22",
    title: "Tax Evasion",
    description: "The IRS has flagged irregularities in your offshore accounts. A full audit is imminent.",
    category: "Legal",
    choices: [
      {
        id: "c22_1",
        text: "Pay Back Taxes",
        description: "Voluntarily pay everything owed plus interest. It's a massive financial hit, but it likely avoids criminal charges.",
        riskLevel: "Low",
        narrativeOutcome: "Huge hit, but safe.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c22_2",
        text: "Hire Top Lawyers",
        description: "Pay a legal dream team to find loopholes and delay the audit. Expensive and distracting, but might save the tax bill.",
        riskLevel: "Medium",
        narrativeOutcome: "Expensive, dragged out.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c22_3",
        text: "Shred Documents",
        description: "Destroy the evidence. This converts a financial crime into a felony obstruction of justice. Extremely high risk.",
        riskLevel: "High",
        narrativeOutcome: "Prison time risks increase.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c22_4",
        text: "Blame Accountants",
        description: "Claim the executive team was misled by external firms. A weak defense that makes leadership look incompetent.",
        riskLevel: "Medium",
        narrativeOutcome: "Looks weak.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s23",
    title: "Ad Controversy",
    description: "Your new marketing campaign is being called 'tone deaf' and offensive by social media. #Cancel is trending.",
    category: "PR",
    choices: [
      {
        id: "c23_1",
        text: "Pull Ad & Apologize",
        description: "Take the ad down and issue a heartfelt apology. You waste the ad spend, but you stop the bleeding of public goodwill.",
        riskLevel: "Low",
        narrativeOutcome: "Wasted ad spend, but forgiveness starts.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c23_2",
        text: "Double Down",
        description: "Claim the controversy is manufactured by 'woke mobs'. It energizes a specific base but permanently alienates everyone else.",
        riskLevel: "High",
        narrativeOutcome: "Polarizes base. Love/Hate.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c23_3",
        text: "Silence",
        description: "Say nothing and hope the internet finds a new target tomorrow. It looks arrogant, but prevents you from saying something worse.",
        riskLevel: "Medium",
        narrativeOutcome: "Looks arrogant.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c23_4",
        text: "Donate to Charity",
        description: "Make a large donation to a relevant cause to deflect. It's often seen as trying to buy your way out of trouble.",
        riskLevel: "Low",
        narrativeOutcome: "Seen as buying way out.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s24",
    title: "Cash Crunch",
    description: "Due to a banking error, you don't have the liquidity to make payroll this Friday.",
    category: "Finance",
    choices: [
      {
        id: "c24_1",
        text: "Delay Paychecks",
        description: "Inform staff they will be paid next week. This destroys trust; employees will quit, and legal action is likely.",
        riskLevel: "High",
        narrativeOutcome: "Employees furious, some quit.",
        impacts: { [MetricType.MORALE]: -4, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c24_2",
        text: "Emergency Loan",
        description: "Take a high-interest short-term loan. It solves the immediate problem, but the debt service will cripple future growth.",
        riskLevel: "Medium",
        narrativeOutcome: "Payroll met, debt soars.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c24_3",
        text: "Layoffs",
        description: "Cut 10% of the staff immediately to free up cash for the rest. A panic move that saves money but induces terror in the survivors.",
        riskLevel: "High",
        narrativeOutcome: "Panic, but cash saved.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: 2, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c24_4",
        text: "Stop Supplier Payments",
        description: "Freeze payments to vendors to pay staff. It keeps the team happy, but suppliers will stop shipping materials immediately.",
        riskLevel: "Medium",
        narrativeOutcome: "Suppliers halt deliveries.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: -3, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s25",
    title: "Patent Troll",
    description: "A shell company with no products is suing you, claiming your core technology infringes on their vague patent.",
    category: "Legal",
    choices: [
      {
        id: "c25_1",
        text: "Fight in Court",
        description: "Spend millions to invalidate their patent. You protect the industry, but it's a massive distraction for years.",
        riskLevel: "Medium",
        narrativeOutcome: "Years of distraction.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c25_2",
        text: "Settle",
        description: "Pay them a licensing fee to go away. Cheap and fast, but it paints a target on your back for other trolls.",
        riskLevel: "Low",
        narrativeOutcome: "Encourages more trolls.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c25_3",
        text: "Counter Sue",
        description: "Sue them back for frivolous litigation. Aggressive and satisfying, but significantly increases legal costs.",
        riskLevel: "High",
        narrativeOutcome: "High legal fees.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c25_4",
        text: "Redesign Tech",
        description: "Change your product to circumvent the patent. It avoids the lawsuit but introduces new bugs and delays features.",
        riskLevel: "High",
        narrativeOutcome: "New bugs introduced.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s26",
    title: "Sabotage",
    description: "A disgruntled admin has deleted the main customer database. Backups are available but 24 hours old.",
    category: "Tech",
    choices: [
      {
        id: "c26_1",
        text: "Prosecute",
        description: "Press charges and have them arrested. It serves justice, but doesn't actually get the data back any faster.",
        riskLevel: "Low",
        narrativeOutcome: "Justice served, data still gone.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c26_2",
        text: "Data Recovery Specialist",
        description: "Pay a fortune for forensic recovery to get the lost 24 hours back. It's expensive but minimizes data loss.",
        riskLevel: "Medium",
        narrativeOutcome: "Most data saved.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c26_3",
        text: "Rebuild Manually",
        description: "Order staff to re-enter data from paper records. It exhausts the team and halts all other work.",
        riskLevel: "High",
        narrativeOutcome: "Team exhausted.",
        impacts: { [MetricType.MORALE]: -3, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: -3, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c26_4",
        text: "Cover it Up",
        description: "Pretend it was a system glitch and the data is lost. No one believes this, and trust in your competence evaporates.",
        riskLevel: "Medium",
        narrativeOutcome: "No one believes you.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 0, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      }
    ]
  },
  {
    id: "s27",
    title: "Product Defect",
    description: "Reports indicate your product's batteries are exploding in 0.1% of units. It's rare, but dangerous.",
    category: "Product",
    choices: [
      {
        id: "c27_1",
        text: "Global Recall",
        description: "Issue a total recall of every unit sold. It costs a fortune but guarantees safety and proves you care about customers.",
        riskLevel: "Low",
        narrativeOutcome: "Massive cost, saved reputation.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -5, [MetricType.SUPPLY_CHAIN]: -2, [MetricType.PUBLIC_IMAGE]: 4 }
      },
      {
        id: "c27_2",
        text: "Targeted Replacement",
        description: "Only replace units from specific batches. It saves money, but if you missed a bad batch, the explosions continue.",
        riskLevel: "Medium",
        narrativeOutcome: "Confusion ensues.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c27_3",
        text: "Wait for more Data",
        description: "Delay action to confirm the root cause. While you wait, more units explode, leading to massive negligence lawsuits.",
        riskLevel: "High",
        narrativeOutcome: "More explosions, lawsuits start.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -4 }
      },
      {
        id: "c27_4",
        text: "Software Patch",
        description: "Push an update to throttle battery power. It stops the explosions but makes the product perform worse.",
        riskLevel: "Medium",
        narrativeOutcome: "Device slower, but safer.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      }
    ]
  },
  {
    id: "s28",
    title: "Activist Investor",
    description: "A major shareholder is demanding you cut 'wasteful' eco-initiatives to boost short-term profits.",
    category: "Finance",
    choices: [
      {
        id: "c28_1",
        text: "Comply",
        description: "Cut the green programs as requested. The stock price jumps, but your brand's reputation for sustainability is ruined.",
        riskLevel: "Low",
        narrativeOutcome: "Stock up, image down.",
        impacts: { [MetricType.MORALE]: -2, [MetricType.FINANCES]: 2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c28_2",
        text: "Ignore Them",
        description: "Stick to your values and refuse. The investor launches a proxy war to replace the board.",
        riskLevel: "High",
        narrativeOutcome: "Board fight ensues.",
        impacts: { [MetricType.MORALE]: 2, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c28_3",
        text: "Compromise",
        description: "Cut half the programs to appease them. It satisfies neither the investor nor the environmentalists.",
        riskLevel: "Medium",
        narrativeOutcome: "Neither side happy.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -1 }
      },
      {
        id: "c28_4",
        text: "Buy Them Out",
        description: "Use cash reserves to buy the investor's stake. It removes the headache but uses capital that was needed for growth.",
        riskLevel: "High",
        narrativeOutcome: "Poor use of capital.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      }
    ]
  },
  {
    id: "s29",
    title: "Government Sanctions",
    description: "A trade war has resulted in a ban on exports to your largest international market.",
    category: "Legal",
    choices: [
      {
        id: "c29_1",
        text: "Obey Sanctions",
        description: "Cease all sales immediately. You lose 30% of revenue overnight, but you avoid federal prison.",
        riskLevel: "Low",
        narrativeOutcome: "Revenue cliff.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: -1, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c29_2",
        text: "Find Loophole",
        description: "Route products through a third country shell company. It's high risk; if caught, the company will be blacklisted globally.",
        riskLevel: "High",
        narrativeOutcome: "Risky, might be illegal.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -1, [MetricType.SUPPLY_CHAIN]: 2, [MetricType.PUBLIC_IMAGE]: -3 }
      },
      {
        id: "c29_3",
        text: "Lobby Government",
        description: "Spend heavily on lobbyists to get an exemption. It's a slow process that bleeds cash with no guarantee of success.",
        riskLevel: "Medium",
        narrativeOutcome: "Slow process.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 0 }
      },
      {
        id: "c29_4",
        text: "New Markets",
        description: "Pivot sales efforts to South America. It requires expensive new infrastructure but diversifies your risk.",
        riskLevel: "Medium",
        narrativeOutcome: "Expensive setup.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -2, [MetricType.SUPPLY_CHAIN]: 1, [MetricType.PUBLIC_IMAGE]: 0 }
      }
    ]
  },
  {
    id: "s30",
    title: "Currency Crash",
    description: "Hyperinflation in the country where you manufacture has doubled your costs overnight.",
    category: "Finance",
    choices: [
      {
        id: "c30_1",
        text: "Raise Prices",
        description: "Pass the full cost increase to the consumer. It protects margins, but sales volume will drop significantly.",
        riskLevel: "Medium",
        narrativeOutcome: "Sales volume drops.",
        impacts: { [MetricType.MORALE]: 0, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -2 }
      },
      {
        id: "c30_2",
        text: "Absorb Costs",
        description: "Keep prices the same and eat the loss. You maintain market share, but you are now bleeding money on every sale.",
        riskLevel: "Low",
        narrativeOutcome: "Bleeding money.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -3, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: 1 }
      },
      {
        id: "c30_3",
        text: "Move Manufacturing",
        description: "Reshore production to a stable domestic plant. The transition creates chaos and delays, but solves the currency risk.",
        riskLevel: "High",
        narrativeOutcome: "Chaos during transition.",
        impacts: { [MetricType.MORALE]: 1, [MetricType.FINANCES]: -4, [MetricType.SUPPLY_CHAIN]: -3, [MetricType.PUBLIC_IMAGE]: 2 }
      },
      {
        id: "c30_4",
        text: "Cut Quality",
        description: "Switch to cheaper materials to offset the cost. The price stays stable, but the brand reputation takes a hit.",
        riskLevel: "Medium",
        narrativeOutcome: "Brand damage.",
        impacts: { [MetricType.MORALE]: -1, [MetricType.FINANCES]: 1, [MetricType.SUPPLY_CHAIN]: 0, [MetricType.PUBLIC_IMAGE]: -3 }
      }
    ]
  }
];
