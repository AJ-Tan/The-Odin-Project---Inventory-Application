module.exports = {
  get: (req, res) => {
    res.render("Inventory/Inventory.view.ejs", { active: "inventory" });
  },
};
