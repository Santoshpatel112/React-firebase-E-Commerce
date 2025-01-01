
import React, { useState, useEffect } from 'react';

function HeroSection() {
  const images = [
    'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/GW/P42/Boult_3000x1200-PC._CB543542644_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/Unrec/Xmas/1-1._CB537928780_.jpg',
    'https://files.oaiusercontent.com/file-AUQePowEiYeGdKoHRmhN6z?se=2024-12-28T06%3A08%3A34Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D647dbd19-6b61-442a-9cae-373985967e44.webp&sig=fhpzVcxJTOxjHvaYKmjHrJoUvMw4h3AYz1gel7uXHu8%3D',
    'https://files.oaiusercontent.com/file-R92phc5qYT9qXVNSG4rpW6?se=2024-12-28T06%3A09%3A57Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df60eb63d-c346-400f-9192-a8d98ea8aacf.webp&sig=ZxrJavxNpqekzu9rv79WbDuqkNWgyoNI1dC/VR4%2BJYs%3D',
    // 'https://files.oaiusercontent.com/file-VvLjyqnrRffBDR72XFrXGk?se=2024-12-28T06%3A11%3A24Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D94ebf059-50e7-48da-86ee-3c497cea4ef0.webp&sig=q5Ca9QSQWnUhUW6O6sW1aFgjJy%2BLmditKswok/sJWeY%3D'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2400);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto overflow-hidden">
      <div className="flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[400px] object-cover"
        />
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 text-lg"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 text-lg"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
}

export default HeroSection;