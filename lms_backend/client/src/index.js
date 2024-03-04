import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import Homepage from "./components/Homepage";
import Aboutus from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import SearchBooks from "./components/SearchBooks";
import Issuedbooks from './components/Issuedbooks';
import BookDescforUser from "./components/BookDescforUser";
import Changepassword from "./components/Changepassword";
import AdminDashboard from "./components/AdminDashboard";
import UserSearch from "./components/UserSearch";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile"
import AddBook from "./components/AddBook";
import BookSearch from "./components/BookSearch";
import BookDesc from "./components/BookDesc";
import UserDesc from "./components/UserDesc";
import BookMarkedbooks from "./components/BookMarkedBooks";
import History from "./components/History";
import NotReturned from "./components/NotReturned";
import BooksTakenSearch from "./components/BooksTakenSearch";
import BookReturn from "./components/BookReturn";
import UpdateBook from "./components/UpdateBook";
import 'bootstrap/dist/css/bootstrap.min.css';

export const store = createContext(null);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/signin",
      element: <SigninPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/home",
      element: <Homepage />,
    },
    {
      path: "/aboutus",
      element: <Aboutus />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
    {
      path: "/searchBooks",
      element: <SearchBooks />,
    },
    {
      path: "/BookDescforUser/:BookISBN",
      element: <BookDescforUser />,
    },
    {
      path: "/issuedbooks",
      element: <Issuedbooks />,
    },
    {
      path: "/changePassword",
      element: <Changepassword />,
    },
    {
      path: "/editProfile",
      element: <EditProfile />,
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
    {
      path: "/UserSearch",
      element: <UserSearch />,
    },
    {
      path: "/UserDesc/:UserRoll",
      element: <UserDesc />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/Addbook",
      element: <AddBook />
    },
    {
      path: "/BookSearch",
      element: <BookSearch />,
    },
    {
      path: "/BookDesc/:BookISBN",
      element: <BookDesc />,
    },
    {
      path:"/bookmarkedbooks",
      element:<BookMarkedbooks/>
    },
    {
      path:"/history",
      element:<History/>
    },
    {
      path :"/notreturn",
      element:<NotReturned/>
    },
    {
      path :"/bookstakensearch",
      element:<BooksTakenSearch/>
    },
    {
      path:"/bookReturn",
      element:<BookReturn/>
    },
    {
      path:"/updateBook/:id",
      element:<UpdateBook/>
    }
  ]);

  return (
    <store.Provider value={{ token, setToken, adminToken, setAdminToken }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </store.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));