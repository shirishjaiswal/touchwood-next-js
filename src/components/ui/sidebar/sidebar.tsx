"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import Badge from "@/components/ui/badge/badge";
import ClickButton from "@/components/ui/button/click-button";
import { setScreenLoading } from "@/hooks/use-screen-loading";
import { Arrow, CloseX, Hamburger } from "@/components/ui/icons";
import { MenuItem, menuItems, SubMenuItem } from "@/components/ui/sidebar/sidebar-data";

import "@/components/ui/sidebar/styles.css";

const ROLE_PRIORITY: Record<string, number> = {
  "super-admin": 1,
  admin: 2,
  organization: 3,
  user: 4,
};

export type SidebarProps = {
  roles: string[];
};

export default function Sidebar({ roles }: SidebarProps) {
  const router = useRouter();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (roles.length === 0) {
      setUserRole(null);
      return;
    }
    const highestPriorityRole = roles.reduce((highest, role) =>
      ROLE_PRIORITY[role] < ROLE_PRIORITY[highest] ? role : highest, roles[0]
    );
    setUserRole(highestPriorityRole);
  }, [roles]);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (submenuId: number | null) => {
    setActiveSubmenu((prev) => (prev === submenuId ? null : submenuId));
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
    setSidebarExpanded(false);
    setActiveSubmenu(null);
  };

  const handleBackdropClick = () => {
    setSidebarExpanded(false);
    setMobileSidebarOpen(false);
    setActiveSubmenu(null);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.submenu) {
      if (!isSidebarExpanded) toggleSidebar();
      toggleSubmenu(item.id);
      return;
    }

    if (!item.submenu && isSidebarExpanded) {
      setSidebarExpanded(false);
      setActiveSubmenu(null);
    }

    if (!item.submenu && item.redirect) {
      setScreenLoading(true);
      router.push(item.redirect);
      setScreenLoading(false);
    }

    if (item.title === "Logout") {
      setTimeout(() => window.location.reload(), 500);
    }
  };

  const handleSubmenuItemClick = (submenuItem: SubMenuItem) => {
    setScreenLoading(true);
    handleBackdropClick();
    if (submenuItem.redirect) router.push(submenuItem.redirect);
    setScreenLoading(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobileSidebarOpen ? (
        <ClickButton
          id="mobile-toggle-button"
          variant="none"
          size="none"
          onClick={isSidebarExpanded ? toggleMobileSidebar : toggleSidebar}
          className="mobile-toggle-button rounded sm:block z-20"
        >
          {isSidebarExpanded ? (
            <CloseX width={36} height={36} />
          ) : (
            <Arrow className={clsx("arrow-icon-left", isSidebarExpanded ? "rotate-0" : "rotate-180")} />
          )}
        </ClickButton>
      ) : (
        <ClickButton
          id="mobile-toggle-button"
          variant="none"
          size="none"
          onClick={toggleMobileSidebar}
          className="mobile-toggle-button"
        >
          <Hamburger width={36} height={36} />
        </ClickButton>
      )}

      {(isMobileSidebarOpen || isSidebarExpanded) && (
        <button
          className="fixed h-screen w-full backdrop-blur-xs z-40 bg-secondary-10"
          onClick={handleBackdropClick}
        ></button>
      )}

      {/* Sidebar */}
      <motion.div
        animate={{ width: isSidebarExpanded ? "18rem" : "4rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "sidebar",
          isSidebarExpanded ? "w-72" : "w-20",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <header className="sidebar-header">
          {isSidebarExpanded && (
            <ClickButton
              id="sidebar-header-content"
              variant="none"
              size="none"
              className="sidebar-header-content"
            >
              Sidebar
            </ClickButton>
          )}
          <ClickButton
            id="sidebar-toggle"
            variant="none"
            size="none"
            onClick={toggleSidebar}
            className="hidden rounded sm:block"
          >
            {isSidebarExpanded ? <CloseX /> : <Arrow className="rotate-180" />}
          </ClickButton>
          {isMobileSidebarOpen && isSidebarExpanded ? (
            <ClickButton
              id="sidebar-toggle"
              variant="none"
              size="none"
              onClick={toggleMobileSidebar}
            >
              <CloseX />
            </ClickButton>
          ) : (
            <ClickButton
              id="sidebar-toggle"
              variant="none"
              size="none"
              onClick={toggleSidebar}
              className="sm:hidden"
            >
              <Arrow className="rotate-180" />
            </ClickButton>
          )}
        </header>

        {/* Navigation */}
        <main className="sidebar-body">
          {menuItems.map(
            (item) =>
              userRole &&
              item.role.some(role => role.toLowerCase() === userRole.toLowerCase()) && (
                <div key={item.id}>
                  <ClickButton
                    id={`menu-item-${item.id}`}
                    variant="none"
                    size="none"
                    className="menu-item flex w-full items-center rounded p-4 sm:py-3 transition hover:bg-gray-700"
                    onClick={() => handleMenuItemClick(item)}
                    title={item.title}
                  >
                    {item.icon && <item.icon className="h-6 w-6" />}
                    {isSidebarExpanded && <span className="ml-3">{item.title}</span>}
                    {item.chip && isSidebarExpanded && (
                      <Badge size="xs" color="yellow">{item.chip}</Badge>
                    )}
                    {item.submenu && isSidebarExpanded && (
                      <Arrow
                        className={clsx(
                          "ml-auto transition-transform rotate-270",
                          activeSubmenu === item.id && "rotate-90"
                        )}
                      />
                    )}
                  </ClickButton>

                  {/* Submenu */}
                  {item.submenu && activeSubmenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="submenu-item-container ml-8 space-y-1"
                    >
                      {item.submenu.map(
                        (sub) =>
                          userRole &&
                          sub.role.some(role => role.toLowerCase() === userRole.toLowerCase()) && (
                            <ClickButton
                              id={`submenu-item-${sub.id}`}
                              key={sub.id}
                              variant="none"
                              size="none"
                              className="submenu-item block w-full p-2 text-gray-300 hover:bg-gray-700 opacity-100 hover:text-white pl-4 text-left"
                              onClick={() => handleSubmenuItemClick(sub)}
                            >
                              {sub.title}
                            </ClickButton>
                          )
                      )}
                    </motion.div>
                  )}
                </div>
              )
          )}
        </main>
      </motion.div>
    </>
  );
}
