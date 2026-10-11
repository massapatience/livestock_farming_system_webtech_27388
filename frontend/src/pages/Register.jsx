import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      login(res.data.token, { name: data.name, role: data.role || 'farmer' });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name')} placeholder="Full Name" required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input {...register('email')} type="email" placeholder="Email" required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input {...register('password')} type="password" placeholder="Password" required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <select {...register('role')} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="farmer">Farmer</option>
            <option value="vet">Vet</option>
          </select>
          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 font-medium">
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Have an account? <Link to="/login" className="text-green-700 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
