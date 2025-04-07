"use client";
import "@/components/ui/sidebar/styles.css";
import { useEffect, useState } from "react";
import { Hamburger, CloseX, Arrow } from "@/components/ui/icons";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/badge/badge";
import ClickButton from "@/components/ui/button/click-button";
import { useRouter } from "next/navigation";
import {
	MenuItem,
	menuItems,
	SubMenuItem,
} from "@/components/ui/sidebar/sidebar-data";

const rolePriority: Record<string, number> = {
	"super-admin": 1,
	admin: 2,
	organization: 3,
	user: 4,
};
export default function Sidebar({ roles }: { roles: string[] }) {
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);
	const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [priorityRole, setPriorityRole] = useState<string | null>(null);

	useEffect(() => {
		if (roles.length === 0) {
			setPriorityRole(null);
			return;
		}

		// Find the role with the highest priority (smallest number)
		const highestPriorityRole = roles.reduce((highest, role) => {
			return rolePriority[role] > rolePriority[highest] ? role : highest;
		}, roles[0]);

		setPriorityRole(highestPriorityRole);
	}, [roles]);
	const toggleSidebar = () => {
		setIsExpanded((prev) => !prev);
		setOpenSubmenu(null);
	};

	const toggleSubmenu = (id: number | null) =>
		setOpenSubmenu((prev) => (prev === id ? null : id));
	const toggleMobileSidebar = () => {
		setIsExpanded(false);
		setOpenSubmenu(null);
		setIsMobileOpen((prev) => !prev);
	};
	const toggleBackDropClick = () => {
		setIsExpanded(false);
		setIsMobileOpen(false);
		setOpenSubmenu(null);
	};
	const onClickMenuItem = (item: MenuItem) => {
		if (item.submenu) {
			if (!isExpanded) toggleSidebar();
			toggleSubmenu(item.id);
		}
		if (!item.submenu && isExpanded) {
			setIsExpanded(false);
			setOpenSubmenu(null);
		}
		if (!item.submenu && item.onClick) {
			item.onClick();
		} else if (item.redirect) {
			router.push(item.redirect);
		}
		if (item.title === "Logout") {
			setTimeout(() => {
				window.location.reload();
			}, 500);
		}
	};

	const onClickSubMenuItem = (subMenu: SubMenuItem) => {
		toggleBackDropClick();
		router.push(subMenu.redirect || "/");
		if (subMenu.onClick) {
			subMenu.onClick();
		} else if (subMenu.redirect) {
			router.push(subMenu.redirect || "/");
		}
	};

	return (
		<>
			{/* Mobile Menu Button */}
			{isMobileOpen ? (
				<ClickButton
					id="mobile-toggle-button"
					variant="none"
					size="none"
					onClick={isExpanded ? toggleMobileSidebar : toggleSidebar}
					className="mobile-toggle-button rounded sm:block z-20"
				>
					{isExpanded ? (
						<CloseX width={36} height={36} />
					) : (
						<Arrow
							className={cn(
								"arrow-icon-left",
								isExpanded ? "rotate-0" : "rotate-180"
							)}
						/>
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

			{(isMobileOpen || isExpanded) && (
				<button
					className="fixed h-screen w-full backdrop-blur-xs z-40 bg-secondary-10"
					onClick={toggleBackDropClick}
				></button>
			)}
			{/* Sidebar */}
			<motion.div
				animate={{ width: isExpanded ? "18rem" : "4rem" }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className={cn(
					"sidebar",
					isExpanded ? "w-72" : "w-20",
					isMobileOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				{/* Header */}
				<header className="sidebar-header">
					{isExpanded && (
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
						{isExpanded ? (
							<CloseX />
						) : (
							<Arrow className="arrow-icon-left rotate-180" />
						)}
					</ClickButton>
					{isMobileOpen && isExpanded ? (
						<ClickButton
							id="sidebar-toggle"
							variant="none"
							size="none"
							onClick={toggleMobileSidebar}
							className=""
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
							priorityRole &&
							item.role.some(
								(role) => role.toLowerCase() === priorityRole.toLowerCase()
							) && (
								<div key={item.id}>
									<ClickButton
										id={`menu-item-${item.id}`}
										variant="none"
										size="none"
										className="menu-item flex w-full items-center rounded p-4 sm:py-3 transition hover:bg-gray-700"
										onClick={() => onClickMenuItem(item)}
										title={item.title}
									>
										{item.icon && <item.icon className="h-6 w-6" />}
										{isExpanded && <span className="ml-3">{item.title}</span>}
										{item.chip && isExpanded && (
											<Badge size="xs" color="yellow">
												{item.chip}
											</Badge>
										)}
										{item.submenu && isExpanded && (
											<Arrow
												className={cn(
													"ml-auto transition-transform rotate-270",
													openSubmenu === item.id && "rotate-90"
												)}
											/>
										)}
									</ClickButton>

									{/* Submenu */}
									{item.submenu && openSubmenu === item.id && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											className="submenu-item-container ml-8 space-y-1 "
										>
											{item.submenu.map(
												(sub) =>
													priorityRole &&
													sub.role.some(
														(role) =>
															role.toLowerCase() === priorityRole.toLowerCase()
													) && (
														<ClickButton
															id={`submenu-item-${sub.id}`}
															key={sub.id}
															variant="none"
															size="none"
															className="submenu-item block w-full p-2 text-gray-300 hover:bg-gray-700 opacity-100 hover:text-white pl-4 text-left"
															onClick={() => onClickSubMenuItem(sub)}
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
