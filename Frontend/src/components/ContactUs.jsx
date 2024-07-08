

const ContactForm = () => {
  return (
    <div className="container mx-auto p-4 mt-10 flex flex-wrap lg:flex-nowrap justify-between items-start gap-10">
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-orange-500 mx-auto">Get In Touch With Us</h2>
        <p className="text-gray-700 mb-6">
        Whether you have a question about our services, need assistance or just want to talk, we want to hear from you. Get in touch with us and we'll respond as soon as possible.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-3 rounded-full hover:bg-orange-600">
              <box-icon name="home" color="white"></box-icon>
            </div>
            <div>
              <h3 className="font-bold">Our Location</h3>
              <p>Colombo , Sri Lanka</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-3 rounded-full hover:bg-orange-600">
              <box-icon name="phone" color="white"></box-icon>
            </div>
            <div>
              <h3 className="font-bold">Phone Number</h3>
              <p>(+94)11 414 2570</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 p-3 rounded-full hover:bg-orange-600">
              <box-icon name="envelope" color="white"></box-icon>
            </div>
            <div>
              <h3 className="font-bold">Email Address</h3>
              <p>info@cleaning.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-secondary mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg focus:outline-none border"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Phone"
              className="w-full p-3 rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg focus:outline-none"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg--500 text-white rounded-lg hover:bg-orange-500 transition bg-secondary"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
