'use client';
import './styles.css';
import { HtmlHTMLAttributes } from 'react';

type NavBarProps = HtmlHTMLAttributes<HTMLDivElement>;

function NavBar({ className }: NavBarProps) {
  return (
    <div id="authorized-nav-bar" className={className}>
      <nav id="nav-items">
        <div id="side-left">
          <h1 id="title">TouchWood</h1>
        </div>
        <div id="side-right">
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
