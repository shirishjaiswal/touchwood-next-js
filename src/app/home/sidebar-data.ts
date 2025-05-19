import axios from "axios";

import { MenuItem } from "@/components/ui/sidebar/sidebar-data";
import { Arrow, Chat, Configuration, Home, Logout, Settings, User } from "@/components/ui/icons";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: Home,
    role: ["admin"],
    redirect: "/home/dashboard",
  },
  {
    id: 2,
    title: "Dashboard",
    icon: Home,
    role: ["user"],
    redirect: "/home/dashboard",
  },
  {
    id: 3,
    title: "Configuration",
    icon: Configuration,
    submenu: [
      {
        id: 21,
        title: "Profile",
        role: ["admin", "user"],
        redirect: "/home/configuration/profile/edit",
      },
      {
        id: 22,
        title: "Email",
        role: ["admin", "user"],
        redirect: "/home/configuration/email-template",
      },
      {
        id: 23,
        title: "Profile Config",
        role: ["admin", "user"],
        redirect: "/admin/configuration/profile/edit",
      },
    ],
    role: ["admin", "user"],
    redirect: "",
  },
  {
    id: 4,
    title: "User",
    icon: User,
    submenu: [
      { id: 31, title: "Role", role: ["admin"], redirect: "/home/user/role" },
      { id: 32, title: "Admins", role: ["admin"] },
    ],

    role: ["admin"],
  },
  { id: 5, title: "Reports", icon: Arrow, chip: "New", role: ["admin"] },
  {
    id: 6,
    title: "Settings",
    icon: Settings,
    submenu: [
      { id: 61, title: "Profile", role: ["admin"] },
      { id: 62, title: "Preferences", role: ["admin"] },
    ],
    role: ["admin"],
  },
  {
    id: 8,
    title: "Chat",
    icon: Chat,
    submenu: [
      {
        id: 82,
        title: "Mail",
        redirect: "/home/chat/mail/private-email-templates",
        role: ["admin", "user"],
      },
      {
        id: 81,
        title: "AI Chat",
        redirect: "/home/chat/ai-chat",
        role: ["admin", "user"],
      },
    ],
    role: ["admin", "user"],
  },
  {
    id: 9,
    title: "Account",
    icon: User,
    submenu: [
      {
        id: 91,
        title: "Mail",
        redirect: "/home/account/mail",
        role: ["admin", "user"],
      },
      {
        id: 92,
        title: "Email Configuration",
        redirect: "/home/account/email-config",
        role: ["admin", "user"],
      },
      {
        id: 93,
        title: "Settings",
        redirect: "/home/account/settings/personal",
        role: ["admin", "user"],
      },
    ],
    role: ["user", "admin"],
  },
  {
    id: 100,
    title: "Logout",
    icon: Logout,
    redirect: "/auth/login",
    onClick: () => {
      axios.post("/api/auth/logout");
    },
    role: ["admin", "user"],
  },
];