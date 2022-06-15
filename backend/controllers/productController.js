const { asyncHandler } = require("../middleware/errorMiddleware");
const ApiFeatures = require("../utils/apiFeatures");
const service = require("../services/productService");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = asyncHandler(async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await service.create(req.body);
  res.status(201).json(product);
});

// Get All Products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const total = await service.countDocuments();
  const pages = Math.ceil(total / pageSize);

  const apiFeature = new ApiFeatures(service.find(), req.query)
    .search()
    .filter()
    .pagination(pageSize);

  const products = await apiFeature.query;
  res.status(200).json({ products, pages, total });
});

// Get All Products (Admin)
exports.getAdminProducts = asyncHandler(async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

// Get Product Details
exports.getProductDetails = asyncHandler(async (req, res) => {
  const product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json("That product is not available");
  }
  res.status(200).json(product);
});

// Update Product -- Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  let product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json("That product is not available");
  }

  // Images start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  product = await service.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(product);
});

// Delete Product -- Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await service.findById(req.params.id);

  if (!product) {
    return res.status(404).json("That product is not available");
  }

  // Deleting image from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await service.deleteOne({ _id: req.params.id });
  res.status(200).json(`${req.params.id} deleted successfully`);
});

// Create New Review or Update the review
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, productId, userImg } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    url: userImg,
  };

  const product = await service.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment), (rev.url = userImg);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json("Success");
});

// // Get All Reviews of a product
// exports.getAllReviews = asyncHandler(async (req, res) => {
//   const product = await service.findById(req.query.id);

//   if (!product) {
//     return res.status(404).json("That query product is not available");
//   }

//   res.status(200).json(product.reviews);
// });

// // Delete Review
// exports.deleteReview = asyncHandler(async (req, res) => {
//   // productId vs reviewId

//   // productId === the id of a product
//   // id === the id of a single review

//   const { productId, id } = req.query;

//   if (!productId || !id) {
//     return res.status(404).json("productId or id is not found!");
//   }

//   const product = await service.findById(productId);

//   if (!product) {
//     return res.status(404).json("That query product is not available");
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   const ratings = avg / reviews.length || 0;

//   const numOfReviews = reviews.length;

//   await service.findByIdAndUpdate(productId, {
//     reviews,
//     ratings,
//     numOfReviews,
//   });

//   res.status(200).json("Success");
// });
