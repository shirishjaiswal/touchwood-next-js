import { Home, Settings, User, Arrow, Logout, Configuration, Chat } from '@/components/ui/icons';
import axios from 'axios';

export interface Item {
  id: number;
  title: string;
  icon?: React.FC<{ className?: string }>;
  chip?: string;
  link?: string;
  redirect?: string;
  onClick?: () => void;
  role: string[]  ;
}

export type SubMenuItem = Item;

export interface MenuItem extends Item {
  submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: Home,
    role: ['admin']
  },
  {
    id: 2,
    title: 'Dashboard',
    icon: Home,
    role: ['user']
  },
  {
    id: 3,
    title: 'Configuration',
    icon: Configuration,
    submenu: [
      { id: 21, title: 'Profile',role: ['admin', 'user'], redirect: '/home/configuration/profile/edit', },
      { id: 22, title: 'Email', role: ['admin', 'user'], redirect: '/home/configuration/email-template' },
    ],
  
    role: ['admin', 'user']
  },
  {
    id: 4,
    title: 'User',
    icon: User,
    submenu: [
      { id: 31, title: 'Role', role: ['admin'], redirect: '/home/user/role' },
      { id: 32, title: 'Admins', role: ['admin'] },
    ],
  
    role: ['admin']
  },
  { id: 5, title: 'Reports', icon: Arrow, chip: 'New', role: ['admin'] },
  {
    id: 6,
    title: 'Settings',
    icon: Settings,
    submenu: [
      { id: 61, title: 'Profile', role: ['admin'] },
      { id: 62, title: 'Preferences', role: ['admin'] },
    ],
  
    role: ['admin']
  },
  {
    id: 7,
    title: 'Account',
    icon: User,
    submenu: [
      { id: 72, title: 'Mail', redirect: '/home/account/mail', role: ['admin', 'user'] },
      { id: 71, title: 'Email Configuration', redirect: '/home/account/email-config', role: ['admin', 'user'] },
    ],
  
    role: ['user', 'admin']
  },
  {
    id: 8,
    title: 'Chat',
    icon: Chat,
    submenu: [
      { id: 82, title: 'Mail', redirect: '/home/chat/mail/private-email-templates', role: ['admin', 'user'] },
      { id: 81, title: 'AI Chat', redirect: '/home/chat/ai-chat', role: ['admin', 'user'] },
    ],
    role: ['admin', 'user']
  },
  {
    id: 100,
    title: 'Logout',
    icon: Logout,
    redirect: '/auth/login',
    onClick: () => {
      axios.post('/api/auth/logout');
    },
    role: ['admin', 'user']
  }
];