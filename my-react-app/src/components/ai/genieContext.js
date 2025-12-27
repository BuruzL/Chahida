const { getLostFound } = require("../../services/lostFoundService");
const { getMarketplace } = require("../../services/marketplaceService");
const { getStudyBuddies } = require("../../services/studyBuddyService");
const { getBloodRequests } = require("../../services/bloodService");

module.exports.buildCampusContext = async () => {
  return {
    lostAndFound: await getLostFound(),
    buyAndSell: await getMarketplace(),
    studyBuddy: await getStudyBuddies(),
    bloodDonation: await getBloodRequests()
  };
};
