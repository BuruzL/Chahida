module.exports.getLostFound = async () => {
    const res = await fetch("http://localhost:7002/api/lostfound");
    return res.json();
  };
  