import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Review } from "../../../utils/type/bike";
import { useAddReplyMutation } from "../../../redux/api/bikeReviewApi";
import { RootState } from "../../../redux/store";
import toast, { Toaster } from "react-hot-toast";

const MyReviewRepliesPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [addReply, { isLoading }] = useAddReplyMutation();
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchMyReviews = async () => {
    try {
      const res = await fetch(
        "https://bike-rental-reservation-system-backend-gamma.vercel.app/api/reviews/my-reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data?.success) {
        setReviews(data.data);
      } else {
        toast.error("Failed to fetch reviews");
      }
    } catch (err) {
      toast.error("Error fetching reviews");
    }
  };

  useEffect(() => {
    if (token) fetchMyReviews();
  }, [token]);

  const handleReplySubmit = async (
    e: React.FormEvent,
    reviewId: string,
    commentId: string
  ) => {
    e.preventDefault();
    const text = replyInputs[commentId];
    if (!text) return;

    try {
      await addReply({ reviewId, commentId, text }).unwrap();
      toast.success("Reply added successfully");
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      await fetchMyReviews(); // re-fetch to update
    } catch (error) {
      toast.error("Failed to add reply");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Review Comments & Replies
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="mb-8 border border-gray-200 p-6 rounded-lg shadow-sm "
          >
            <h3 className="text-xl font-semibold mb-2">
              Review: <span className="font-normal">{review.text}</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {review.comments?.length || 0} Comment
              {review.comments?.length === 1 ? "" : "s"}
            </p>

            <div className="space-y-6">
              {review.comments?.map((comment) => (
                <div
                  key={comment._id}
                  className="border-t border-gray-100 pt-4"
                >
                  <div className="mb-2">
                    <p className="font-medium">
                      {comment.user?.name || "User"}:
                    </p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>

                  <div className="ml-4 bg-gray-50 p-3 rounded space-y-2">
                    {comment.replies?.length ? (
                      comment.replies.map((reply) => (
                        <div key={reply._id} className="pl-2">
                          <p className="text-sm text-gray-800">
                            <strong>{reply.user?.name || "You"}:</strong>{" "}
                            {reply.text}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No replies yet.
                      </p>
                    )}
                  </div>

                  <form
                    onSubmit={(e) =>
                      handleReplySubmit(e, review._id, comment._id)
                    }
                    className="mt-3 ml-4"
                  >
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={replyInputs[comment._id] || ""}
                      onChange={(e) =>
                        setReplyInputs({
                          ...replyInputs,
                          [comment._id]: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-2 px-4 py-2 text-sm font-medium rounded ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {isLoading ? "Replying..." : "Reply"}
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviewRepliesPage;
