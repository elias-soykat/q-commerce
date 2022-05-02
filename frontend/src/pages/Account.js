import React from "react";
import { EmailIcon, NameIcon } from "../assets/svg";
import { Input, Label } from "../components/Common";

export default function Account() {
  const handleInputChange = () => {};
  return (
    <section className="my-20 pt-20">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
        <div className="shadow p-5 sm:p-6">
          <img
            width="25%"
            src="https://res.cloudinary.com/q-commerce/image/upload/v1651419616/avatars/ooozeaycdvpjuw7qhi60.jpg"
            alt="user"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-medium mt-2">
            Elias Soykat
          </h1>

          <p className="text-gray-500 my-2 font-medium">Software Engineer</p>
          <input className="my-4 text-sm" type="file" name="" id="" />
        </div>
        <div className="shadow p-5 sm:p-6">
          <h2 className="text-center font-medium text-lg sm:text-xl">
            General information
          </h2>

          {/* Name  */}

          <div className="flex flex-col my-6">
            <Label f="text">Name</Label>
            <div className="relative">
              <Input
                icon={<NameIcon />}
                name="text"
                plc="Your name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                icon={<EmailIcon />}
                name="email"
                plc="Your Email"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
