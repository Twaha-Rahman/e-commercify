import { h } from 'preact';
import style from './style';

import Carousel from '../../components/Carousel';

const Home = () => (
  <div class={style.home}>
    <Carousel />
    <h1>Home</h1>
    <p>This is the Home component.</p>
  </div>
);

export default Home;
