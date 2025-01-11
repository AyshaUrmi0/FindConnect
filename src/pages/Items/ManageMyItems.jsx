import React, { useContext, useEffect, useState } from 'react';
import Authcontext from '../../context/Authcontext/Authcontext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageMyItems = () => {

    const { user } = useContext(Authcontext);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
 // const axiosProtect=useAxiosSecure();
    useEffect(() => {
        // if (user?.email) {
        //     fetch(`https://find-connect-server.vercel.app/addedItems?email=${user.email}`,{withCredentials:true})
        //         .then((res) => res.json())
        //         .then((data) => {
        //             setItems(data);
        //         })
        //         .catch((err) => console.error(err));
        // }
        axios.get(`https://find-connect-server.vercel.app/addedItems?email=${user.email}`, { withCredentials: true })
         .then((res) => setItems(res.data))

        // axiosProtect.get(`/addedItems?email=${user.email}`)
        // .then((res) => setItems(res.data))

    }, [user.email]);
    return (

        <div className="max-w-6xl p-4 mx-auto bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-center">Manage My Items</h1>
        <p className="mb-6 text-center text-gray-600">
            {items.length > 0 ? `${items.length} items` : 'You have not added any items yet.'}
        </p>
        {items.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="w-full border border-collapse border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            
                            <th className="p-3 border border-gray-300">Category</th>
                            <th className="p-3 border border-gray-300">Location</th>
                            <th className="p-3 border border-gray-300">Date</th>
                            <th className="p-3 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="text-center hover:bg-gray-100">
                               
                                <td className="p-3 border border-gray-300">{item.category}</td>
                                <td className="p-3 border border-gray-300">{item.location}</td>
                                <td className="p-3 border border-gray-300">{item.date}</td>
                                <td className="p-3 border border-gray-300">
                                <button
                      onClick={() => navigate(`/updateItems/${item._id}`)} 
                      className="px-3 py-1 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Update
                    </button>
                                    <button
  onClick={() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://find-connect-server.vercel.app/addedItems/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
            // Update the state to remove the deleted item
            setItems(items.filter((i) => i._id !== item._id));
          })
          .catch((err) => console.error(err));
      }
    });
  }}
  className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
>
  Delete
</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="mt-6 text-center text-gray-500">
                <p>No items found. Start adding lost or found items to manage them here!</p>
            </div>
        )}
    </div>
);
};

    
export default ManageMyItems;