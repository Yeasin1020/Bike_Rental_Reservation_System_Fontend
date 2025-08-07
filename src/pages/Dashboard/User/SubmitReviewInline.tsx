/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSubmitReviewMutation } from "../../../redux/api/bikeReviewApi";
import { toast } from "react-hot-toast";

interface Props {
  bikeId: string;
  bookingId: string;
  onSuccess: () => void;
}

const SubmitReviewInline: React.FC<Props> = ({
  bikeId,
  bookingId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);

  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting your review...");

    try {
      const result = await submitReview({
        bikeId,
        bookingId,
        review: { rating, text, imageUrl },
      });

      if ("error" in result) {
        throw result.error;
      }

      toast.success("Review submitted successfully!", { id: toastId });

      // Reset form
      setRating(5);
      setText("");
      setImageUrl("");

      onSuccess();
    } catch (err: any) {
      console.error("Submit review error:", err);
      toast.error(
        err?.data?.message || "Failed to submit review. Please try again.",
        { id: toastId }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg border max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Write a Review</h2>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 cursor-pointer ${
                (hovered || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.072 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.072 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.072-3.292a1 1 0 00-.364-1.118L2.43 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.072-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Comment Box */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Feedback
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us about your experience..."
          required
        />
      </div>

      {/* Image Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-2 rounded-lg h-32 object-cover border"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default SubmitReviewInline;
