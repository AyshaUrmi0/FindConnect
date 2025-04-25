import {
    createBrowserRouter,
  } from "react-router-dom";
 import MainLayout from "../layouts/MainLayout";
import AddItem from '../pages/Items/AddItem';
import Login from "../pages/Auth/Login";
import Register from '../pages/Auth/Register';
 import UpdateItem from '../pages/Items/UpdateItem';
import AllItems from "../pages/Items/AllItems";
  import ItemDetails from "../pages/Items/ItemDetails";
 import ManageMyItems from "../pages/Items/ManageMyItems";
  import AllRecoveredItems from "../pages/Items/AllRecoveredItems";
  
  import NotFound from "../pages/NotFound";
import Banner from "../pages/Home/Banner";
import PrivateRoute from "../router/PrivateRoute";
import LatestItems from "../pages/Home/LatestItems";
import PopularCategories from "../pages/Home/PopularCategories";
import Testimonials from "../pages/Home/Testimonials";
import HowItWorks from "../pages/Items/HowItWorks";
// import ImageProcessSection from "../pages/Home/ImageProcessSection ";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />, 
      errorElement: <NotFound />, 
      children: [
        {
          path: "/",
          element: <>
          <Banner />
          <LatestItems />
          {/* <ImageProcessSection/> */}
          <PopularCategories />
          <Testimonials />
          </> 
         
        },
        {
          path: "/login",
          element: <Login />, 
        },
        {
          path: "/register",
          element: <Register />, 
        },
        {
          path: "/addItems",
          element: <PrivateRoute><AddItem /></PrivateRoute>,
        },
       
        {
          path: "/updateItems/:id",
          element: <PrivateRoute><UpdateItem /></PrivateRoute>, 
        },
        {
          path: "/allItems", 
          element: <AllItems />, 
        },
        { path: "/how-it-works",
          element: <HowItWorks></HowItWorks>

        },
        {
          path: "/items/:id",
          element: <PrivateRoute><ItemDetails /></PrivateRoute>, 
          loader:({params})=>fetch(`https://find-connect-server.vercel.app/items/${params.id}`)
        },
        {
          path: "/myItems",
          element: <PrivateRoute><ManageMyItems /></PrivateRoute>, 
        },
        {
          path: "/recoveredItems",
          element: <PrivateRoute><AllRecoveredItems /></PrivateRoute>,
        },
      ],
    },
  ]);
  
  export default router;
  
