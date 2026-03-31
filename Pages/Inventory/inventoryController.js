const dbQueries = require("./DB Queries/inventoryQueries");

module.exports = {
  get: async (req, res) => {
    const inventoryData = await dbQueries.getAllInventory();
    res.render("Inventory/Inventory.view.ejs", {
      active: "inventory",
      inventoryData,
    });
  },
};
