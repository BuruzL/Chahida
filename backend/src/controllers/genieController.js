import { askGenie } from "../services/genieService.js";
import LostFound from "../models/LostFound.js";
import Market from "../models/Market.js";
import Buddy from "../models/Buddy.js";
import Blood from "../models/Blood.js";

export const askCampusGenie = async (req,res) => {
  const context = {
    lostAndFound: await LostFound.find(),
    buyAndSell: await Market.find(),
    studyBuddy: await Buddy.find(),
    bloodDonation: await Blood.find()
  };

  const reply = await askGenie(req.body.question, context);
  res.json({ reply });
};
