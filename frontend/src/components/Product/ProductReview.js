import React from "react";
import Rating from "react-rating";
import { Star, Unfilled } from "../../assets/svg";

export default function ProductReview({ pro }) {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto  py-12 md:py-20 px-4 md:px-12">
        <h2 className="text-xl font-bold sm:text-2xl">Customer Reviews</h2>
        <div className="flex items-center my-6">
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

        <div className="md:w-9/12 lg:w-8/12 grid grid-cols-1">
          {[1, 2, 3].map((r) => (
            <blockquote
              key={r}
              className="my-2 sm:my-2.5 border-b border-gray-300 py-4"
            >
              <header className="sm:flex sm:items-center justify-between pt-1">
                <p className="font-medium text-lg">
                  The best thing money can buy!
                </p>
                <Rating
                  emptySymbol={<Unfilled />}
                  fullSymbol={<Star />}
                  initialRating={3}
                  fractions={2}
                  readonly={true}
                  className="text-sm mt-2 sm:mt-0"
                />
              </header>
              <p className="my-2 sm:my-4 text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                possimus fuga dolor rerum dicta, ipsum laboriosam est totam
                iusto alias incidunt cum tempore auam ipsam
              </p>

              <footer className="py-1 flex items-center">
                <img
                  className="w-8 sm:w-12"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvHpEOo3fTsZQkp5Hfd93YrByM9P4F944GylcXSwZ7xzop2YZo6KH7lFdu1FsdBJ3E8g&usqp=CAU"
                  alt=""
                />
                <div className=" ml-5">
                  <p className="inline">John Doe</p>
                  <i className="text-xs ml-5">12th January, 2024</i>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
