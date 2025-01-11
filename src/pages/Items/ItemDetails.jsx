import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Authcontext from '../../context/Authcontext/Authcontext';
import Swal from 'sweetalert2';


const ItemDetails = () => {
  //const { id } = useParams();
    
  const { _id, title, description, type, category, location, date, image, contactInfo, status } = useLoaderData();
  console.log(useLoaderData());
  const navigate=useNavigate();
 // const [recover,setrecover]=useState();
  const { user } = useContext(Authcontext); 
  const [modalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState('');
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  const handleRecoverSubmit = (id) => {

  
    fetch(`https://find-connect-server.vercel.app/items/${id}`)

    .then((res) => res.json())
    .then((data) => {


      if(data.status==='notFound')
      {
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
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Item successfully marked as recovered!',
                confirmButtonText: 'Go to Recovered Items',
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
            });
            console.error(err);
          });

         ;
      }

    else{
      {
        Swal.fire({
          icon: 'warning',
          title: 'Already Recovered',
          text: 'This item is already marked as recovered!',
        });
        return;
      }
    }
     



       
       
      });
      //console.log(filter);
      
    // if ( !filter) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'Already Recovered',
    //     text: 'This item is already marked as recovered!',
    //   });
    //   return;
    // }

    // else{
    //   const recoveryData = {
    //     recoveredLocation,
    //     recoveredDate,
    //     recoveredBy: {
         
    //      status: 'recovered',
    //       name: user?.displayName || 'Anonymous',
    //       email: user?.email,
    //       image: user?.photoURL || 'https://via.placeholder.com/150',
    //     },
    //     itemDetails: { id, title, description, type, category, location, date },
    //   };
    
    //   fetch('https://find-connect-server.vercel.app/recoveredItems', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(recoveryData),
    //   })
    //     .then((res) => res.json())
    //     .then(() => {
    //       fetch(`https://find-connect-server.vercel.app/status/${id}`, {
    //         method: 'PATCH',
    //        // headers: { 'Content-Type': 'application/json' },
    //        // body: JSON.stringify({ status: 'recovered' }),
    //       }).then(() => {
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Success!',
    //           text: 'Item successfully marked as recovered!',
    //           confirmButtonText: 'Go to Recovered Items',
    //         }).then(() => {
    //           setModalOpen(false);
    //           navigate('/recoveredItems');
    //         });
    //       });
    //     })
    //     .catch((err) => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Something went wrong. Please try again!',
    //       });
    //       console.error(err);
    //     });

    // }

    // })
    // .catch((err) => console.error(err));



  
  
   
  };
  
  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
      <img src={image} alt={title} className="object-cover w-full h-48" />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Type:</span> {type}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Date:</span> {date}
          </p>
        </div>
        <div className="pt-2 mt-4 border-t">
          <h2 className="text-sm font-semibold text-gray-700">Contact Info:</h2>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Name:</span> {contactInfo.name}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Email:</span> {contactInfo.email}
          </p>
        </div>
        
          <button
            onClick={() => setModalOpen(true)}
            className="w-full px-4 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-red-600 "
          >
            {type === 'Lost' ? 'Found This!' : 'This is Mine!'}
          </button>
        
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
                
              {type === 'Lost' ? 'Found This Item' : 'Claim This Item'}
            </h2>
            <div className="mb-4">
              <label htmlFor="recovered-location" className="block text-sm font-medium text-gray-700">
                Recovered Location
              </label>
              <input
                type="text"
                name='location'
                id="recovered-location"
                placeholder="Enter location"
                value={recoveredLocation}
                onChange={(e) => setRecoveredLocation(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recovered-date" className="block text-sm font-medium text-gray-700">
                Recovered Date
              </label>
              <DatePicker
                selected={recoveredDate}
                onChange={(date) => setRecoveredDate(date)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Recovered By</h3>
              <div className="flex items-center mt-2">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt={user?.displayName || 'Anonymous'}
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{user?.displayName || 'Anonymous'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRecoverSubmit(_id)}
                className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
