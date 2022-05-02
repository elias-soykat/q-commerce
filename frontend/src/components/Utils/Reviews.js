import React from "react";
import { RightArrow } from "../../assets/svg";
import { Button, Container, RatingStar, SectionHeader } from "../Common";

let data = [1, 2, 3];

export default function Reviews() {
  return (
    <Container>
      <div className="items-end justify-between sm:flex my-4 md:my-12">
        <div className="max-w-xl">
          <SectionHeader>Read trusted reviews from our customers</SectionHeader>
          <p className="max-w-lg mt-8 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            praesentium natus sapiente commodi. Aliquid sunt tempore iste
            repellendus explicab placeat, autem
          </p>
        </div>

        <Button size="inline-flex items-center flex-shrink-0 px-7 py-4 mt-8 font-medium rounded sm:mt-0 lg:mt-8">
          Read all reviews
          <RightArrow />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 mt-8 md:mt-10 sm:grid-cols-2 lg:grid-cols-3 mb-2 md:mb-6">
        {data.map((card) => (
          <blockquote
            key={card}
            className="flex flex-col justify-between h-full p-10 bg-white"
          >
            <div>
              <div className="flex space-x-0.5 text-green-500">
                <RatingStar />
              </div>

              <div className="mt-4">
                <h5 className="text-xl font-bold text-pink-700 sm:text-2xl">
                  Lorem ipsum dolor sit amet.
                </h5>

                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  cumque recusandae dolorum porro, quasi sunt
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <footer className="text-gray-500">Eddie Murphy</footer>
              <div>
                <img
                  width="50"
                  className=" rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbvHpEOo3fTsZQkp5Hfd93YrByM9P4F944GylcXSwZ7xzop2YZo6KH7lFdu1FsdBJ3E8g&usqp=CAU"
                  alt="avatar"
                />
              </div>
            </div>
          </blockquote>
        ))}
      </div>
    </Container>
  );
}
