module.exports = {
  default: (req, res) => {
    res.status(404).render("Error/Error.view.ejs");
  },
};
