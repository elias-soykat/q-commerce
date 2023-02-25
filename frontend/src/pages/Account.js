import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Common";
import { Loading, MetaData } from "../helper";

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
        } | Q - Sneakers`}
      />
      {loading && <Loading />}
      <div className="container mt-16 flex flex-wrap items-center justify-center py-10">
        <div className="px-6 py-8 shadow-lg">
          <h4 className="py-5 text-xl font-medium text-gray-700">
            {user?.name}'s Profile
          </h4>
          <img width="25%" src={user?.avatar.url} alt="user" />
          <br />
          <h5 className="mt-2 text-lg font-medium sm:text-xl md:text-2xl">
            {user?.name}
          </h5>
          <p className="mt-1 mb-6 font-medium text-gray-500">
            Software Developer
          </p>
          <Link
            className="rounded-md bg-neutral-500 px-7 py-3 font-medium text-white"
            to="/user/update"
          >
            Edit Profile
          </Link>
        </div>
        <div className="px-4 py-8 shadow-lg sm:ml-8">
          <h2 className="text-left text-lg font-medium sm:text-2xl">
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
            to="/orders"
            className="mr-2 rounded-md bg-slate-600 py-3 px-4 text-white shadow-md"
          >
            My Orders
          </Link>
          <Link
            to="/password/update"
            className="rounded-md bg-gray-700 py-3 px-4 text-white shadow-md"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Container>
  );
}
