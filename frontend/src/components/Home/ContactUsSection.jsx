// src/components/ContactUsSection.js
import React from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactUsSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
      <div className="flex justify-around animate-bounce">
        <a href="mailto:complaints@eci.gov.in" className="text-blue-600">
          <FaEnvelope size={32} />
          <p className="mt-2">Email Us</p>
        </a>
        <a href="tel:23052220" className="text-blue-600">
          <FaPhone size={32} />
          <p className="mt-2">Call Us</p>
        </a>
        <a href="https://wa.me/23052221" className="text-blue-600">
          <FaWhatsapp size={32} />
          <p className="mt-2">Chat Support</p>
        </a>
      </div>
    </section>
  );
};

export default ContactUsSection;
