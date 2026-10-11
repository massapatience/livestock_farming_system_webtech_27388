import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">🐾 Livestock System</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('email')} type="email" placeholder="Email" required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input {...register('password')} type="password" placeholder="Password" required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 font-medium">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-500">
          No account? <Link to="/register" className="text-green-700 font-medium">Register</Link>
        </p>
      </div>
    </div>
  );
}
