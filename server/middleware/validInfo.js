module.exports = function(req, res, next) {
    const { id, password } = req.body;
    //enter code to check if the id is valid or not
    if (req.path === "/register") {
      if (![id, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
    } else if (req.path === "/login") {
      if (![id, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } 
    }
    next();
  };