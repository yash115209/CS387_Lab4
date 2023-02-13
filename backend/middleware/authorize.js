//this middleware will check authorization

module.exports = function(req, res, next) {
  try {
    console.log(req.session.user, "yo");
    console.log(req.session.user.isAuth);
    if(req.session.user.isAuth)next();
    else throw new Error("not authorised");
  } catch (err) {
    res.status(401).json({ isvalid:false ,msg: "Not authorised" });
  }
};