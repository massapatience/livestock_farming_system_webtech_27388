import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: '📊 Dashboard', roles: ['admin', 'farmer', 'vet'] },
  { to: '/animals',   label: '🐄 Animals',   roles: ['admin', 'farmer', 'vet'] },
  { to: '/health',    label: '💉 Health',     roles: ['admin', 'farmer', 'vet'] },
  { to: '/breeding',  label: '🐣 Breeding',   roles: ['admin', 'farmer'] },
  { to: '/feed',      label: '🌾 Feed',       roles: ['admin', 'farmer'] },
  { to: '/sales',     label: '💰 Sales',      roles: ['admin', 'farmer'] },
  { to: '/users',     label: '👥 Users',      roles: ['admin'] },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-green-700">🐾 LivestockMS</div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive ? 'bg-green-600' : 'hover:bg-green-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
        <div className="p-4 border-t border-green-700">
          <p className="text-xs text-green-300 mb-1">{user?.name}</p>
          <p className="text-xs text-green-400 capitalize mb-3">{user?.role}</p>
          <button onClick={handleLogout} className="w-full text-sm bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
