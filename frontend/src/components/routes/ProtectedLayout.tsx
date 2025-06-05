import React, { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useAuth } from "../../hooks/useAuth";

interface LinkProps {
  to: string;
  title: string;
  icon: React.ReactNode;
}

const doctorLinks: LinkProps[] = [
  {
    to: "/agenda",
    title: "Agenda",
    icon: <CalendarMonthIcon fontSize='small' className='mr-2' />,
  },
];

const pacientLinks: LinkProps[] = [
  {
    to: "/medicos",
    title: "Médicos",
    icon: <PeopleAltIcon fontSize='small' className='mr-2' />,
  },
  {
    to: "/minhas-consultas",
    title: "Consultas",
    icon: <AssignmentIcon fontSize='small' className='mr-2' />,
  },
];

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isDoctor = user && "crm" in user;
  const links = isDoctor ? doctorLinks : pacientLinks;

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <aside className='w-56 min-h-screen bg-gray-100 p-6 flex flex-col gap-4 border-r border-gray-200'>
        <div className='font-extrabold text-2xl mb-8'>Agenda Médica</div>
        <>
          {links.map(({ to, icon, title }, index) => (
            <Link
              key={index.toString()}
              to={to}
              className={`text-lg rounded px-2 py-2 transition-colors ${
                location.pathname.startsWith(to)
                  ? "font-bold text-white bg-gray-400"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {icon}
              {title}
            </Link>
          ))}
          <button
            className='text-lg text-red-600 text-left px-2 py-2 rounded hover:bg-red-50 transition-colors'
            onClick={signOut}
          >
            <LogoutIcon fontSize='small' className='mr-2' />
            Logout
          </button>
        </>
      </aside>
      <main className='flex-1 min-h-screen bg-gray-50'>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
