import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirmation) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation // Sesuai dengan validasi Laravel 'confirmed'
      });
      
      // Simpan token ke localStorage otomatis setelah register sukses
      localStorage.setItem('token', response.data.access_token);
      alert('Registrasi Berhasil!');
      navigate('/dashboard'); // Langsung lempar ke dashboard
    } catch (error) {
      alert('Registrasi Gagal: ' + JSON.stringify(error.response.data));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register Akun Baru</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} required /><br/><br/>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Password (Min. 8 Karakter)" value={password} onChange={e => setPassword(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Konfirmasi Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required /><br/><br/>
        <button type="submit">Daftar Sekarang</button>
      </form>
      <p>Sudah punya akun? <Link to="/">Login di sini</Link></p>
    </div>
  );
}

export default Register;