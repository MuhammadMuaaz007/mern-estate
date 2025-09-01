import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const listingId = params.listingId;
        const res = await axios.get(
          `http://localhost:5000/api/listing/get/${listingId}`
        );
        if (res.data.success === false) {
          console.log(res.data.message);
          setLoading(false);
          setError(true);
          return;
        }
        console.log("API response:", res.data);
        setListing(res.data);
        setError(false);
        console.log(listing);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  useEffect(() => {
    if (listing) {
      console.log("Updated listing:", listing);
    }
  }, [listing]);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 font-bold my-7 text-2xl">
          <marquee> Something went wrong!</marquee>
        </p>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation modules={[Navigation]}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img
                  src={`http://localhost:5000${url}`}
                  alt="listing"
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Listing;
