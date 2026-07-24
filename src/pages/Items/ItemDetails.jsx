import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Authcontext from '../../context/Authcontext/Authcontext';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import Swal from 'sweetalert2';
import AiSmartMatches from '../../components/AiSmartMatches';
import { 
  MapPin, 
  Calendar, 
  Tag, 
  User, 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const ItemDetails = () => {
  const item = useLoaderData();
  const { _id, title, description, type, category, location, date, image, contactInfo, status } = item || {};
  const navigate = useNavigate();
  const { user } = useContext(Authcontext); 
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [modalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState('');
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  const handleRecoverSubmit = (id) => {
    fetch(`https://find-connect-server.vercel.app/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'notFound') {
          const recoveryData = {
            recoveredLocation,
            recoveredDate,
            recoveredBy: {
              status: 'recovered',
              name: user?.displayName || 'Anonymous',
              email: user?.email,
              image: user?.photoURL || 'https://via.placeholder.com/150',
            },
            itemDetails: { id, title, description, type, category, location, date },
          };

          fetch('https://find-connect-server.vercel.app/recoveredItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recoveryData),
          })
            .then((res) => res.json())
            .then(() => {
              fetch(`https://find-connect-server.vercel.app/status/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
              }).then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Item successfully marked as recovered!',
                  confirmButtonText: 'Go to Recovered Items',
                  confirmButtonColor: '#8b5cf6',
                }).then(() => {
                  setModalOpen(false);
                  navigate('/recoveredItems');
                });
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again!',
                confirmButtonColor: '#8b5cf6',
              });
              console.error(err);
            });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Already Recovered',
            text: 'This item is already marked as recovered!',
            confirmButtonColor: '#8b5cf6',
          });
        }
      });
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-slate-50/70 text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-semibold rounded-xl border shadow-sm transition-all active:scale-95 ${
            isDark
              ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-purple-600" />
          <span>Back to Items</span>
        </motion.button>

        {/* Main Item Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border shadow-xl overflow-hidden transition-all ${
            isDark
              ? 'bg-gray-800 border-gray-700/80 shadow-black/40'
              : 'bg-white border-gray-200/80 shadow-slate-200/60'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Image Display */}
            <div className={`lg:col-span-6 relative flex items-center justify-center min-h-[320px] lg:min-h-[460px] p-5 sm:p-6 ${
              isDark ? 'bg-gray-950/80 border-r border-gray-700/50' : 'bg-purple-50/40 border-r border-slate-100'
            }`}>
              <img
                src={image || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={title}
                className="w-full h-full object-cover max-h-[460px] rounded-2xl shadow-md border border-gray-200/50"
              />
              
              {/* Type Badge */}
              <div className="absolute top-8 left-8 flex items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase text-white shadow-lg ${
                  type === 'Lost' 
                    ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                }`}>
                  {type === 'Lost' ? '🔍 Lost Item' : '🎁 Found Item'}
                </span>
                
                {status === 'recovered' && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5" /> Recovered
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Details & Contact */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Item ID */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                    isDark
                      ? 'bg-purple-900/40 text-purple-300 border-purple-800'
                      : 'bg-purple-100/90 text-purple-700 border-purple-200'
                  }`}>
                    <Tag className="w-3.5 h-3.5 text-purple-600" />
                    {category || 'Uncategorized'}
                  </span>
                  
                  <span className={`text-xs font-mono font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    ID: #{_id?.slice(-6)}
                  </span>
                </div>

                {/* Title */}
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h1>

                {/* Date & Location Pills */}
                <div className="mt-4 flex flex-wrap gap-2.5 text-xs sm:text-sm">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold border ${
                    isDark
                      ? 'bg-gray-700/60 text-gray-200 border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-200/80'
                  }`}>
                    <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{location || 'Location not specified'}</span>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold border ${
                    isDark
                      ? 'bg-gray-700/60 text-gray-200 border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-200/80'
                  }`}>
                    <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>{date ? new Date(date).toLocaleDateString() : 'Date unknown'}</span>
                  </div>
                </div>

                {/* Description Box */}
                <div className="mt-6">
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Description
                  </h3>
                  
                  <p className={`text-sm leading-relaxed whitespace-pre-line p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-gray-900/50 text-gray-300 border-gray-700'
                      : 'bg-slate-50 text-gray-700 border-gray-200/90'
                  }`}>
                    {description || 'No detailed description provided.'}
                  </p>
                </div>

                {/* Reporter Contact Info Card */}
                <div className={`mt-6 p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-purple-950/30 border-purple-900/50 text-purple-200'
                    : 'bg-purple-50/80 border-purple-200/80 text-purple-950'
                }`}>
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
                    isDark ? 'text-purple-300' : 'text-purple-800'
                  }`}>
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    Reporter Contact Info
                  </h3>
                  
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="font-bold">{contactInfo?.name || 'Anonymous User'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="font-medium">{contactInfo?.email || 'No email provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 ${
                    type === 'Lost'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/25'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/25'
                  }`}
                >
                  {type === 'Lost' ? '🙋 Found This Item?' : '🔒 Claim Ownership'}
                </button>
              </div>

            </div>
          </div>
        </motion.div>

        {/* AI Smart Matches Section */}
        <AiSmartMatches currentItem={item} />

      </div>

      {/* Recover Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-md p-6 rounded-3xl shadow-2xl border ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <h2 className="text-xl font-bold mb-2">
              {type === 'Lost' ? 'Found This Item' : 'Claim This Item'}
            </h2>
            <p className={`text-xs mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Please enter location and date details to mark this item as recovered.
            </p>

            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recovered Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Central Station, Coffee Shop"
                  value={recoveredLocation}
                  onChange={(e) => setRecoveredLocation(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recovered Date
                </label>
                <DatePicker
                  selected={recoveredDate}
                  onChange={(d) => setRecoveredDate(d)}
                  className={`w-full px-4 py-2.5 text-sm border rounded-xl outline-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className={`p-3 rounded-2xl flex items-center gap-3 border ${
                isDark ? 'bg-purple-900/20 border-purple-800/40' : 'bg-purple-50 border-purple-100'
              }`}>
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt={user?.displayName || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <p className="text-xs font-bold">{user?.displayName || 'Anonymous User'}</p>
                  <p className={`text-[11px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRecoverSubmit(_id)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 shadow-md transition-all active:scale-95"
              >
                Confirm & Recover
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;