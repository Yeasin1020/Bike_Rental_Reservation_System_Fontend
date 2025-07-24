import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    // Store form reference before async call
    const form = e.currentTarget;

    // Simulate async message sending (e.g., API call)
    setTimeout(() => {
      setIsSending(false);
      toast.success("Thank you for contacting us! We'll get back to you soon.");
      form.reset();
    }, 2000);
  };

  return (
    <section className="py-16  from-blue-50 to-blue-100 min-h-screen flex items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            padding: "16px",
            textAlign: "center",
          },
        }}
      />
      <div className="max-w-3xl mx-auto px-6 w-full">
        {/* Heading */}
        <header className="text-center max-w-md mx-auto mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Have questions or need assistance? We're here to help!
          </p>
        </header>

        {/* Form */}
        <form
          className=" shadow-xl rounded-xl p-8 sm:p-10"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                disabled={isSending}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                disabled={isSending}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here"
                required
                disabled={isSending}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm resize-y transition disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <svg
                      className="animate-spin mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center text-gray-700">
          <p>Or reach us directly at:</p>
          <a
            href="mailto:support@example.com"
            className="mt-2 inline-block text-blue-600 font-medium hover:underline"
          >
            support@bikerental.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
