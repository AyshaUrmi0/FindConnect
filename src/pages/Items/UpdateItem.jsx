import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Authcontext from "../../context/Authcontext/Authcontext";
import Loading from "../../layouts/Loading";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Authcontext);
  const [itemData, setItemData] = useState(null);

  
  useEffect(() => {
    fetch(`https://find-connect-server.vercel.app/addedItems/${id}`)
      .then((res) => res.json())
      .then((data) => setItemData(data))
      .catch((err) => console.error(err));

  // axios.get(`https://find-connect-server.vercel.app/addedItems/${id}`, { withCredentials: true })
  // .then(res => {
  //     setItemData(res.data);
  // })
  // .catch(err => {
  //     console.error(err);
  // });

//http://localhost:5173/updateItems/676b074cb0d5fcb5d3655e4c

  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemData.title || !itemData.description || !itemData.category || !itemData.location) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill out all required fields!",
      });
      return;
    }

    try {
        const response = await fetch(`https://find-connect-server.vercel.app/addedItems/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
          });
          

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your post has been updated successfully!",
        });
        navigate("/myItems");
      } else {
        throw new Error("Failed to update the post");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again!",
      });
    }
  };

  if (!itemData) {
    return <div>
        <Loading />
    </div>;
  }

  return (
    <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-center">Update Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Post Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Type</label>
          <select
            value={itemData.postType}
            onChange={(e) => setItemData({ ...itemData, postType: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={itemData.title}
            onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
            placeholder="Enter a title"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={itemData.description}
            onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
            placeholder="Enter a detailed description"
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={itemData.category}
            onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a category</option>
            <option value="Pets">Pets</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={itemData.location}
            onChange={(e) => setItemData({ ...itemData, location: e.target.value })}
            placeholder="Enter the location"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Lost or Found</label>
          <DatePicker
            selected={new Date(itemData.date)}
            onChange={(date) => setItemData({ ...itemData, date })}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Information</label>
          <input
            type="text"
            value={user?.displayName || "Anonymous"}
            disabled
            className="w-full p-2 bg-gray-100 border rounded-md"
          />
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 mt-2 bg-gray-100 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 font-medium text-white rounded-md bg-gradient-to-r from-orange-400 via-red-500 to-red-600 "
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
