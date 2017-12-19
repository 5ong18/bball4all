import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal';

import 'animate.css/animate.css';
import shuffleArray from '../functions';

const generateBlocks = ({blocks, error}) => {
    if (blocks) {
        return shuffleArray(blocks).map((item) => {
            return (
                <Reveal key={item.id} effect="animated fadeInUp" className={`item ${item.type}`}>
                    <div className="veil"></div>
                    <div className="image" style={{background: `url('../assets/img/blocks/${item.image}') no-repeat`}}></div>
                    <div className="title">
                        <Link to={item.link}>{item.title}</Link>
                    </div>
                </Reveal>
            )
        })
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

const Blocks = (props) => {
    // console.log(props);

    return (
        <div className="home_blocks">
            {generateBlocks(props)}
        </div>
    )
}

export default Blocks;