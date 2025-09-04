import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import Authcontext from '../../context/Authcontext/Authcontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import { 
  Upload, 
  MapPin, 
  Calendar, 
  Tag, 
  FileText, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Plus
} from 'lucide-react';
import axios from 'axios';

const AddItem = () => {
  const navigate = useNavigate();
  const { user } = useContext(Authcontext);
  const { theme } = useContext(ThemeContext);
  const [postType, setPostType] = useState('Lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState('');
  const [date, setDate] = useState(new Date());
  const [contactName, setContactName] = useState(user?.displayName || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = [
    'Electronics', 'Accessories', 'Personal Items', 'Pets', 'Bags', 
    'Documents', 'Clothing', 'Books', 'Sports', 'Jewelry', 'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!file.trim()) newErrors.file = 'Image URL is required';
    if (!contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';

    setErrors(newErrors);

    // If there are errors, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      const errorFields = Object.keys(newErrors).map(field => {
        const fieldNames = {
          title: 'Title',
          description: 'Description',
          category: 'Category',
          location: 'Location',
          file: 'Image URL',
          contactName: 'Contact Name',
          contactEmail: 'Contact Email'
        };
        return fieldNames[field];
      }).join(', ');

      Swal.fire({
        icon: 'warning',
        title: 'Missing Required Fields',
        html: `
          <div class="text-left">
            <p class="mb-3">Please fill out the following required fields:</p>
            <ul class="list-disc list-inside text-red-600">
              ${Object.keys(newErrors).map(field => `<li>${newErrors[field]}</li>`).join('')}
            </ul>
          </div>
        `,
        confirmButtonColor: '#8b5cf6',
      });
      setIsSubmitting(false);
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
      status: postType === 'Lost' ? 'notFound' : 'found',
      contactInfo: { 
        name: contactName || user?.displayName || 'Anonymous', 
        email: contactEmail || user?.email || '',
        phone: contactPhone
      },
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
          title: 'Success!',
          text: `Your ${postType.toLowerCase()} item has been posted successfully!`,
          confirmButtonColor: '#8b5cf6',
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
        confirmButtonColor: '#8b5cf6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateImageUrl = (url) => {
    const img = new Image();
    img.onload = () => {
      setFile(url);
      setErrors(prev => ({ ...prev, file: null }));
    };
    img.onerror = () => {
      setFile('');
      setErrors(prev => ({ ...prev, file: 'Please enter a valid image URL' }));
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Image URL',
        text: 'Please enter a valid image URL',
        confirmButtonColor: '#8b5cf6',
      });
    };
    img.src = url;
  };

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Report {postType} Item
            </h1>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Help us connect lost items with their owners or finders
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-xl ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Post Type Selection */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  postType === 'Lost' 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : theme === 'dark' 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPostType('Lost')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${postType === 'Lost' ? 'bg-red-100 dark:bg-red-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <AlertCircle className={`w-6 h-6 ${postType === 'Lost' ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${postType === 'Lost' ? 'text-red-600 dark:text-red-400' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lost Item
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Report a lost item
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  postType === 'Found' 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : theme === 'dark' 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPostType('Found')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${postType === 'Found' ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <CheckCircle className={`w-6 h-6 ${postType === 'Found' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${postType === 'Found' ? 'text-green-600 dark:text-green-400' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Found Item
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Report a found item
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                             <div>
                 <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                   <FileText className="inline w-4 h-4 mr-2" />
                   Title *
                 </label>
                 <input
                   type="text"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   onBlur={() => handleFieldBlur('title')}
                   placeholder="Enter item title"
                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                     theme === 'dark' 
                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                   } ${getFieldError('title') ? 'border-red-500 focus:ring-red-500' : ''}`}
                   required
                 />
                 {getFieldError('title') && (
                   <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                 )}
               </div>

              <div>
                <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Tag className="inline w-4 h-4 mr-2" />
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={() => handleFieldBlur('category')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${getFieldError('category') ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {getFieldError('category') && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

                         {/* Image Upload */}
             <div>
               <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                 <Camera className="inline w-4 h-4 mr-2" />
                 Image URL *
               </label>
               <div className="relative">
                 <input
                   type="url"
                   onChange={(e) => validateImageUrl(e.target.value)}
                   onBlur={() => handleFieldBlur('file')}
                   placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                   className={`w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                     theme === 'dark' 
                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                   } ${getFieldError('file') ? 'border-red-500 focus:ring-red-500' : ''}`}
                   required
                 />
                 <Upload className="absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
               </div>
               {getFieldError('file') && (
                 <p className="mt-1 text-sm text-red-500">{errors.file}</p>
               )}
               {file && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="mt-3"
                 >
                   <img 
                     src={file} 
                     alt="Preview" 
                     className="w-32 h-32 object-cover rounded-lg border"
                     onError={() => setFile('')}
                   />
                 </motion.div>
               )}
             </div>

                         {/* Description */}
             <div>
               <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                 <FileText className="inline w-4 h-4 mr-2" />
                 Description *
               </label>
               <textarea
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 onBlur={() => handleFieldBlur('description')}
                 placeholder="Provide a detailed description of the item..."
                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${
                   theme === 'dark' 
                     ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                     : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                 } ${getFieldError('description') ? 'border-red-500 focus:ring-red-500' : ''}`}
                 rows="4"
                 required
               />
               {getFieldError('description') && (
                 <p className="mt-1 text-sm text-red-500">{errors.description}</p>
               )}
             </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                             <div>
                 <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                   <MapPin className="inline w-4 h-4 mr-2" />
                   Location *
                 </label>
                 <input
                   type="text"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   onBlur={() => handleFieldBlur('location')}
                   placeholder="Where was it lost/found?"
                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                     theme === 'dark' 
                       ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                       : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                   } ${getFieldError('location') ? 'border-red-500 focus:ring-red-500' : ''}`}
                   required
                 />
                 {getFieldError('location') && (
                   <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                 )}
               </div>

              <div>
                <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Date *
                </label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  dateFormat="MMMM dd, yyyy"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`mb-4 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                 <div>
                   <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                     <User className="inline w-4 h-4 mr-2" />
                     Name *
                   </label>
                   <input
                     type="text"
                     value={contactName}
                     onChange={(e) => setContactName(e.target.value)}
                     onBlur={() => handleFieldBlur('contactName')}
                     placeholder="Your name"
                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                       theme === 'dark' 
                         ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                     } ${getFieldError('contactName') ? 'border-red-500 focus:ring-red-500' : ''}`}
                   />
                   {getFieldError('contactName') && (
                     <p className="mt-1 text-sm text-red-500">{errors.contactName}</p>
                   )}
                 </div>

                 <div>
                   <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                     <Mail className="inline w-4 h-4 mr-2" />
                     Email *
                   </label>
                   <input
                     type="email"
                     value={contactEmail}
                     onChange={(e) => setContactEmail(e.target.value)}
                     onBlur={() => handleFieldBlur('contactEmail')}
                     placeholder="your@email.com"
                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                       theme === 'dark' 
                         ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                     } ${getFieldError('contactEmail') ? 'border-red-500 focus:ring-red-500' : ''}`}
                   />
                   {getFieldError('contactEmail') && (
                     <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>
                   )}
                 </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-4 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 ${
                theme === 'dark' ? 'shadow-lg' : 'shadow-md'
              }`}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Submit {postType} Item
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddItem;
