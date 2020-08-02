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
      <Link
        activeClassName={style.active}
        aria-label="Home"
        alt="Link to Home page"
        href="/"
      >
        <HomeSvg />
      </Link>
      <Link
        activeClassName={style.active}
        aria-label="Categories"
        alt="Link to Categories page"
        href="/profile"
      >
        <BoxSvg />
      </Link>
      <Link
        activeClassName={style.active}
        alt="Link to Search page"
        aria-label="Search"
        href="/profile/john"
      >
        <SearchSvg />
      </Link>

      <Link
        activeClassName={style.active}
        alt="Link to Cart"
        aria-label="Cart"
        href="/cart"
      >
        <CartSvg />
      </Link>

      <Link
        activeClassName={style.active}
        alt="Link to Settings page"
        aria-label="Settings"
        href="/settings"
      >
        <CogSvg />
      </Link>
    </nav>
  );
};

export default Header;
