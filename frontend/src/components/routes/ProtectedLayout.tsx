import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isDoctor = user && "crm" in user;

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <aside className='w-56 min-h-screen bg-gray-100 p-6 flex flex-col gap-4 border-r border-gray-200'>
        <div className='font-extrabold text-2xl mb-8 text-blue-700'>
          Agenda Médica
        </div>
        {isDoctor ? (
          <>
            <Link
              to='/agenda'
              className={`text-lg rounded px-2 py-2 transition-colors ${
                location.pathname.startsWith("/agenda")
                  ? "font-bold text-blue-600 bg-blue-100"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Agenda
            </Link>
            <button
              className='text-lg text-red-600 text-left px-2 py-2 rounded hover:bg-red-50 transition-colors'
              onClick={signOut}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to='/medicos'
              className={`text-lg rounded px-2 py-2 transition-colors ${
                location.pathname.startsWith("/medicos")
                  ? "font-bold text-blue-600 bg-blue-100"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Médicos
            </Link>
            <Link
              to='/minhas-consultas'
              className={`text-lg rounded px-2 py-2 transition-colors ${
                location.pathname.startsWith("/minhas-consultas")
                  ? "font-bold text-blue-600 bg-blue-100"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              Consultas
            </Link>
            <button
              className='text-lg text-red-600 text-left px-2 py-2 rounded hover:bg-red-50 transition-colors'
              onClick={signOut}
            >
              Logout
            </button>
          </>
        )}
      </aside>
      <main className='flex-1 min-h-screen bg-gray-50'>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
