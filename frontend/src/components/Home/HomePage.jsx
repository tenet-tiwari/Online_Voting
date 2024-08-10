
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FeaturesSection from './FeaturesSection';
import MembersSection from './MembersSection';
import ContactUsSection from './ContactUsSection';
import Footer from './Footer';
import Navbar from '../Home/Navbar';

import logo1 from '../../assets/home/logo1.jpg';
import logo2 from '../../assets/home/logo2.jpg';
import logo3 from '../../assets/home/logo3.jpg';
import logo4 from '../../assets/home/logo4.jpg';
import logo5 from '../../assets/home/logo5.jpg';
import logo6 from '../../assets/home/logo6.jpg';

const HomePage = () => {
  const slides = [
    {
      image: logo1,
      title: "Welcome to Our Organization",
      description: "We are dedicated to providing the best service...",
      link: "https://ecisveep.nic.in/files/file/2196-voter-guide/"
    },
    {
      image: logo2,
      title: "Empowering Your Vote",
      description: "Your vote, your voice...",
      link: "https://www.eci.gov.in/election-management"
    },
    {
      image: logo4,
      title: "Join Us Today",
      description: "Make a difference in your community...",
      link: "https://voters.eci.gov.in/login"
    },
    {
      image: logo5,
      title: "Check your voter status today!",
      description: "Be Updated...",
      link: "https://www.eci.gov.in/electoral-roll"
    },
    {
      image: logo3,
      title: "Update your voter details online",
      description: "Save Time and get updated...",
      link: "https://svp.eci.gov.in/"
    },
    {
      image: logo6,
      title: "How to Vote",
      description: "Learn about the online voting process",
      link: "/how-to-vote"
    }
  ];

  return (
    <div>
      <Navbar />
      <header>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
          transitionTime={500}
          className="h-screen"
          stopOnHover={false}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative h-screen">
              <div
                className="bg-cover bg-center h-full transition-transform duration-500 transform hover:scale-110"
                style={{ backgroundImage: `url(${slide.image})` }}
                onClick={() => window.location.href = slide.link}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center h-full text-center text-white opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-500 p-4">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">{slide.title}</h1>
                  <p className="mt-4 text-sm sm:text-lg md:text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </header>
      <div className="px-4 sm:px-6 lg:px-8">
        <FeaturesSection />
        <MembersSection />
        <ContactUsSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
