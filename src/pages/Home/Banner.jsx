import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center">
      <div className="w-11/12 mx-auto carousel">
        {/* Slide 1 */}
        <div id="slide1" className="relative w-full carousel-item h-[400px]">
          <img
            src="https://i.ibb.co.com/qY2hWMQ/DALL-E-2024-12-31-12-56-08-A-vibrant-and-visually-engaging-banner-for-a-website-titled-Where-Is-It-A.webphttps://i.ibb.co.com/qY2hWMQ/DALL-E-2024-12-31-12-56-08-A-vibrant-and-visually-engaging-banner-for-a-website-titled-Where-Is-It-A.webp"
            className="object-cover w-full h-full" // Adjust height and fit
            alt="Lost Items - Connect and Recover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Lost Something?</h1>
              <p className="p-3 mt-2 text-lg">
              Report lost items and connect with the community to recover them. This is a platform designed to help people find what they've lost, whether it's a misplaced phone, a stolen wallet, or a cherished family heirloom. Share details of your lost item, and our community will work together to help you track it down and bring it back home.
              </p>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="relative w-full carousel-item h-[400px]">
          <img
            src="https://i.ibb.co.com/Tw7q9Lq/DALL-E-2024-12-31-12-57-31-A-modern-sleek-and-visually-engaging-banner-for-a-lost-and-found-website.webp"
            className="object-cover w-full h-full"
            alt="Found Items - Help Others Reunite"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Found Something?</h1>
              <p className="mt-2 text-lg">
              Post found items and help others reunite with what they've lost. Share photos, descriptions, and details of discovered belongings to spread the word and increase the chances of reuniting lost treasures with their rightful owners.
              </p>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="relative w-full carousel-item h-[400px]">
          <img
            src="https://i.ibb.co.com/LNnpC3s/DALL-E-2024-12-31-12-58-38-An-impactful-and-emotional-banner-design-for-a-website-that-helps-find-lo.webp"
            className="object-cover w-full h-full"
            alt="Community - Together We Recover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Join the Community</h1>
              <p className="mt-2 text-lg">
              Together, we can make it easier to find and return lost items, reuniting people with their treasured possessions and bringing a sense of relief and joy to those who thought they were lost forever. By working as a community, we can create a network of kindness and support, where lost items are quickly identified and returned to their rightful owners.
              </p>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
