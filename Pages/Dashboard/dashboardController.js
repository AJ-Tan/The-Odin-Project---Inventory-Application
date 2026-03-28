module.exports = {
  get: (req, res) => {
    const menuParam = req.params.menu || "dashboard";
    res.render("Dashboard/Dashboard.view.ejs", { active: menuParam });
  },
};
