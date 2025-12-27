module.exports.getBloodRequests = async () => {
    const res = await fetch("http://localhost:7002/api/blood");
    return res.json();
  };
  