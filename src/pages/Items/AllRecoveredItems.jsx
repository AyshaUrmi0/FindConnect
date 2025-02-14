import React, { useContext, useEffect, useState } from "react";
import { FaTh, FaList } from "react-icons/fa"; // Import icons
import Authcontext from "../../context/Authcontext/Authcontext";
import Loading from "../../layouts/Loading";

const AllRecoveredItems = () => {
  const { user } = useContext(Authcontext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(true); // State to toggle layout

  useEffect(() => {
    if (user?.email) {
      fetch(`https://find-connect-server.vercel.app/recoveredItems`)
        .then((res) => res.json())
        .then((data) => {
          setRecoveredItems(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (loading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  if (recoveredItems.length === 0) {
    return <p className="mt-4 font-semibold text-center">No recovered items found for you!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-semibold text-center">
        All Recovered Items
      </h1>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-medium">Toggle Layout:</p>
        <button
          onClick={() => setIsTableLayout(!isTableLayout)}
          className="flex items-center gap-2 p-2 text-white bg-purple-700 rounded-lg "
        >
          {isTableLayout ? (
            <>
              <FaTh /> <span>Grid View</span>
            </>
          ) : (
            <>
              <FaList /> <span>Table View</span>
            </>
          )}
        </button>
      </div>
      {isTableLayout ? (
        // Table Layout
        <div className="overflow-x-auto dark:bg-gray-800">
          <table className="w-full text-sm border border-collapse border-gray-300 md:text-base">
            <thead>
              <tr>
                <th className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                  Title
                </th>
                <th className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                  Recovered Location
                </th>
                <th className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                  Recovered Date
                </th>
                <th className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                  Recovered By
                </th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr className="dark:bg-gray-800" key={item._id}>
                  <td className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                    {item.itemDetails.title}
                  </td>
                  <td className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                    {item.recoveredLocation}
                  </td>
                  <td className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                    {new Date(item.recoveredDate).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-1 border border-gray-300 md:px-4 md:py-2">
                    {item.recoveredBy.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Layout
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-300 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold">
                {item.itemDetails.title}
              </h2>
              <p className="text-sm ">
                <span className="font-semibold">Recovered Location:</span>{" "}
                {item.recoveredLocation}
              </p>
              <p className="text-sm ">
                <span className="font-semibold">Recovered Date:</span>{" "}
                {new Date(item.recoveredDate).toLocaleDateString()}
              </p>
              <p className="text-sm ">
                <span className="font-semibold">Recovered By:</span>{" "}
                {item.recoveredBy.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecoveredItems;
