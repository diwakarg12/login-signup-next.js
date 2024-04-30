import React from 'react';
// import loaderStyle from './Loader.module.css';
import './Loader.css';

const Loader = () => {
    return (
        <div className='main-loader'>
            <div className="banter-loader">
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
            </div>
        </div>
    );
};

export default Loader;
