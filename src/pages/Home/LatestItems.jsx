import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestItems = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://find-connect-server.vercel.app/Items")
          .then((res) => res.json())
          
          .then((data) => setItems(data))
          .catch((err) => console.error(err));
      }, []);
    
    return (
        <div className="container p-4 mx-auto my-8">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-600">
         Recent Find & Lost Items
        </h2>
        <p className='text-center text-gray-600'>Have a recent find or lost item? Share it with the community!</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="p-4 bg-white rounded shadow">
              <img src={item.image} alt={item.title} className="object-cover w-full h-48 rounded" />
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
              <p className="text-sm text-gray-500">Location: {item.location}</p>
              <p className="text-sm text-gray-500">Date: {item.date}</p>
              <Link
                to={`/items/${item._id}`}
                className="block px-4 py-2 text-white rounded mt-2font-bold bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
        <Link
  to="/allItems"
  className="px-4 py-2 font-bold text-white rounded bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600"
>
  See All
</Link>
        </div>
      </div>
    );
  };
  
  export default LatestItems;
  

