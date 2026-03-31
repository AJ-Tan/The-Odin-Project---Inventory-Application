const dbQueries = require("./DB Queries/productsQueries");

module.exports = {
  get: async (req, res) => {
    const content = req.params.content;
    const id = req.params.id;
    const productsData = await dbQueries.getAllProducts();
    const categories = await dbQueries.getAllCategories();
    let item = {};

    if (req.params.id) {
      item = await dbQueries.getSelectedProduct(req.params.id);
    }

    res.render("Products/Products.view.ejs", {
      active: "product",
      id,
      productsData,
      categories,
      content,
      item,
      oldInputs: {},
      inputError: [],
    });
  },
  postAdd: async (req, res) => {
    await dbQueries.insertProduct(
      req.body.name,
      req.body.price,
      req.body.category,
    );
    res.status(204).redirect("/products");
  },
  postUpdate: async (req, res) => {
    await dbQueries.updateProduct(
      req.params.id,
      req.body.name,
      req.body.price,
      req.body.category,
    );
    res.status(204).redirect("/products");
  },
};
