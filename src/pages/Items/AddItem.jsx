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
  Plus,
  Sparkles,
  Wand2
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
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = [
    'Electronics', 'Accessories', 'Personal Items', 'Pets', 'Bags', 
    'Documents', 'Clothing', 'Books', 'Sports', 'Jewelry', 'Other'
  ];

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setFile(result); // Use Data URL as preview/image string
      setBase64Image(result.split(',')[1]);
      setErrors(prev => ({ ...prev, file: null }));
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAiAutoFill = async () => {
    if (!file) {
      Swal.fire({
        icon: 'info',
        title: 'Image Required',
        text: 'Please upload an image or enter an Image URL first so the AI can analyze it!',
        confirmButtonColor: '#8b5cf6',
      });
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      Swal.fire({
        icon: 'warning',
        title: 'Gemini API Key Required',
        html: `
          <div class="text-left space-y-2">
            <p>To use <strong>AI Auto-Fill</strong>, add your free Gemini API key to your <code>.env</code> file:</p>
            <pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-purple-600">VITE_GEMINI_API_KEY=your_gemini_api_key</pre>
            <p class="text-xs text-gray-500">You can get a free API key in 30 seconds at <a href="https://aistudio.google.com" target="_blank" class="text-purple-600 underline font-semibold">aistudio.google.com</a></p>
          </div>
        `,
        confirmButtonColor: '#8b5cf6',
      });
      return;
    }

    setIsAiLoading(true);

    try {
      let imagePayloadData = base64Image;
      let mimeType = 'image/jpeg';

      if (!imagePayloadData) {
        // If image is a remote URL, fetch and convert to base64
        try {
          const response = await fetch(file);
          const blob = await response.blob();
          mimeType = blob.type || 'image/jpeg';
          
          imagePayloadData = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (fetchErr) {
          throw new Error('Remote image could not be fetched due to CORS. Try uploading a local file instead!');
        }
      }

      const promptText = `Analyze this image of a lost or found item. Return ONLY a raw JSON object (without markdown fences or code blocks) with exact keys:
"title": a concise 3-6 word title,
"category": choose EXACTLY one from [${categories.join(', ')}],
"description": a clear 2-3 sentence detailed description of visual features, color, brand, condition, and key identifiers.`;

      // Try multiple model aliases in case a specific model string is deprecated or restricted
      const modelsToTry = [
        "gemini-flash-latest",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash-lite",
        "gemini-1.5-flash-latest"
      ];


      let data = null;
      let lastErrorMessage = '';

      for (const modelName of modelsToTry) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: promptText },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: imagePayloadData
                    }
                  }
                ]
              }]
            })
          });

          const jsonRes = await res.json();
          if (!jsonRes.error && jsonRes?.candidates?.[0]?.content?.parts?.[0]?.text) {
            data = jsonRes;
            break; // Successfully got a response from this model!
          } else {
            lastErrorMessage = jsonRes.error?.message || 'Model error';
          }
        } catch (fetchError) {
          lastErrorMessage = fetchError.message;
        }
      }

      if (!data) {
        throw new Error(lastErrorMessage || 'Gemini API request failed on available models.');
      }


      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('No analysis text returned from Gemini API');

      const cleanedJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanedJsonText);

      if (parsed.title) {
        setTitle(parsed.title);
        setErrors(prev => ({ ...prev, title: null }));
      }
      if (parsed.category && categories.includes(parsed.category)) {
        setCategory(parsed.category);
        setErrors(prev => ({ ...prev, category: null }));
      }
      if (parsed.description) {
        setDescription(parsed.description);
        setErrors(prev => ({ ...prev, description: null }));
      }

      Swal.fire({
        icon: 'success',
        title: '✨ AI Auto-Fill Complete!',
        text: 'Title, Category, and Description have been generated by Gemini AI.',
        confirmButtonColor: '#8b5cf6',
      });
    } catch (err) {
      console.error('AI Auto-Fill Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'AI Analysis Failed',
        text: err.message || 'Failed to analyze image with AI.',
        confirmButtonColor: '#8b5cf6',
      });
    } finally {
      setIsAiLoading(false);
    }
  };


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
             {/* Image Upload & AI Auto-Fill */}
             <div className="p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                 <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                   <Camera className="inline w-4 h-4 mr-2 text-purple-500" />
                   Item Photo *
                 </label>
                 
                 <motion.button
                   type="button"
                   onClick={handleAiAutoFill}
                   disabled={isAiLoading || !file}
                   whileHover={{ scale: 1.03 }}
                   whileTap={{ scale: 0.97 }}
                   className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                 >
                   {isAiLoading ? (
                     <>
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                       Analyzing with AI...
                     </>
                   ) : (
                     <>
                       <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
                       Auto-Fill Details with AI ✨
                     </>
                   )}
                 </motion.button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                   <label className={`block text-xs mb-1 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                     Option A: Upload Local Image File
                   </label>
                   <input
                     type="file"
                     accept="image/*"
                     onChange={handleFileUpload}
                     className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                       theme === 'dark' ? 'file:bg-gray-700 file:text-purple-300' : ''
                     }`}
                   />
                 </div>

                 <div>
                   <label className={`block text-xs mb-1 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                     Option B: Enter Web Image URL
                   </label>
                   <div className="relative">
                     <input
                       type="url"
                       onChange={(e) => {
                         validateImageUrl(e.target.value);
                         setBase64Image('');
                       }}
                       onBlur={() => handleFieldBlur('file')}
                       placeholder="https://example.com/image.jpg"
                       className={`w-full p-2 pr-10 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                         theme === 'dark' 
                           ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                           : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                       } ${getFieldError('file') ? 'border-red-500 focus:ring-red-500' : ''}`}
                     />
                     <Upload className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400" />
                   </div>
                 </div>
               </div>

               {getFieldError('file') && (
                 <p className="mt-2 text-sm text-red-500">{errors.file}</p>
               )}

               {file && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="mt-4 flex items-center gap-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50"
                 >
                   <img 
                     src={file} 
                     alt="Preview" 
                     className="w-24 h-24 object-cover rounded-lg border border-purple-300 shadow-sm"
                     onError={() => setFile('')}
                   />
                   <div>
                     <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                       <Sparkles className="w-3 h-3" /> Image Ready for AI Analysis
                     </p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                       Click "Auto-Fill Details with AI ✨" above to automatically generate item Title, Category, and Description!
                     </p>
                   </div>
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
