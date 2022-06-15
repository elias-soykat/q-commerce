import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import noProduct from "../assets/no-product.png";
import { CloseNavBar, NavHamburger, Star, Unfilled } from "../assets/svg";
import { Container } from "../components/Common";
import { Product } from "../components/Product";
import { Loading, MetaData, SkeletonLoad } from "../helper";
import { categoryList, ratingList } from "../helper/helperObj";
import { getProducts } from "../redux/actions/productAction";

let skeleton = [0, 1, 2, 3, 4, 5];
export default function AllProducts() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [sort, setSort] = useState("price-asc");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  const { keyword } = useParams();

  const { products, loading, pages, total, err } = useSelector(
    (state) => state.productsList
  );

  // asc => low to high
  // desc => high to low
  useEffect(() => {
    dispatch(getProducts(pageNumber, keyword, category));
  }, [category, dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
    }

    if (sort === "price-asc") {
      const result = products?.sort((a, b) => a.price - b.price) || [];
      setFilteredProducts([...result]);
    } else if (sort === "price-desc") {
      const result = products?.sort((a, b) => b.price - a.price) || [];
      setFilteredProducts([...result]);
    }
  }, [err, products, sort]);

  const title = keyword ? `Search for ${keyword}` : "All Products";

  return (
    <Container bg="bg-white">
      <MetaData title={`${title} | Q - Sneakers`} />
      {loading && <Loading />}
      <div className="my-16 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
        <div className="lg:sticky lg:top-36">
          <div className="overflow-hidden rounded">
            <div
              onClick={() => setToggle(!toggle)}
              className="flex items-center justify-between bg-gray-100 px-5  py-5 lg:hidden"
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
              <p className="block w-full bg-gray-100 px-6 py-4 text-xs font-medium">
                Category
              </p>

              {/* Category List  */}
              <div className="space-y-2 px-6 py-6">
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
                      className="ml-3 cursor-pointer text-sm font-medium"
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
              <p className="block w-full bg-gray-100 px-6 py-4 text-xs font-medium">
                Ratings
              </p>

              <div className="space-y-2 px-6 py-6">
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

              <div className="flex justify-between border-t border-gray-200 px-5 py-3">
                <button
                  name="reset"
                  type="button"
                  className="rounded text-xs font-medium text-gray-600 underline"
                >
                  Reset All
                </button>

                <input
                  type="submit"
                  className="rounded-md bg-gray-800 px-5 py-2 text-sm font-medium text-white"
                  value="Apply Filters"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="mt-2 lg:col-span-3 xl:ml-4">
          <div className="flex items-center justify-between py-3">
            {keyword && (
              <div>
                <h1 className="text-xl font-medium sm:text-2xl">
                  Searching : {keyword}
                </h1>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <span className="hidden sm:inline">Showing</span>{" "}
              {products?.length} of {total} Products
            </div>

            <div className="group relative mt-4 text-sm focus:outline-none sm:mt-0">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="rounded px-2.5 py-1 text-sm "
              >
                <option value="price-asc">Price, Low-High</option>
                <option value="price-desc">Price, High-Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {loading &&
              skeleton.map((product) => <SkeletonLoad key={product} />)}

            {filteredProducts.map((p) => (
              <Product key={p._id} pro={p} />
            ))}
          </div>

          {products === undefined && (
            <img
              width="25%"
              src={noProduct}
              className="mt-12 flex items-center justify-center sm:mt-20"
              alt="product"
            />
          )}
          <div className="my-6 flex items-center justify-center sm:my-12">
            {products?.length === 0 && !loading && (
              <img width="25%" src={noProduct} alt="product" />
            )}
          </div>

          <div className="mt-12 flex items-center justify-end sm:mt-20">
            {Array.from(Array(pages).keys()).map((btn) => (
              <button
                key={btn}
                onClick={() => setPageNumber(btn + 1)}
                className={`${
                  btn + 1 === pageNumber &&
                  "bg-gray-500 text-white hover:bg-gray-700"
                } border border-gray-600 bg-white py-1.5 px-4 text-gray-900 hover:bg-gray-200 sm:py-2 sm:px-5`}
              >
                {btn + 1}
              </button>
            ))}
            <button className="border border-gray-600 bg-white py-1.5 px-4 text-gray-600 hover:bg-gray-200 sm:py-2 sm:px-5">
              Next
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
