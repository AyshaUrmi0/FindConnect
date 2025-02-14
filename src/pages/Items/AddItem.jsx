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
      status: "notFound",
      contactInfo: { name: user?.displayName || 'Anonymous', email: user?.email || '' },
    };

    try {
      const response = await fetch('https://find-connect-server.vercel.app/addedItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your post has been added successfully!',
        }).then(() => {
          navigate('/myItems');
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
      className="max-w-2xl p-6 mx-auto mt-20 mb-20 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <h1 className="mb-6 text-3xl font-bold text-center text-purple-500 dark:text-purple-400">
        Lost and Found Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 dark:bg-gray-800 ">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Post Type</label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Upload Image URL</label>
          <input
            type="text"
            onChange={(e) => setFile(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a detailed description"
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select a category</option>
            <option value="Pets">Pets</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 font-medium border-2 border-purple-500 rounded-lg hover:bg-purple-500 hover:text-white dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900"
          >
            Add Post
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddItem;
