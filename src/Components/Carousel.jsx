import { useEffect, useState, useRef } from "react";
import "../Css/Carousel.css";
import PropTypes from "prop-types";

/*defining proptypes for carousel*/
Carousel.propTypes = {
  id: PropTypes.number,
  images: PropTypes.array,
};

function Carousel({ id, images }) {
  const carouselImages = useRef(),
    carouselIterators = useRef();
  const [counter, setCounter] = useState(0);

  /*Automatic scroll : using setTimeout instead of setInterval because counter will render the component again once update
  and then counter will increase by 1 once again on render the component the counter being  a state wil remember its value.
  */
  const autoScroll = setTimeout(() => {
    if (counter == carouselImages.current.length - 1) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }, 5000);

  useEffect(() => {
    carouselImages.current = document.querySelectorAll(".prdImg" + id);
    carouselIterators.current = document.querySelectorAll(".iterator" + id);
    carouselImages.current.forEach(
      (carouselImage, index) => (carouselImage.style.left = `${index * 100}%`)
    );
    carouselIterators.current.forEach(
      (carouselIterator, index) =>
        (carouselIterator.style.left = `${index * 10}%`)
    );
  }, []);

  useEffect(() => {
    carouselImages.current.forEach(
      (carouselImage) =>
        (carouselImage.style.transform = `translateX(-${counter * 100}%)`)
    );
  }, [counter]);

  /*carousel clicked on right side*/
  const increment = () => {
    clearTimeout(autoScroll);
    if (counter == carouselImages.current.length - 1) {
      setCounter(0);
      return;
    }
    setCounter(counter + 1);
  };
  /*carousel clicked on left side*/
  const decrement = () => {
    clearTimeout(autoScroll);
    if (counter == 0) {
      setCounter(carouselImages.current.length - 1);
      return;
    }
    setCounter(counter - 1);
  };

  return (
    <>
      <div className="carousel">
        {images.map((image, index) => (
          <div className="imgIterator" key={"prdImg" + id + index}>
            <img
              className={"prdImg" + " " + "prdImg" + id}
              src={image}
              alt="prdImg"
            />
          </div>
        ))}
        <div className="iterator-container">
          {images.map((image, index) => {
            return (
              <span
                key={"prdIterator" + id + index}
                className="iterator"
                style={
                  counter == index
                    ? { background: "rgb(63 131 248)" }
                    : { background: "#fff" }
                }
              ></span>
            );
          })}
        </div>
        <div className="btn-container">
          <button className="increment-btn" onClick={decrement}>
            <i className="fa-solid fa-less-than"></i>
          </button>
          <button className="decrement-btn" onClick={increment}>
            <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
