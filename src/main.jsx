import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./Components/NotFound.jsx";
const LazyProductList = lazy(() => import("./Components/ProductList.jsx"));
const LazyProductDetails = lazy(() => import("./Components/ProductDetail.jsx"));
import { Provider } from "react-redux";
import { appStore } from "./utils/Redux/store.js";
import Loader from "./Components/Loader.jsx";

const LazyProductCheckout = lazy(() => import("./Components/CheckOut.jsx"));
const LazyProductCart = lazy(() => import("./Components/Cart.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <LazyProductList />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <LazyProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <LazyProductCart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <LazyProductCheckout />
          </Suspense>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
