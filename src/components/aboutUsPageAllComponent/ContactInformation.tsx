const ContactInformation = () => {
  return (
    <div className=" py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto text-center space-y-12">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Contact Us
        </h2>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Our Office</h3>
            <p className="text-gray-600">
              Uttara 3rd Sector, Dhaka, Bangladesh
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">+8801405671742</p>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">mdeasinsarkar01@gmail.com</p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">
            Find Us On The Map
          </h3>
          <div className="w-full h-72 mt-4">
            {/* Embed Google Maps iframe or use a map library */}
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7015495674537!2d-122.41941558468115!3d37.774929479759636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809bc9a2461d%3A0x916a3d53c47c2196!2sSan%20Francisco%2C%20CA%2094117%2C%20USA!5e0!3m2!1sen!2sin!4v1623199638571!5m2!1sen!2sin"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
