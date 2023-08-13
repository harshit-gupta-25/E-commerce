import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import HomePage from "./components/Home/Home";
import SignUpPage from "./components/SignUp/SignUp";
import LoginPage from "./components/Login/Login";
import ProductPage from "./components/Product/ProductPage";
import ProductList from "./components/Product/ProductList";
import CartPage from "./components/Cart/Cart";
import TopViewProductPage from "./components/TopViewProduct/TopViewProductPage";
import PageNotFound from "./components/ui/PageNotFound";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import "./App.css";

const ProductDetailsPage = lazy(() =>
  import("./components/Product/ProductDetailsPage")
);
const AddProductPage = lazy(() =>
  import("./components/Product/AddProductPage")
);
const EditProductPage = lazy(() =>
  import("./components/Product/EditProductPage")
);
const SuccessPage = lazy(() => import("./components/ui/Createsuccess"));
const ProfilePage = lazy(() => import("./components/Profile/ProfilePage"));
const ProfileViewPage = lazy(() => import("./components/Profile/ProfileView"));
const UpdatePassPage = lazy(() =>
  import("./components/Profile/UpdatePassForm")
);
const DeleteProfilePage = lazy(() =>
  import("./components/Profile/DeleteProfile")
);

function App() {
  const auth = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!auth.isLoggedIn && (
            <>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
          <Route path="/products" element={<ProductPage />}>
            <Route index element={<ProductList />} />
            {auth.isLoggedIn && (
              <>
                <Route path="add" element={<AddProductPage />} />
                <Route path=":id/:title/edit" element={<EditProductPage />} />
              </>
            )}
          </Route>
          <Route path="/:id/:title" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/topViewProduct" element={<TopViewProductPage />} />
          {auth.isLoggedIn && (
            <>
              <Route path="/createSuccess" element={<SuccessPage />} />
              <Route path="/:id/:title" element={<ProductDetailsPage />} />
              <Route path="/User/:mail" element={<ProfilePage />}>
                <Route path="profile" element={<ProfileViewPage />} />
                <Route path="updatePass" element={<UpdatePassPage />} />
                <Route path="deleteProfile" element={<DeleteProfilePage />} />
              </Route>
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
