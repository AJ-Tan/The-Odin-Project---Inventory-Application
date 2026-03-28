module.exports = {
  get: (req, res) => {
    res.render("Products/Products.view.ejs", { active: "product" });
  },
};
