
import React, { useState, CSSProperties } from "react";
import './CustomCarousel.css'; 

interface SliderItem {
  main_heading: string;
  slider_heading: string;
  slider_paragraph: string;
  slider_image: string;
  button_text?: string;
  show_button: boolean;
  show_text: boolean;
  show_image: boolean;
  image_width: string;
  image_height: string;
}

interface CarouselProps {
  sliderData: SliderItem[];
  containerStyles?: CSSProperties;
  carouselStyles?: CSSProperties;
  prevButtonStyles?: CSSProperties;
  nextButtonStyles?: CSSProperties;
  textSectionStyles?:CSSProperties;
  buttonStyles?:CSSProperties;
}

const CustomCarousel: React.FC<CarouselProps> = ({
  sliderData,
  containerStyles,
  carouselStyles,
  prevButtonStyles,
  nextButtonStyles,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div style={{ ...containerStyles }} className="carousel-container">
      <div className="carousel-inner">
        <div className="carousel-content" style={carouselStyles}>
            {/* for the left side  of the carousel */}

          <button
            className="prev-button"
            style={prevButtonStyles}
            onClick={prevSlide}
          >
            &#10094;
          </button>

          <div  className="slider-inside">
            {sliderData[currentIndex].show_text && (
              <>
                <h2 className="slider-title">
                  {sliderData[currentIndex].slider_heading}
                </h2>
                <p className="slider-paragraph">{sliderData[currentIndex].slider_paragraph}</p>
              </>
            )}
            {sliderData[currentIndex].show_image && (
              <div className="slider-image">
                <img
                  src={sliderData[currentIndex].slider_image}
                  alt={`Slide ${currentIndex + 1}`}
                  style={{
                    width: sliderData[currentIndex].image_width,
                    height: sliderData[currentIndex].image_height,
                  }}
                />
              </div>
            )}
          </div>
            {/* for the right click of the */}
          <button
            className="next-button"
            style={nextButtonStyles}
            onClick={nextSlide}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
