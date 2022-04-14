const { asyncHandler } = require("../middleware/errorMiddleware");
const service = require("../utils/service");

// Create Product -- Admin
exports.createProduct = async (req, res) => {
  const product = await service.create(req.body);
  res.status(201).json(product);
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
};

// Get Single Product
exports.getSingleProduct = asyncHandler(async (req, res) => {
  const product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json(`Product not found in ${req.params.id}`);
  }
  res.status(200).json(product);
});

// Update Product -- Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  let product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json(`Product not found in ${req.params.id}`);
  }
  product = await service.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(product);
});

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json(`Product not found in ${req.params.id}`);
  }

  await service.deleteOne(req.params.id);
  res.status(200).json(`${req.params.id} deleted successfully`);
});
