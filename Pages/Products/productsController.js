const dbQueries = require("./DB Queries/productsQueries");

module.exports = {
  get: async (req, res) => {
    const productsData = await dbQueries.getAllProducts();
    res.render("Products/Products.view.ejs", {
      active: "product",
      productsData,
    });
  },
};
