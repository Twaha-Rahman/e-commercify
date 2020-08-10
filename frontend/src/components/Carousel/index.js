import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; // eslint-disable-line
import { Link } from 'preact-router/match'; // eslint-disable-line
import style from './style.css'; // eslint-disable-line

import Kiwi from '../../assets/product-placeholder/Kiwi-Slice-PNG-File.png';
import Mango from '../../assets/product-placeholder/Mango-PNG-Image-Free-Download.png'; // eslint-disable-line
import Banner from '../../assets/product-placeholder/banner.png'; // eslint-disable-line

const images = [Kiwi, Mango]; // eslint-disable-line

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
// function getRandomInt(min, max) {
//   const newMin = Math.ceil(min);
//   const newMax = Math.floor(max);
//   return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
// }
// const randomIndex = getRandomInt(0, 1);

const Header = () => {
  return (
    <>
      <div class={style.carouselContainer}>
        <div class={style.carousel}>
          <div id="skyline" class={style.carouselItem}>
            <img src={Banner} alt="..." class={style.carouselImage} />
          </div>
          <div id="great-wall-of-china" class={style.carouselItem}>
            <img src={Kiwi} alt="..." class={style.carouselImage} />
          </div>
          <div id="sunset-on-the-li-river" class={style.carouselItem}>
            <img src={Banner} alt="..." class={style.carouselImage} />
          </div>
        </div>
        <div id="controls" class={style.controls}>
          <a href="#skyline" class={style.controlsDot}>
            <span class={style.visuallyHidden}>
              Skyline of Wai Tan, Shanghai
            </span>
          </a>
          <a href="#great-wall-of-china" class={style.controlsDot}>
            <span class={style.visuallyHidden}>Great wall of China</span>
          </a>
          <a href="#sunset-on-the-li-river" class={style.controlsDot}>
            <span class={style.visuallyHidden}>Sunset on the Li River</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
