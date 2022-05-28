import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loading, MetaData } from "../helper";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Common";

export default function Account() {
  const navigate = useNavigate();

  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) return navigate("/auth/login");
  }, [isAuthenticated, navigate]);

  const userName = user?.name;

  return (
    <Container>
      <MetaData
        title={`${
          userName ? userName + "'s Profile" : "Profile"
        } | Q - Commerce`}
      />
      {loading && <Loading />}
      <div className="container mt-16 flex flex-wrap justify-center items-center">
        <div className="shadow-lg px-6 py-8">
          <h3 className="font-medium py-5 text-2xl">My Profile</h3>
          <img width="25%" src={user?.avatar.url} alt="user" />
          <br />
          <h1 className="text-lg sm:text-xl md:text-2xl font-medium mt-2">
            {user?.name}
          </h1>
          <p className="text-gray-500 mt-1 mb-6 font-medium">
            Software Developer
          </p>
          <Link
            className="bg-neutral-500 text-white px-7 font-medium rounded-md py-3"
            to="/user/update"
          >
            Edit Profile
          </Link>
        </div>
        <div className="shadow-lg px-4 py-8 sm:ml-8">
          <h2 className="text-left font-medium text-lg sm:text-2xl">
            General information
          </h2>
          <br />
          <p className="my-2 font-medium">1. User: {user?._id}</p>
          <p className="my-2 font-medium">2. Email: {user?.email}</p>
          <p className="my-2 font-medium">
            3. Joined: {new Date(user?.createdAt).toLocaleString()}
          </p>
          <p className="my-2 font-medium">4. Role: {user?.role}</p>

          <br />
          <Link
            to="/"
            className="bg-slate-600 text-white py-2 px-4 rounded-md shadow-md mr-2"
          >
            My Orders
          </Link>
          <Link
            to="/password/update"
            className="bg-gray-700 text-white py-2 px-4 rounded-md shadow-md"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Container>
  );
}
