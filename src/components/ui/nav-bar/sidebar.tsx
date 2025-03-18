'use client';
import './styles.css';
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import ClickButton from '../button/click-button';
import { Login } from '../icons';


const SidebarMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="absolute top-0 left-0 h-screen z-50 bg-primary">
      <Sidebar
        collapsed={collapsed}
        collapsedWidth='24px'
        onBackdropClick={() => setCollapsed(false)}
      >
        <Menu
          renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>}
          transitionDuration={1000}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#d359ff',
                  backgroundColor: active ? '#eecef9' : undefined,
                };
            },
          }}
        >
          <SubMenu label="Charts">
            <MenuItem icon={<Login width={20} height={20} color='red' />}> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem prefix="🔥" active icon={<Login width={20} height={20} color='red' />}>
            Calendar (active)
          </MenuItem>
          <MenuItem disabled  suffix="🔥">
            E-commerce (disabled)
          </MenuItem>
          <MenuItem > Examples</MenuItem>
        </Menu>
      </Sidebar>
      <ClickButton id="#guest-menu-button" onClick={() => setCollapsed(!collapsed)} />
    </div>
  );
};

export default SidebarMenu;
