import LostFound from "../models/LostFound.js";
import BuySell from "../models/BuySell.js";
import StudyBuddy from "../models/StudyBuddy.js";
import BloodRequest from "../models/BloodRequest.js";
import { askCampusAI } from "../services/aiService.js";

export const askAIController = async (req,res)=>{
  const { question } = req.body;

  const lost = await LostFound.find().limit(20);
  const sell = await BuySell.find().limit(20);
  const buddy = await StudyBuddy.find().limit(20);
  const blood = await BloodRequest.find().limit(20);

  const context = `
Lost & Found: ${JSON.stringify(lost)}
Buy & Sell: ${JSON.stringify(sell)}
Study Buddies: ${JSON.stringify(buddy)}
Blood Donation: ${JSON.stringify(blood)}
`;

  const reply = await askCampusAI(question, context);
  res.json({ reply });
};
