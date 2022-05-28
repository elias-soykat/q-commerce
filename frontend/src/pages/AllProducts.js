import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CloseNavBar, NavHamburger, Star, Unfilled } from "../assets/svg";
import { Container } from "../components/Common";
import { Product } from "../components/Product";
import { Loading, MetaData, SkeletonLoad } from "../helper";
import { categoryList, ratingList } from "../helper/helperObj";
import { getProducts } from "../redux/actions/productAction";
import noProduct from "../assets/no-product.png";

let skeleton = [0, 1, 2, 3, 4, 5];
export default function AllProducts() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [sort, setSort] = useState("price-asc");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  const { keyword } = useParams();

  const { products, loading, pages, total } = useSelector(
    (state) => state.productsList
  );

  // asc => low to high
  // desc => high to low
  useEffect(() => {
    dispatch(getProducts(pageNumber, keyword, category));
  }, [category, dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (sort === "price-asc") {
      const result = products.sort((a, b) => a.price - b.price);
      setFilteredProducts([...result]);
    } else if (sort === "price-desc") {
      const result = products.sort((a, b) => b.price - a.price);
      setFilteredProducts([...result]);
    }
  }, [products, sort]);

  const title = keyword ? `Search for ${keyword}` : "All Products";

  return (
    <Container bg="bg-white">
      <MetaData title={`${title} | Q - Commerce`} />
      {loading && <Loading />}
      <div className="my-16 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
        <div className="lg:sticky lg:top-36">
          <div className="overflow-hidden rounded">
            <div
              onClick={() => setToggle(!toggle)}
              className="flex items-center justify-between px-5 py-5  bg-gray-100 lg:hidden"
            >
              <span className="text-sm font-medium">Toggle Filters</span>

              {!toggle && <CloseNavBar w="18" />}
              {toggle && <NavHamburger w="22" />}
            </div>

            <form
              className={`${
                toggle && "hidden"
              } mt-2 border border-gray-200 lg:border-t-0`}
            >
              <p className="block w-full px-6 py-4 text-xs font-medium bg-gray-100">
                Category
              </p>

              {/* Category List  */}
              <div className="px-6 py-6 space-y-2">
                {categoryList.map(({ id, title, type }) => (
                  <div key={id} className="mb-3">
                    <input
                      id={title}
                      type={type}
                      name="category"
                      value={title}
                      checked={category === title}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <label
                      htmlFor={title}
                      className="ml-3 text-sm font-medium cursor-pointer"
                    >
                      {title}
                    </label>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                  >
                    Reset Category
                  </button>
                </div>
              </div>

              {/* Ratings List  */}
              <p className="block w-full px-6 py-4 text-xs font-medium bg-gray-100">
                Ratings
              </p>

              <div className="px-6 py-6 space-y-2">
                {ratingList.map(({ id, type }) => (
                  <div key={id} className="mb-3">
                    <input id={id} type={type} name="rating" />

                    <label htmlFor={id} className="ml-3 text-sm font-medium">
                      <Rating
                        emptySymbol={<Unfilled />}
                        fullSymbol={<Star />}
                        initialRating={id + 1}
                        fractions={2}
                        readonly={true}
                        className="text-sm"
                      />
                    </label>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                  >
                    Reset Rating
                  </button>
                </div>
              </div>

              <div className="flex justify-between px-5 py-3 border-t border-gray-200">
                <button
                  name="reset"
                  type="button"
                  className="text-xs font-medium text-gray-600 underline rounded"
                >
                  Reset All
                </button>

                <input
                  type="submit"
                  className="px-5 py-2 text-sm bg-gray-800 text-white rounded-md font-medium"
                  value="Apply Filters"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3 mt-2 xl:ml-4">
          <div className="py-3 flex items-center justify-between">
            {keyword && (
              <div>
                <h1 className="text-xl sm:text-2xl font-medium">
                  Searching : {keyword}
                </h1>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <span className="hidden sm:inline">Showing</span>{" "}
              {products?.length} of {total} Products
            </div>

            <div className="relative text-sm focus:outline-none group mt-4 sm:mt-0">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="text-sm rounded px-2.5 py-1 "
              >
                <option value="price-asc">Price, Low-High</option>
                <option value="price-desc">Price, High-Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading &&
              skeleton.map((product) => <SkeletonLoad key={product} />)}

            {filteredProducts.map((p) => (
              <Product key={p._id} pro={p} />
            ))}
          </div>

          <div className="flex items-center justify-center my-6 sm:my-12">
            {products?.length === 0 && !loading && (
              <img width="25%" src={noProduct} alt="product" />
            )}
          </div>

          <div className="flex items-center justify-end mt-12 sm:mt-20">
            {Array.from(Array(pages).keys()).map((btn) => (
              <button
                key={btn}
                onClick={() => setPageNumber(btn + 1)}
                className={`${
                  btn + 1 === pageNumber &&
                  "bg-gray-500 text-white hover:bg-gray-700"
                } bg-white text-gray-900 py-1.5 sm:py-2 px-4 sm:px-5 border border-gray-600 hover:bg-gray-200`}
              >
                {btn + 1}
              </button>
            ))}
            <button className="py-1.5 sm:py-2 px-4 sm:px-5 bg-white text-gray-600 border border-gray-600 hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
