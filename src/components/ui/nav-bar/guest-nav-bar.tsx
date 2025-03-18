'use client';
import './styles.css';
import { HtmlHTMLAttributes, useState } from 'react';
import Link from 'next/link';
import ClickButton from '@/components/ui/button/click-button';
import {
  Hamburger,
  Login,
  Register,
  Home,
  About,
  Help,
  CloseX,
} from '@/components/ui/icons';

type GuestNavBarProps = HtmlHTMLAttributes<HTMLDivElement>;

function GuestNavBar({ className }: GuestNavBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuClick = () => setIsOpen(!isOpen);
  return (
    <div id="guest-nav-bar" className={className}>
      <div id='guest-menu-button-container'>

      <ClickButton
        id="guest-menu-button"
        variant="none"
        size="none"
        onClick={handleMenuClick}
        className="menu-button"
        >
        <Hamburger
          width={60}
          height={36}
          className="bg-primary rounded-tl-3xl rounded-bl-3xl"
          />
      </ClickButton>

          </div>
      <nav id="guest-nav-items" className="guest-nav nav">
        <div id="side-left">
          <h1 id="title">TouchWood</h1>
        </div>

        <div id="side-right">
          <Link href={'/'} className="nav-item group">
            <span>Home</span>
            <div className="nav-item-underline"></div>
          </Link>
          <Link href={'/login'} className="nav-item group">
            <span>Login</span>
            <div className="nav-item-underline"></div>
          </Link>
          <Link href={'/register'} className="nav-item group">
            <span>Sign Up</span>
            <div className="nav-item-underline"></div>
          </Link>
          <Link href={'/'} className="nav-item group">
            <span>About</span>
            <div className="nav-item-underline"></div>
          </Link>
          <Link href={'/'} className="nav-item group">
            <span>Help</span>
            <div className="nav-item-underline"></div>
          </Link>
        </div>
      </nav>
      <nav id="mobile">
        {isOpen && (
          <div id="side-right">
            <ClickButton
              onClick={handleMenuClick}
              variant="none"
              size="none"
              className="nav-item sticky top-0"
            >
              <CloseX width={30} height={30} color={'#022B3A'} />
            </ClickButton>
            <Link href={'/'} className="nav-item">
              <ClickButton
                onClick={handleMenuClick}
                variant="none"
                size="none"
                className="nav-item"
              >
                <Home color="#022B3A" />
                <span>Home</span>
                <div className="nav-item-underline"></div>
              </ClickButton>
            </Link>
            <Link href={'/login'} className="nav-item">
              <ClickButton
                onClick={handleMenuClick}
                variant="none"
                size="none"
                className="nav-item"
              >
                <Login color="#022B3A" />
                <span>Login</span>
              </ClickButton>
            </Link>
            <Link href={'/register'} className="nav-item">
              <ClickButton
                onClick={handleMenuClick}
                variant="none"
                size="none"
                className="nav-item"
              >
                <Register color="#022B3A" />
                <span>Sign Up</span>
              </ClickButton>
            </Link>
            <Link href={'/'} className="nav-item">
              <ClickButton
                onClick={handleMenuClick}
                variant="none"
                size="none"
                className="nav-item"
              >
                <About color="#022B3A" />
                <span>About</span>
              </ClickButton>
            </Link>
            <Link href={'/'} className="nav-item">
              <ClickButton
                onClick={handleMenuClick}
                variant="none"
                size="none"
                className="nav-item"
              >
                <Help color="#022B3A" />
                <span>Help</span>
              </ClickButton>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default GuestNavBar;
