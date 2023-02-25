import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EmailIcon, NameIcon } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import {
  clearErrors,
  loadUserAction,
  updateProfile,
  UPDATE_PROFILE_RESET,
} from "../../redux/actions/userAction";
import { Container, Input, Label } from "../Common";

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
      <div className="mx-auto mt-16 mb-6 sm:w-10/12 md:my-20 md:w-8/12 lg:w-6/12 xl:w-5/12">
        <MetaData title="Update Profile | Q - Sneakers" />
        {loading && <Loading />}
        <form
          className="mt-8 rounded-md bg-white px-4 py-5 shadow sm:px-12 sm:py-14"
          onSubmit={updateProfileSubmit}
        >
          <h2 className="pt-8 pb-8 text-center text-2xl font-medium sm:pt-0 sm:pb-12">
            Update Profile
          </h2>

          {/* Name  */}

          <div className="mb-6 flex flex-col">
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

          <div className="mb-5 flex flex-col">
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
          <div className="mb-5 flex flex-col">
            <Label f="avatar">Avatar</Label>
            <div className="mt-1 flex justify-between">
              <img width="11%" src={avatar} alt="user" />
              <div className="relative rounded-lg duration-500 hover:bg-gray-100">
                <input
                  type="file"
                  onChange={handleInputChange}
                  name="avatar"
                  accept="image/*"
                  className="w-full rounded-lg py-2 pl-11 text-sm placeholder-gray-500 placeholder:italic focus:border-gray-600 focus:outline-none"
                  placeholder="Your File"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/password/forget"
              className="inline-flex pt-2 text-xs italic sm:text-sm"
            >
              Forgot Your Password ?
            </Link>
          </div>

          <div className="my-6">
            <input
              type="submit"
              value="Update Profile"
              className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 py-2.5 text-center text-sm font-medium text-white duration-500 hover:bg-gray-600 sm:text-base"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
