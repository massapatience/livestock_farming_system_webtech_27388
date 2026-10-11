import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function Breeding() {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchData = () => {
    api.get('/breeding').then((r) => setRecords(r.data));
    api.get('/animals').then((r) => setAnimals(r.data));
  };
  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/breeding', data);
      toast.success('Breeding record added!');
      reset(); setShowForm(false); fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const males = animals.filter((a) => a.gender === 'male');
  const females = animals.filter((a) => a.gender === 'female');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">Breeding Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          + Add Record
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl shadow mb-6 grid grid-cols-2 gap-4">
          <select {...register('maleId')} required className="border rounded-lg px-3 py-2">
            <option value="">Select Male *</option>
            {males.map((a) => <option key={a.id} value={a.id}>{a.tagNumber} - {a.species}</option>)}
          </select>
          <select {...register('femaleId')} required className="border rounded-lg px-3 py-2">
            <option value="">Select Female *</option>
            {females.map((a) => <option key={a.id} value={a.id}>{a.tagNumber} - {a.species}</option>)}
          </select>
          <div>
            <label className="text-sm text-gray-500">Mating Date *</label>
            <input {...register('matingDate')} type="date" required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Expected Birth Date</label>
            <input {...register('expectedDob')} type="date" className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>
          <textarea {...register('notes')} placeholder="Notes" className="border rounded-lg px-3 py-2 col-span-2" rows={2} />
          <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">Save</button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>{['Male ID', 'Female ID', 'Mating Date', 'Expected Birth', 'Offspring', 'Notes'].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">{r.maleId}</td>
                <td className="px-4 py-3 font-mono">{r.femaleId}</td>
                <td className="px-4 py-3">{r.matingDate}</td>
                <td className="px-4 py-3">{r.expectedDob || '—'}</td>
                <td className="px-4 py-3">{r.offspringCount}</td>
                <td className="px-4 py-3">{r.notes || '—'}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No breeding records yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
