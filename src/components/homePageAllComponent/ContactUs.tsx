const ContactUs = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-screen-lg mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need assistance? We're here to help!
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 bg-white shadow-lg rounded-xl p-8 lg:p-12">
          <form className="space-y-6">
            {/* Name Field */}
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
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm"
                required
              />
            </div>

            {/* Email Field */}
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
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm"
                required
              />
            </div>

            {/* Message Field */}
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
                rows={6}
                placeholder="Write your message here"
                className="mt-2 w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:text-sm"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center text-gray-600">
          <p>Or reach us directly at:</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 font-medium hover:underline"
          >
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
