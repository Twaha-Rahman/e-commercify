import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; // eslint-disable-line
import { Link } from 'preact-router/match'; // eslint-disable-line
import style from './style.css'; // eslint-disable-line

import Siema from 'siema';

import Kiwi from '../../assets/product-placeholder/Kiwi-Slice-PNG-File.png';
import Mango from '../../assets/product-placeholder/Mango-PNG-Image-Free-Download.png'; // eslint-disable-line
import Banner from '../../assets/product-placeholder/banner.png'; // eslint-disable-line

const images = [Kiwi, Mango]; // eslint-disable-line

const Header = () => {
  useEffect(() => {
    new Siema();
  });

  return (
    <>
      <div class="siema">
        <div>
          <img
            class="siema-slide"
            src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg"
            alt="Siema image"
          />
        </div>
        <div>
          <img
            class="siema-slide"
            src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg"
            alt="Siema image"
          />
        </div>
        <div>
          <img
            class="siema-slide"
            src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg"
            alt="Siema image"
          />
        </div>
        <div>
          <img
            class="siema-slide"
            src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg"
            alt="Siema image"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
