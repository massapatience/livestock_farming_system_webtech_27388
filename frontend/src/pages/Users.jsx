import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => api.get('/users').then((r) => setUsers(r.data));
  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    await api.put(`/users/${id}/role`, { role });
    toast.success('Role updated'); fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    await api.delete(`/users/${id}`);
    toast.success('User deleted'); fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 mb-6">User Management</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>{['Name', 'Email', 'Role', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="border rounded px-2 py-1 text-xs">
                    <option value="admin">Admin</option>
                    <option value="farmer">Farmer</option>
                    <option value="vet">Vet</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
