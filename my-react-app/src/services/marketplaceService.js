module.exports.getMarketplace = async () => {
    const res = await fetch("http://localhost:7002/api/marketplace");
    return res.json();
  };
  