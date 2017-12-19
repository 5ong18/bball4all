import React from 'react';
import Slider from 'react-slick';

import shuffleArray from '../functions'

const slideSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    infinite: true,
    pauseOnHover: false,
    slidesToScroll: 1,
    /* slidesToShow: 1, */
    speed: 1000,
    swipe: true,
    swipeToSlide: true
};

const generateSlides = ({slides, error}) => {
    if (slides) {
        return (
            <Slider {...slideSettings}>
                {shuffleArray(slides).map((item) => {
                    return (
                        <div key={item.id} className="item-slider" style={{background: `url('../assets/img/covers/${item.cover}')`}}>
                            <div className="caption">
                                <h4>{item.topic}</h4>
                                <p>{item.title}</p>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        )
    } else {
        return (
            <div>
                <div className="error-message">
                    {error}
                </div>
            </div>
        )
    }
}

const Featured = (props) => {

    return (
        <div>
            {generateSlides(props)}
        </div>
    )
}

export default Featured;