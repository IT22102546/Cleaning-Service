import React from 'react';

const FloatingWhatsAppButton = () => {
  const phoneNumber = '94701194600'; // Replace with your WhatsApp phone number in international format without '+'

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 flex items-center justify-center w-14 h-14 bg-white hover:bg-gray-100 transition rounded-full shadow-lg  z-50 "
    >
      <box-icon name='whatsapp' type='logo' color="green" size='lg' ></box-icon>
    </button>
  );
};

export default FloatingWhatsAppButton;
