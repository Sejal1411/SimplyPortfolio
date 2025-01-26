import React, { useMemo } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const Sidenav = ({ color }) => {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "") || "dashboard";

  // Fetch and clean userName from localStorage
  const userName = useMemo(() => {
    const storedName = localStorage.getItem("userName") || "";
    return storedName.replace(/^\"|\"$/g, "");
  }, []);

  // Icons centralized for reuse
  const icons = useMemo(() => ({
    dashboard: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.625 2.75v3.25m0 12.25v3.25m9.1-12.5H15.5m0 0v-3.25h-7v3.25H4.275m11.225 0V19.25H4.275V7.25"
        />
      </svg>
    ),
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3.75 6.75h16.5M12 17.25V3.75"
        />
      </svg>
    ),
    tables: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3.75 6.75h16.5M12 17.25V3.75"
        />
      </svg>
    ),
    billing: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3.75 6.75h16.5M12 17.25V3.75"
        />
      </svg>
    ),
  }), []);

  // Menu items configuration
  const menuItems = useMemo(
    () => [
      { key: "1", path: "/dashboard", label: "Dashboard", icon: icons.dashboard },
      { key: "2", path: "/mostsearched", label: "Most Searched Data", icon: icons.svg },
      { key: "3", path: "/tables", label: "Tables", icon: icons.tables },
      { key: "4", path: "/billing", label: "Billing", icon: icons.billing },
    ],
    [icons]
  );

  // Helper function to check active status
  const isActive = (route) => page === route.replace("/", "");

  return (
    <div className="sidenav">
      <div className="brand">
        <h1>{userName}</h1>
      </div>

      <Menu mode="vertical">
        {menuItems.map(({ key, path, label, icon }) => (
          <Menu.Item key={key}>
            <NavLink to={path}>
              <span
                className="icon"
                style={{ background: isActive(path) ? color : "" }}
              >
                {icon}
              </span>
              <span className="label">{label}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidenav;

