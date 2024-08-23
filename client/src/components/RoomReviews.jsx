import { useState, useEffect } from "react";
import apiRequest from "../lib/apiRequest"; 
  import { useParams } from "react-router-dom"; 

const RoomReviews = ({room}) => {
  const [reviews, setReviews] = useState([]); 
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(""); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiRequest.get(`/rooms/${room._id}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError("Failed to fetch reviews. " + err.response.data.error);
      }
    };
    fetchReviews();
  }, [room._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest.post(`/rooms/${id}/review`, { rating, comment });
      setSuccess("Review submitted successfully!");
      setError(null);
      setRating(0);
      setComment("");
      const response = await apiRequest.get(`/reviews/${id}`);
      setReviews(response.data);
    } catch (err) {
      setError(err.response.data.error || "Failed to submit review.");
      setSuccess(null);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Submit Review
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this room!</p>
      ) : (
        <ul className="overflow-y-scroll">
          {reviews.map((review) => (
            <li key={review._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <strong>User:</strong> {review.user.username}
                </div>
                <div>
                  <strong>Rating:</strong> {review.rating}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500">
                <strong>Room:</strong> {review.room.roomNo} - {review.room.roomType}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomReviews;
