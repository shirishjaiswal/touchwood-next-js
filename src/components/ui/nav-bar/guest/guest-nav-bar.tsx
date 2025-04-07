'use client';
import '@/components/ui/nav-bar/styles.css';
import { HtmlHTMLAttributes, useState } from 'react';
import Link from 'next/link';
import ClickButton from '@/components/ui/button/click-button';
import {
  Hamburger,
  CloseX,
} from '@/components/ui/icons';
import { navContent } from '@/components/ui/nav-bar/guest/guest-nav-bar-data';

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
          {navContent.map((item) => (
            <Link href={item.redirect || '/'} className="nav-item group" key={item.id}>
              <span>{item.title}</span>
              <div className="nav-item-underline"></div>
            </Link>
          ))}
        </div>
      </nav>
      <nav id="mobile">
        {isOpen && (
          <div id="side-right">
            <ClickButton
              id='mobile-close-button'
              onClick={handleMenuClick}
              variant="none"
              size="none"
              className="nav-item sticky top-0"
            >
              <CloseX width={30} height={30} color={'#022B3A'} />
            </ClickButton>
            {
              navContent.map((item) => (
                <Link href={item.redirect || '/'} className="nav-item group" key={item.id}>
                  <ClickButton
                    id={`mobile-${item.id}`}
                    onClick={handleMenuClick}
                    variant='none'
                    size='none'
                    className='nav-item'
                  >
                    {item.icon && <item.icon color='#022B3A' />}
                    <span>{item.title}</span>
                    <div className="nav-item-underline"></div>
                  </ClickButton>
                </Link>
              ))
            }
          </div>
        )}
      </nav>
    </div>
  );
}

export default GuestNavBar;
