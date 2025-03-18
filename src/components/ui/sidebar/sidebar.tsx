'use client';
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  FileText,
  Users,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/badge/badge';
import ClickButton from '../button/click-button';

const menuItems = [
  { id: 1, title: 'Dashboard', icon: Home },
  {
    id: 2,
    title: 'Users',
    icon: Users,
    submenu: [
      { id: 21, title: 'All Users' },
      { id: 22, title: 'Admins' },
    ],
  },
  { id: 3, title: 'Reports', icon: FileText, chip: 'New' },
  {
    id: 4,
    title: 'Settings',
    icon: Settings,
    submenu: [
      { id: 41, title: 'Profile' },
      { id: 42, title: 'Preferences' },
    ],
  },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev)
    setOpenSubmenu(null)
  };
  const toggleSubmenu = (id) => setOpenSubmenu((prev) => (prev === id ? null : id));
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Menu Button */}
      <ClickButton
      variant='none'
        size="none"
        onClick={toggleMobileSidebar}
        className="fixed top-4 z-50 rounded-tl-none rounded-bl-none rounded-tr-4xl rounded-br-4xl px-4 bg-primary text-white sm:hidden"
      >
        <Menu width={36} height={36} />
      </ClickButton>

      {/* Sidebar */}
      <motion.div
       initial={{ width: '4rem' }}
       animate={{ width: isExpanded ? '18rem' : '4rem' }}
       transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'bg-primary fixed sm:top-16 left-0 z-40 flex h-screen flex-col text-white  transition-transform duration-300 ease-in-out ',
          isExpanded ? 'w-72' : 'w-20',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          'sm:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700  p-4">
          {isExpanded && <span className="text-lg font-semibold">Sidebar</span>}
          <ClickButton
            variant="none"
            size="none"
            onClick={toggleSidebar}
            className="hidden rounded sm:block"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </ClickButton>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <ClickButton
                variant="none"
                size="none"
                className="flex w-full items-center rounded p-4 sm:py-3 transition hover:bg-gray-700"
                onClick={() => item.submenu && toggleSubmenu(item.id)}
              >
                <item.icon className="h-5 w-5" />
                {isExpanded && (
                  <span className="ml-3">{item.title}</span>
                )}
                {item.chip && isExpanded && (
                  <Badge size="xs" color="yellow">
                    {item.chip}
                  </Badge>
                )}
                {item.submenu && isExpanded && (
                  <ChevronDown
                    className={cn(
                      'ml-auto transition-transform',
                      openSubmenu === item.id && 'rotate-180'
                    )}
                  />
                )}
              </ClickButton>

              {/* Submenu */}
              {item.submenu && openSubmenu === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="ml-8 space-y-1"
                >
                  {item.submenu.map((sub) => (
                    <ClickButton
                      key={sub.id}
                      variant="none"
                      size="none"
                      className="block w-full p-2 text-gray-300 hover:text-white pl-4 text-left"
                    >
                      {sub.title}
                    </ClickButton>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
    </>
  );
}