import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState();
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/listing/get/${listing.userRef}`
        );
        setLandlord(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onChange}
            className="w-full bg-white p-3 rounded-lg resize-none overflow-hidden"
            placeholder="Enter your message here..."
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 w-full text-center  text-white rounded-lg hover:opacity-95 p-3 uppercase"
          > 
             Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
