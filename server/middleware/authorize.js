//this middleware will check authorization

module.exports = function(req, res, next) {
  try {
    console.log(req.session.user.isAuth);
    if(req.session.user.isAuth)next();
  } catch (err) {
    res.status(401).json({ msg: "Not authorised" });
  }
};