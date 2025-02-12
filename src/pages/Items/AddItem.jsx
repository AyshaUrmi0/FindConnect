import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Authcontext from '../../context/Authcontext/Authcontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const AddItem = () => {
  const navigate = useNavigate();
  const { user } = useContext(Authcontext);
  const [postType, setPostType] = useState('Lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState('');
  const [date, setDate] = useState(new Date());


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !location) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill out all required fields!',
      });
      return;
    }

    const formData = {
      postType,
      title,
      image: file,
      description,
      category,
      location,
      date,
      status:"notFound",
      contactInfo: { name: user?.displayName || 'Anonymous', email: user?.email || '' },
    };

    console.log(formData);







    try {
      const response = await fetch('https://find-connect-server.vercel.app/addedItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // const response= await axios.post('https://find-connect-server.vercel.app/addedItems',formData)
      // .then((res) => {
      //   console.log(res);
      // })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your post has been added successfully!',
        }).then(() => {
          navigate('/myItems'); // Navigate after closing the Swal alert
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again!',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl p-6 mx-auto mt-20 mb-20 bg-white rounded-lg shadow-lg"
    >
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-400">
        Lost and Found Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Post Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Type</label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image URL</label>
          <input
            type="text"
           

            onChange={(e) => setFile(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a detailed description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Lost or Found</label>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Information</label>
          <input
            type="text"
            value={user?.displayName || 'Anonymous'}
            disabled
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            onClick={handleSubmit}
            className="w-full p-3 font-medium text-white rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-red-600 focus:outline-none"
          >
            Add Post
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddItem;
