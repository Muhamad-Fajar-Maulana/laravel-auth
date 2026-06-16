import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; // <-- Import halaman Register
import Dashboard from './Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* <-- Tambahkan route ini */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;