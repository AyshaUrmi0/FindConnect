import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllItems = () => {
  const [items, setItems] = useState([]); // All items fetched from the API
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items to display

  // Fetch items from the API
  useEffect(() => {
    fetch("https://find-connect-server.vercel.app/allItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data); // Set the fetched items
        setFilteredItems(data); // Initialize filtered items with all items
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle search input changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter items based on the search query (title or location)
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="container p-4 mx-auto my-8">
      <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">
        All Find & Lost Items are here...
      </h2>
      <p className="text-center">
        Every lost item has a story to tell. Whether it's a child's favorite toy, a family photo album, or a vital piece of identification, every item has sentimental value and deserves to be back in the hands of the person who needs it most. Let's work together to make a difference and bring lost items home.
      </p>
      
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded shadow"
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item._id} className="p-4 bg-white rounded shadow">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-48 rounded"
            />
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="text-sm text-gray-500">Location: {item.location}</p>
            <p className="text-sm text-gray-500">Date: {item.date}</p>
            <Link
              to={`/items/${item._id}`}
              className="block p-4 mt-2 text-white rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-red-600 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-600 hover:to-red-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
