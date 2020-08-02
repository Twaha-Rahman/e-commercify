import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

import HomeSvg from '../svg/HomeSvg';
import BoxSvg from '../svg/BoxSvg';
import SearchSvg from '../svg/SearchSvg';
import CartSvg from '../svg/CartSvg';
import CogSvg from '../svg/CogSvg';

const Header = () => {
  return (
    <nav class={style.header}>
      <Link activeClassName={style.active} href="/">
        <HomeSvg />
      </Link>
      <Link activeClassName={style.active} href="/profile">
        <BoxSvg />
      </Link>
      <Link activeClassName={style.active} href="/profile/john">
        <SearchSvg />
      </Link>

      <Link activeClassName={style.active} href="/cart">
        <CartSvg />
      </Link>

      <Link activeClassName={style.active} href="/settings">
        <CogSvg />
      </Link>
    </nav>
  );
};

export default Header;
