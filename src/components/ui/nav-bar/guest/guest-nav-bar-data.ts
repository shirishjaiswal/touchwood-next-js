import {
  Login,
  Register,
  Home,
  About,
  Help,
} from '@/components/ui/icons';
interface NavContent {
  id: string;
  title: string;
  icon: React.FC<{ className?: string, color?: string }>;
  className?: string;
  chip?: string;
  redirect: string;
}
export const navContent: NavContent[] = [
  {
    id: 'home',
    title: 'Home',
    icon: Home,
    className: 'nav-item',
    redirect: '/',
  },
  {
    id: 'login',
    title: 'Login',
    icon: Login,
    className: 'nav-item',
    redirect: '/auth/login',
  },
  {
    id: 'register',
    title: 'Register',
    icon: Register,
    className: 'nav-item',
    redirect: '/auth/register',
  },
  {
    id: 'about',
    title: 'About',
    icon: About,
    className: 'nav-item',
    redirect: '/about',
  },
  {
    id: 'help',
    title: 'Help',
    icon: Help,
    className: 'nav-item',
    redirect: '/help',  
  },
]