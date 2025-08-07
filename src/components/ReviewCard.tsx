import { Review } from "../utils/type/bike";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useLikeReviewMutation,
  useAddCommentMutation,
} from "../redux/api/bikeReviewApi";
import { TbMessageCircle } from "react-icons/tb";
import { FaThumbsUp } from "react-icons/fa";

export const ReviewCard = ({
  review,
  refetch,
}: {
  review: Review;
  refetch?: () => void; // optional refetch function
}) => {
  const [likeReview] = useLikeReviewMutation();
  const [addComment] = useAddCommentMutation();

  const [isLiking, setIsLiking] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await likeReview(review._id).unwrap();
      toast.success("Review liked!");
      refetch?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to like review.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsCommenting(true);
    try {
      await addComment({
        reviewId: review._id,
        text: commentText.trim(),
      }).unwrap();
      toast.success("Comment added!");
      setCommentText("");
      refetch?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add comment.");
    } finally {
      setIsCommenting(false);
    }
  };

  if (!review || !review._id || typeof review._id !== "string") {
    console.error("Invalid review ID", review);
    return null;
  }

  return (
    <div className="mt-6 p-4 rounded-lg border shadow-sm bg-white">
      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
          {review.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {review.user?.name || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center text-yellow-500 text-sm mb-2">
        {"★".repeat(review.rating)}{" "}
        <span className="ml-2 text-gray-700">{review.rating} / 5</span>
      </div>

      {/* Text */}
      <p className="text-sm text-gray-700 mb-2">{review.text}</p>

      {/* Optional Image */}
      {review.imageUrl && (
        <div className="mt-2">
          <img
            src={review.imageUrl}
            alt="Review"
            className="w-full max-w-xs rounded shadow-sm border"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex gap-4 text-sm text-gray-600">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1 hover:text-blue-600 transition disabled:opacity-50"
        >
          <FaThumbsUp size={16} />
          {review.likes?.length || 0}
        </button>

        <div className="flex items-center gap-1">
          <TbMessageCircle size={16} />
          {review.comments?.length || 0}
        </div>
      </div>

      {/* Comment Input */}
      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded resize-none text-sm"
          rows={3}
          disabled={isCommenting}
        />
        <button
          onClick={handleAddComment}
          disabled={isCommenting}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition"
        >
          {isCommenting ? "Posting..." : "Post Comment"}
        </button>
      </div>

      {/* Render Comments and Replies */}
      {review.comments && review.comments.length > 0 && (
        <div className="mt-4 space-y-4 border-t pt-4">
          {review.comments.map((comment) => (
            <div key={comment._id} className="text-sm text-gray-700">
              <p>
                <span className="font-semibold">
                  {comment.user?.name || "User"}:
                </span>{" "}
                {comment.text}
              </p>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 ? (
                <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-3">
                  {comment.replies.map((reply) => (
                    <p key={reply._id} className="text-sm text-gray-600">
                      <strong>{reply.user?.name || "Reply"}:</strong>{" "}
                      {reply.text}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="ml-4 mt-2 text-sm text-gray-400 italic">
                  No replies yet.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
