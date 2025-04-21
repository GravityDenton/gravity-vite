import React, { useRef } from 'react';

const HeroSection = () => {
  const eventsSectionRef = useRef();

  const handleScroll = (event) => {
    event.preventDefault(); // Prevent default anchor scroll behavior
    const element = eventsSectionRef.current;
    if (element) {
      const scrollOffset = 250; // Approximate height of 3 scrolls (adjust as needed)
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + scrollOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth', // Enable smooth scrolling
      });
    }
  };

  return (
    <section 
      id="home"
      className="w-screen min-h-screen flex flex-col items-center justify-center text-gray-800 overflow-hidden relative z-10 bg-customBlue"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl text-center text-white px-4">
        <h1
          className="text-5xl md:text-6xl font-bold mb-4 p-2 inline-block"
          style={{
            textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px  1px 0 #000, 1px  1px 0 #000`,
            borderImageSource: 'repeating-linear-gradient(to right, #68D391 0, #68D391 20%, #FAF089 20%, #FAF089 40%, #63B3ED 40%, #63B3ED 60%, #F6AD55 60%, #F6AD55 80%, #D6BCFA 80%, #D6BCFA 100%)',
            borderImageSlice: 1,
            borderWidth: '6px',
            borderStyle: 'solid',
          }}
        >
          Welcome to Gravity
        </h1>
        
        <p className="text-lg md:text-2xl mb-8">
          "The Keyword is LOVE!"
        </p>
        <button
          onClick={handleScroll} // Custom scroll function
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-purple-500 transition duration-200"
        >
          See Our Events
        </button>
      </div>

      {/* Reference point for Upcoming Events */}
      <section ref={eventsSectionRef} id="events">
        {/* Your "Upcoming Events" section here */}
      </section>
    </section>
  );
};

export default HeroSection;