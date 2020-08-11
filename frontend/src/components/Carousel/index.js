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
  return <>{/* Plonk in Siema here */}</>;
};

export default Header;
