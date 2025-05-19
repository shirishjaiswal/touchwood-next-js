"use client";

import "@/components/ui/nav-bar/styles.css";
import { HTMLProps } from "react";

interface NavBarProps extends HTMLProps<HTMLDivElement> {}

const NavBar: React.FC<NavBarProps> = ({ className, ...props }) => {
  return (
    <div id="authorized-nav-bar" className={className} {...props}>
      <nav id="nav-items">
        <div id="side-left">
          <h1 id="title">TouchWood</h1>
        </div>
        <div id="side-right">{/* Right side content can be added here */}</div>
      </nav>
    </div>
  );
};

export default NavBar;
