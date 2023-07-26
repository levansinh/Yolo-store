import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import DefaultLayout from "../layout/Layout";
import PropTypes from "prop-types";

const PrivateRoute = ({ route, children }) => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const roleAdmin = currentUser?.account.role ;

  let Layout = DefaultLayout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  }

  return roleAdmin === "Admin"? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to={"/"} state={{ from: location }} />
  );
};
PrivateRoute.propTypes = {
  route: PropTypes.any,
  children: PropTypes.any,
};
export default PrivateRoute;
