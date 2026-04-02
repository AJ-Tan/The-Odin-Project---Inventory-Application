const dbQueries = require("./DB Queries/dashboardQueries");

module.exports = {
  get: async (req, res) => {
    const menuParam = req.params.menu || "dashboard";
    const warehouseItems = await dbQueries.getByWarehouse();
    const productItems = await dbQueries.getByProduct();
    const categoryItems = await dbQueries.getByCategory();
    res.render("Dashboard/Dashboard.view.ejs", {
      active: menuParam,
      warehouseItems,
      productItems,
      categoryItems,
    });
  },
};
