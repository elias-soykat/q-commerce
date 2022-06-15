import { Link } from "react-router-dom";

export default function Button({ children, size, to = "" }) {
  return (
    <Link
      to={to}
      type="button"
      className={`block rounded-md bg-gray-600 text-center text-sm font-medium text-white duration-500 hover:bg-gray-500 ${size}`}
    >
      {children}
    </Link>
  );
}
