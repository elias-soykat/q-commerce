import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Star, Unfilled } from "../../assets/svg";
import { newReview } from "../../redux/actions/productAction";
import { clearErrors } from "../../redux/actions/userAction";

export default function Modal({ toggle, displayModalHandler }) {
  const dispatch = useDispatch();
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const parentElement = document.getElementById("parent");
    if (parentElement) {
      parentElement.addEventListener("click", (e) => {
        const topChild = document.getElementById("child");
        if (topChild && !topChild.contains(e.target)) {
          displayModalHandler("none");
        }
      });
    }
  }, [displayModalHandler]);

  const { success, err } = useSelector((state) => state.newReview);

  const { user } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to review");
    }

    const myForm = new FormData();
    myForm.set("rating", star);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    myForm.set("userImg", user.avatar.url || "");

    dispatch(newReview(myForm));
    displayModalHandler("none");
  };

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Successfully Submitted");
      dispatch({ type: "NEW_REVIEW_RESET" });
    }
  }, [dispatch, err, success]);

  return toggle === "none" ? (
    <> </>
  ) : (
    <div
      id="parent"
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-[#7d7799] bg-opacity-60"
    >
      <div id="child" className="transition-opacity">
        <form
          onSubmit={reviewSubmitHandler}
          className="flex w-full flex-col items-start justify-center rounded-md bg-white p-3"
        >
          <div className="flex items-start">
            <textarea
              className="border"
              name="review"
              id=""
              cols="30"
              rows="4"
              required
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <p
              onClick={() => displayModalHandler("none")}
              className="cursor-pointer px-3 font-medium"
            >
              X
            </p>
          </div>
          <div className="flex items-center">
            <Rating
              emptySymbol={<Unfilled />}
              fullSymbol={<Star />}
              initialRating={star}
              fractions={2}
              onChange={(e) => setStar(e)}
              className="my-3 text-sm"
            />
            <p className="pl-5 text-sm">{star}</p>
          </div>
          <div className="flex">
            <button
              type="submit"
              value="Submit"
              className="mr-4 flex justify-center rounded-md bg-gray-800 px-6 py-1 text-sm text-white"
            >
              Submit
            </button>
            <button
              onClick={() => displayModalHandler("none")}
              className="flex justify-center rounded-md bg-gray-500 px-6 py-1 text-sm text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
