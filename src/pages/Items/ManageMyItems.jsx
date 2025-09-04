import React, { useContext, useEffect, useState } from 'react';
import Authcontext from '../../context/Authcontext/Authcontext';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Package, 
  MapPin, 
  Calendar,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

const ManageMyItems = () => {
  const { user } = useContext(Authcontext);
  const { theme } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://find-connect-server.vercel.app/addedItems?email=${user.email}`, { withCredentials: true })
        .then((res) => {
          setItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user.email]);

  const handleDelete = (itemId, itemTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${itemTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://find-connect-server.vercel.app/addedItems/${itemId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#8b5cf6",
            });
            setItems(items.filter((i) => i._id !== itemId));
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete item. Please try again.",
              icon: "error",
              confirmButtonColor: "#8b5cf6",
            });
          });
      }
    });
  };

  const getStatusColor = (status) => {
    if (status === 'found') return 'text-green-600 dark:text-green-400';
    if (status === 'notFound') return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getStatusIcon = (status) => {
    if (status === 'found') return <CheckCircle className="w-4 h-4" />;
    if (status === 'notFound') return <AlertCircle className="w-4 h-4" />;
    return <Package className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-20">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <h1 className={`text-2xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Manage My Items
            </h1>
          </div>
          <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {items.length > 0 ? `You have ${items.length} item${items.length !== 1 ? 's' : ''}` : 'You have not added any items yet.'}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-6xl mx-auto p-4 md:p-6 rounded-2xl shadow-xl ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse md:text-base">
                <thead>
                  <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Item Details
                    </th>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category
                    </th>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location
                    </th>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date
                    </th>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Status
                    </th>
                    <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm truncate max-w-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          theme === 'dark' 
                            ? 'bg-purple-900 text-purple-300' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {item.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center gap-2 ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="capitalize">{item.status === 'notFound' ? 'Lost' : item.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => navigate(`/updateItems/${item._id}`)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(item._id, item.title)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                No items found
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Start adding lost or found items to manage them here!
              </p>
              <motion.button
                onClick={() => navigate('/addItems')}
                className="flex items-center gap-2 px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Add Your First Item
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageMyItems;