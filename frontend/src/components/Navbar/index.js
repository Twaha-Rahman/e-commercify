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
      <Link activeClassName={style.active} aria-label="Home" href="/">
        <HomeSvg />
      </Link>
      <Link
        activeClassName={style.active}
        aria-label="Categories"
        href="/profile"
      >
        <BoxSvg />
      </Link>
      <Link
        activeClassName={style.active}
        aria-label="Search"
        href="/profile/john"
      >
        <SearchSvg />
      </Link>

      <Link activeClassName={style.active} aria-label="Cart" href="/cart">
        <CartSvg />
      </Link>

      <Link
        activeClassName={style.active}
        aria-label="Settings"
        href="/settings"
      >
        <CogSvg />
      </Link>
    </nav>
  );
};

export default Header;
