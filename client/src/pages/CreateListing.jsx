import React from "react";

const CreateListing = () => {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl my-7 font-bold text-center">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row align-center">
        <div className="flex flex-col gap-4 w-full p-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            className="w-full rounded-lg p-3 bg-white "
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="w-full rounded-lg p-3 bg-white resize-none overflow-hidden"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="w-full rounded-lg p-3 bg-white"
          />
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                max="10"
                min="1"
                id="bedrooms"
                required
                className="p-3   rounded-lg bg-white"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                max="10"
                min="1"
                id="bathrooms"
                required
                className="p-3   rounded-lg bg-white"
              />
              <span>Bath</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                max="10"
                min="1"
                id="regularPrice"
                required
                className="p-3   rounded-lg bg-white"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                max="10"
                min="1"
                id="discountPrice"
                required
                className="p-3   rounded-lg bg-white"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-2">
          <p className="font-semibold">Images:</p>
          <span className="text-gray-500 font-normal">The first image will be the cover (max 6)</span>
        </div>
        <div className="flex gap-2  ">
          <input type="file" id="images" accept="images/*" multiple className="border border-grey-200 p-3 rounded w-full"/>
          <button className="text-white p-3 bg-blue-600 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button  className="bg-gray-700 text-white uppercase rounded-lg mt-2 p-3 hover:opacity-90 disabled:opacity-80 text-center">Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
