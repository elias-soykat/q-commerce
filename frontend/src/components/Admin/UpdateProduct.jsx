import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesIcon, ProductIcon, ProductPrice } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { productCategories } from "../../helper/helperObj";
import {
  getProductDetails,
  updateProduct,
} from "../../redux/actions/productAction";
import { clearErrors } from "../../redux/actions/userAction";
import { Input, Label } from "../Common";
import Sidebar from "./Sidebar";

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {
    isUpdated,
    loading,
    err: updateErr,
  } = useSelector((state) => state.product);
  const { product, err } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (err || updateErr) {
      toast.error(err.message || err || updateErr.message || updateErr);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [dispatch, err, id, isUpdated, navigate, product, updateErr]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImageHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <section className="container my-20">
      <MetaData title="Update Product | Q Sneakers " />
      {loading && <Loading />}
      <div className="overflow-hidden">
        <Sidebar />
        <div className="my-4 flex flex-col sm:my-0 md:ml-[300px]">
          <h1 className="mt-10 text-center text-xl font-medium sm:text-2xl">
            Update Product
          </h1>

          <form
            className="mx-auto mt-8 w-11/12 sm:w-8/12 md:w-7/12"
            onSubmit={updateProductSubmitHandler}
          >
            {/* Product Name  */}
            <div className="mb-5 flex flex-col">
              <Label f="name">Product Name</Label>
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={name}
                  plc="Enter Product Name"
                  icon={<ProductIcon />}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Price  */}
            <div className="mb-5 flex flex-col">
              <Label f="price">Product Price</Label>
              <div className="relative">
                <Input
                  type="number"
                  name="price"
                  value={price}
                  plc="Enter Price"
                  icon={<ProductPrice />}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Product Description  */}
            <div className="mb-5 flex flex-col">
              <Label f="desc">Product Description</Label>
              <textarea
                name="description"
                id="desc"
                value={description}
                placeholder="Product Description"
                cols="30"
                rows="3"
                className="w-full rounded-lg border border-gray-300 py-2 pl-4 text-sm placeholder-gray-500 transition-colors placeholder:italic focus:border-gray-600 focus:outline-none"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Categories  */}
            <div className="mb-6 flex flex-col">
              <Label f="category">Categories</Label>
              <div className="relative flex w-full rounded-md border focus:border-gray-600">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  className="w-full rounded-lg border border-gray-300 py-2 pl-4 text-sm placeholder-gray-500 transition-colors placeholder:italic focus:border-gray-600 focus:outline-none"
                  id="category"
                  required
                >
                  {productCategories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stock  */}
            <div className="mb-5 flex flex-col">
              <Label f="stock">Product Stock</Label>
              <div className="relative">
                <Input
                  type="number"
                  name="stock"
                  value={stock}
                  plc="Enter Stock"
                  icon={<CategoriesIcon />}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>

            {/* File  */}
            <div className="mb-5 flex flex-col">
              <Label f="images">Upload Image</Label>
              <div className="mt-1 flex justify-between">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img
                      className="w-1/12 overflow-auto"
                      key={index}
                      src={image.url}
                      alt="Old Product Preview"
                    />
                  ))}
                {imagesPreview.map((image, index) => (
                  <img
                    className="w-1/12 overflow-auto"
                    key={index}
                    src={image}
                    alt="Product Preview"
                  />
                ))}
                <div className="relative rounded-lg duration-500 hover:bg-gray-100">
                  <input
                    type="file"
                    onChange={updateProductImageHandler}
                    name="images"
                    accept="image/*"
                    multiple
                    className="w-full rounded-lg py-2 pl-11 text-sm placeholder-gray-500 placeholder:italic focus:border-gray-600 focus:outline-none"
                    placeholder="Your File"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 mb-6">
              <input
                type="submit"
                value="Update Product"
                className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-3 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
