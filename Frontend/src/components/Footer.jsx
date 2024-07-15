import React from 'react';

const Footer = () => {
  return (
    <footer className=" py-10 bg-orange-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="mb-6 w-full lg:w-1/4">
            <div className="flex items-center mb-4">
              <img src="/images/mop.png" alt="Logo" className="h-24 w-24 mr-2" />
            </div>
              <span className="font-bold text-lg">Cleaning Service</span>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                <box-icon type='logo' name='twitter'></box-icon>
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-900">
                <box-icon type='logo' name='linkedin'></box-icon>
              </a>
              <a href="https://example.com" className="text-gray-600 hover:text-gray-900">
                <box-icon type='logo' name='facebook'></box-icon>
              </a>
              
            </div>
          </div>
          <div className="mb-6 w-full lg:w-1/4">
            <h3 className="font-bold mb-4">Product</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Overview</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Solutions</a><span className="ml-2 text-sm bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">New</span></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Releases</a></li>
            </ul>
          </div>
          <div className="mb-6 w-full lg:w-1/4">
            <h3 className="font-bold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">News</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Media kit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4">
            <h3 className="font-bold mb-4">Resources</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Newsletter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Help centre</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-600 flex flex-wrap justify-between gap-10">
          <div className='text-start'>
          <p>Get our fastest cleaning service</p>
          <p className="mt-1">Save countless hours of cleaning.</p>
          </div>
          <div>

          <p className="mt-6">© 2024 Cleaning Service. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
