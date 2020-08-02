import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

import HomeSvg from '../svg/HomeSvg';
import BoxSvg from '../svg/BoxSvg';
import SearchSvg from '../svg/SearchSvg';
import CartSvg from '../svg/CartSvg';
import CogSvg from '../svg/CogSvg';

const Header = () => {
  const color = 'var(--background-color-dark)';

  return (
    <nav class={style.header}>
      <Link activeClassName={style.active} href="/">
        <HomeSvg color={color} />
      </Link>
      <Link activeClassName={style.active} href="/profile">
        <BoxSvg color={color} />
      </Link>
      <Link activeClassName={style.active} href="/profile/john">
        <SearchSvg color={color} />
      </Link>

      <Link activeClassName={style.active} href="/profile/john">
        <CartSvg color={color} />
      </Link>

      <Link activeClassName={style.active} href="/profile/john">
        <CogSvg color={color} />
      </Link>
    </nav>
  );
};

export default Header;
