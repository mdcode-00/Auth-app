import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { Link } from 'react-router-dom';

function Header({ toggleTheme, darkMode }) {


  const { authLogOut, user } = useAuthStore();

  return (
   <header
  className={`
    flex items-center justify-between p-4
    transition-colors duration-300
    ${darkMode
      ? 'bg-gray-900 text-gray-200'
      : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-neutral-100'
    }
  `}
>
  <div className="flex items-center w-full max-w-6xl mx-auto">
    <h1 className="text-2xl font-extrabold tracking-wide">
      Auth
    </h1>

    <div className="flex-1 flex justify-end space-x-4">

      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`
          px-4 py-2 rounded-md transition-colors duration-300
          ${darkMode
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }
        `}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      {/* Auth area */}
      {user ? (
        <button
          onClick={authLogOut}
          className={`
            px-4 py-2 rounded-md border transition-colors duration-300
            ${darkMode
              ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
              : 'bg-emerald-600 text-white border-neutral-500 hover:bg-emerald-700'
            }
          `}
        >
          Log Out
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className={`
              px-4 py-2 rounded-md border transition-colors duration-300
              ${darkMode
                ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
                : 'text-neutral-100 border-neutral-500 hover:bg-neutral-800'
              }
            `}
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className={`
              px-4 py-2 rounded-md border transition-colors duration-300
              ${darkMode
                ? 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'
                : 'text-neutral-100 border-neutral-500 hover:bg-neutral-800'
              }
            `}
          >
            Sign Up
          </Link>
        </>
      )}

    </div>
  </div>
</header>



  );
}

export default Header;
