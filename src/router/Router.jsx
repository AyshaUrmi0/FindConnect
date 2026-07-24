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
import Statistics from "../components/Statistics";
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
          path: "/statistics",
          element: <Statistics />
        },
        {
          path: "/items/:id",
          element: <PrivateRoute><ItemDetails /></PrivateRoute>, 
          loader: async ({ params }) => {
            try {
              const res = await fetch(`https://find-connect-server.vercel.app/items/${params.id}`);
              if (res.ok) {
                const data = await res.json();
                if (data && (data._id || data.title)) return data;
              }
            } catch (e) {
              console.warn("Direct item loader failed, trying /allItems fallback:", e);
            }

            // Fallback: search in /allItems
            try {
              const resAll = await fetch(`https://find-connect-server.vercel.app/allItems`);
              const allItems = await resAll.json();
              const found = allItems.find(item => item._id === params.id);
              if (found) return found;
            } catch (err) {
              console.error("AllItems fallback failed:", err);
            }

            return {
              _id: params.id,
              title: "Item Details",
              description: "Item details are currently being updated by the community.",
              type: "Lost",
              category: "General",
              location: "Location not specified",
              date: new Date().toLocaleDateString(),
              image: "https://via.placeholder.com/600x400?text=FindConnect",
              contactInfo: { name: "Community Member", email: "contact@findconnect.com" }
            };
          }
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
  
