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
    icon: <CalendarMonthIcon fontSize='small' className='md:mr-2' />,
  },
];

const pacientLinks: LinkProps[] = [
  {
    to: "/medicos",
    title: "Médicos",
    icon: <PeopleAltIcon fontSize='small' className='md:mr-2' />,
  },
  {
    to: "/minhas-consultas",
    title: "Consultas",
    icon: <AssignmentIcon fontSize='small' className='md:mr-2' />,
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
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      <aside className='w-full md:w-56 min-h-0 md:min-h-screen bg-gray-100 p-4 md:p-6 flex md:flex-col flex-row gap-2 md:gap-4 border-b md:border-b-0 md:border-r border-gray-200 items-center md:items-stretch'>
        <div className='font-extrabold text-2xl md:mb-8'>Agenda Médica</div>
        <div className='flex flex-row justify-between md:flex-col gap-2 w-full'>
          {links.map(({ to, icon, title }, index) => (
            <Link
              key={index.toString()}
              to={to}
              className={`flex items-center text-base md:text-lg rounded px-2 py-2 transition-colors max-w-[50%] md:max-w-full md:w-auto justify-center md:justify-start ${
                location.pathname.startsWith(to)
                  ? "font-bold text-white bg-gray-400"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {icon}
              <span className='hidden md:inline ml-2'>{title}</span>
            </Link>
          ))}
          <button
            className='text-lg text-red-600 text-left px-2 py-2 rounded hover:bg-red-50 transition-colors'
            onClick={signOut}
          >
            <LogoutIcon fontSize='small' className='mr-2' />
            <span className='hidden md:inline'>Sair</span>
          </button>
        </div>
      </aside>
      <main className='flex-1 min-h-screen bg-gray-50'>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
