import { createBrowserRouter } from "react-router-dom";
import { App } from "@/App";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { CartPage } from "@/pages/CartPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { AboutPage } from "@/pages/AboutPage";
import { BlogPage } from "@/pages/BlogPage";
import { ContactsPage } from "@/pages/ContactsPage";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { UsersPage } from "@/pages/admin/UsersPage";
import { ProductsPage } from "@/pages/admin/ProductsPage";
import { OrdersPage } from "@/pages/admin/OrdersPage";
import { ProfilePage } from "@/pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { path: "users", element: <UsersPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "orders", element: <OrdersPage /> },
        ],
      },
    ],
  },
]);
