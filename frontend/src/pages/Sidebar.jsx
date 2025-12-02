import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "All Cars", path: "/cars" },
    { name: "My Ads", path: "/get/user/car" },
    { name: "Add Car", path: "/add-car" },
    { name: "Fetch Details", path: "/feed" },
    { name: "Search Pokemon", path: "/pokemon" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Car Rental Portal
      </div>
      <nav className="flex-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
