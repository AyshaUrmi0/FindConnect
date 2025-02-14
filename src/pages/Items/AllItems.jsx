import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Loader2 } from 'lucide-react';


const AllItems = () => {
  const [items, setItems] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredItems, setFilteredItems] = useState([]); 

 
  useEffect(() => {
    fetch("https://find-connect-server.vercel.app/allItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data); 
        setFilteredItems(data); 
      })
      .catch((err) => console.error(err));
  }, []);


  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

   
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="container p-4 mx-auto my-8 mt-20">
      <h2 className="mb-6 text-3xl font-bold text-center text-purple-600">
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

       <div className="grid grid-cols-1 gap-8 dark:text-white sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden transition-transform duration-300 shadow-lg group rounded-xl hover:-translate-y-2"
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
            </div>
            
            <div className="p-6">
              <h3 className="mb-3 text-xl font-bold line-clamp-1">
                {item.title}
              </h3>
              <p className="mb-4 text-sm line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center gap-4 mb-4 text-sm ">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>

              <Link
  to={`/items/${item._id}`}
  className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-purple-600 transition-colors border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white group"
>
  View Details
  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
