import {
  CalendarDays,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mobileItems = [
  {
    label: "Home",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Schedule",
    path: "/schedules",
    icon: MessageSquare,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "More",
    path: "/settings",
    icon: MoreHorizontal,
  },
];

function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {mobileItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={21} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MobileNav;