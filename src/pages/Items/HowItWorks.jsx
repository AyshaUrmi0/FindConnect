const HowItWorks = () => {
    return (
      <div className="p-6 mt-6 page-width isolate collapse-corners">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative w-full">
            <img
              src="https://shop.troov.com/cdn/shop/files/coworkers-looking-at-mobile-device.jpg?v=1698063089&width=750"
              alt="Person reporting a lost item"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
  
          {/* Text Section */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-blue-200">
            <h2 className="text-2xl font-bold text-blue-800">
              🧐 Lost Something? Here’s How It Works!
            </h2>
            <div className="mt-4 space-y-3 text-gray-700">
              <h5>
                <strong>1.</strong> Report your lost item by filling out a quick form.
              </h5>
              <h5>
                <strong>2.</strong> Our system matches found items with your report.
              </h5>
              <h5>
                <strong>3.</strong> If there’s a match, we connect you with the finder securely. 🔍
              </h5>
              <h5>
                <strong>👉</strong> Reunite with your lost belongings easily & safely!
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HowItWorks;
  