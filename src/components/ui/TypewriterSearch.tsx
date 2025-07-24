import { useEffect, useState } from "react";

const TypewriterSearch = () => {
  const fullText = "Search bike availability...";
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        setPlaceholder(fullText.slice(0, index + 1));
        setIndex(index + 1);

        if (index + 1 === fullText.length) {
          // Start deleting after fully typed
          setIsDeleting(true);
        }
      } else {
        // Deleting mode
        setPlaceholder(fullText.slice(0, index - 1));
        setIndex(index - 1);

        if (index - 1 === 0) {
          // Start typing again after fully deleted
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center bg-white/90 backdrop-blur-md rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-3 text-gray-700 focus:outline-none"
        />
        <button className="px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200">
          Search
        </button>
      </div>
    </div>
  );
};

export default TypewriterSearch;
