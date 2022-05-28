import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EmailIcon, NameIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { Container, Input, Label } from "../Common";
import {
  clearErrors,
  loadUserAction,
  updateProfile,
  UPDATE_PROFILE_RESET,
} from "../../redux/actions/userAction";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, err } = useSelector((state) => state.profile);

  const handleInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }

    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUserAction());
      navigate("/account");
      toast.success("Profile Updated Successfully");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, err, isUpdated, navigate, user]);

  return (
    <Container>
      <div className="mt-16 mb-6 md:my-20 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <MetaData title="Update Profile | Q - Commerce" />
        {loading && <Loading />}
        <form
          className="mt-8 bg-white px-4 py-5 sm:px-12 sm:py-14 rounded-md shadow"
          onSubmit={updateProfileSubmit}
        >
          <h2 className="text-2xl pt-8 sm:pt-0 pb-8 sm:pb-12 text-center font-medium">
            Update Profile
          </h2>

          {/* Name  */}

          <div className="flex flex-col mb-6">
            <Label f="name">Name</Label>
            <div className="relative">
              <Input
                type="text"
                name="name"
                value={name}
                plc="Enter Your Name"
                icon={<NameIcon />}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email  */}

          <div className="flex flex-col mb-5">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email}
                plc="Enter Your Email"
                icon={<EmailIcon />}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* File  */}
          <div className="flex flex-col mb-5">
            <Label f="avatar">Avatar</Label>
            <div className="flex justify-between mt-1">
              <img width="11%" src={avatar} alt="user" />
              <div className="relative duration-500 hover:bg-gray-100 rounded-lg">
                <input
                  type="file"
                  onChange={handleInputChange}
                  name="avatar"
                  accept="image/*"
                  className="text-sm placeholder:italic placeholder-gray-500 pl-11 rounded-lg w-full py-2 focus:outline-none focus:border-gray-600"
                  placeholder="Your File"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <a
              href="/"
              className="inline-flex text-xs sm:text-sm italic border-b"
            >
              Forgot Your Password ?
            </a>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Update Profile"
              className="cursor-pointer w-full py-2.5 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
