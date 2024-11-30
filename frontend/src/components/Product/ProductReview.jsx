import Rating from "react-rating";
import { Star, Unfilled } from "../../assets/svg";

export default function ProductReview({ pro }) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl  py-12 px-4 md:py-20 md:px-12">
        <h2 className="text-xl font-bold sm:text-2xl">Customer Reviews</h2>
        <div className="my-6 flex items-center">
          <p className="text-3xl font-medium">
            3.8
            <span className="sr-only">Average review score </span>
          </p>

          <div className="ml-4">
            <Rating
              emptySymbol={<Unfilled />}
              fullSymbol={<Star />}
              initialRating={3}
              fractions={2}
              readonly={true}
              className="text-sm"
            />
            <p className="mt-0.5 text-xs text-gray-500">Based on 48 reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:w-9/12 lg:w-8/12">
          {pro.reviews.map((r) => (
            <blockquote
              key={r._id}
              className="my-2 border-b border-gray-300 py-4 sm:my-2.5"
            >
              <header className="justify-between pt-1 sm:flex sm:items-center">
                <p className="text-lg font-medium">{r.comment}</p>
                <Rating
                  emptySymbol={<Unfilled />}
                  fullSymbol={<Star />}
                  initialRating={r.rating}
                  fractions={2}
                  readonly={true}
                  className="mt-2 text-sm sm:mt-0"
                />
              </header>
              <p className="my-2 text-sm text-gray-500 sm:my-4">{r.comment}</p>

              <footer className="flex items-center py-1">
                <img className="w-8 sm:w-14" src={r.url} alt="user" />
                <div className=" ml-5">
                  <p className="inline">{r.name}</p>
                  <i className="ml-5 text-xs">12th January, 2024</i>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
