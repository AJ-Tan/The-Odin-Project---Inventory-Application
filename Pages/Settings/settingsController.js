module.exports = {
  get: (req, res) => {
    res.render("Settings/Settings.view.ejs", { active: "settings" });
  },
};
