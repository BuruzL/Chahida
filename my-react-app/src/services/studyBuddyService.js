module.exports.getStudyBuddies = async () => {
    const res = await fetch("http://localhost:7002/api/studybuddy");
    return res.json();
  };
  