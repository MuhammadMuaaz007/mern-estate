import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: "1",
    bathrooms: "1",
    regularPrice: "50",
    discountPrice: "0",
    offer: false,
    parking: false,
    furnished: false,
  });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  console.log(formData);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    if (selectedFiles.length > 6) {
      setError("You can upload a maximum of 6 images.");
      setFiles([]);
      inputRef.current.value = ""; // reset input
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    const invalidFiles = selectedFiles.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Only JPG and PNG images are allowed.");
      setFiles([]);
      inputRef.current.value = ""; // reset input
      return;
    }

    setError("");
    setFiles(selectedFiles);
  };
  const handleDelete = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    console.log(updatedFiles);
    setUploadedFiles(updatedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    console.log(updatedFiles);
  };
  const handleUpload = () => {
    if (files.length === 0) {
      setError("Please select images before uploading.");
      return;
    }
    setUpload(true);
    setTimeout(() => {
      setUploadedFiles(files);
      setUpload(false);
    }, 1000);
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setformData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setformData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setformData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" &&
      formData.address === "" &&
      formData.description === ""
    ) {
      setSubmitError(
        "❌ Can not create listing, all the fields must be filled!"
      );
    } else if (+formData.regularPrice < +formData.discountPrice) {
      setSubmitError("❌ Discount price must be lower than Regular price.");
    } else if (files.length === 0) {
      setSubmitError("❌ You must upload at least one image.");
    } else {
      try {
        setLoading(true);
        setSubmitError(false);

        // STEP 1: Create listing without images
        const res = await axios.post("/api/listing/create", {
          ...formData,
          userRef: currentUser._id,
        });

        const listingId = res.data._id;
        const formDataObj = new FormData();
        files.forEach((file) => formDataObj.append("images", file));
        formDataObj.append("listingId", listingId);

        const uploadRes = await axios.post(`/api/listing/upload`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(uploadRes);
        setLoading(false);
        alert("Listing Created");
        navigate(`/listing/${listingId}`);
      } catch (error) {
        setSubmitError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl my-7 font-bold text-center">Create a Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row align-center"
      >
        <div className="flex flex-col gap-4 w-full p-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="5"
            className="w-full rounded-lg p-3 bg-white "
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="w-full rounded-lg p-3 bg-white resize-none overflow-hidden"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="w-full rounded-lg p-3 bg-white"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                max="10"
                min="1"
                id="bedrooms"
                required
                className="p-3   rounded-lg bg-white"
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>Bath</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="Number"
                min="50"
                max="100000"
                id="regularPrice"
                required
                className="p-3   rounded-lg bg-white"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="Number"
                  min="0"
                  max="100000"
                  id="discountPrice"
                  required
                  className="p-3   rounded-lg bg-white"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2">
            <p className="font-semibold">Images:</p>
            <span className="text-gray-500 font-normal">
              The first image will be the cover (max 6 & .jpg and .png only)
            </span>
          </div>

          <div className="flex gap-2 ">
            <input
              ref={inputRef}
              onChange={handleFileChange}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border border-grey-200 p-3 rounded w-full"
            />
            <button
              type="button"
              className="text-white p-3 bg-blue-600 rounded uppercase hover:shadow-lg disabled:opacity-80"
              onClick={handleUpload}
            >
              {upload ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
          <div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-wrap  gap-3 mt-2  justify-center">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="relative w-22 h-22 border rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-22 h-22 object-cover"
                  />
                  {/* delete button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <button
              disabled={loading || upload}
              type="submit"
              className={`bg-gray-700 text-white uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-80 text-center w-full ${
                uploadedFiles.length > 0 ? "mt-4" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
            {submitError && (
              <p className="text-red-500 text-sm mt-2 ml-2.5 justify-center">
                {submitError}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
