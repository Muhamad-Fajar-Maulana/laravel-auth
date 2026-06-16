import { useState } from "react"; // <-- Sudah diperbaiki dari 'Import' menjadi 'import'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // <-- 1. AKTIFKAN NAVIGASI DI SINI

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email: email,
                    password: password,
                },
            );

            // Simpan token ke localStorage
            localStorage.setItem("token", response.data.access_token);
            alert("Login Berhasil!");

            // 2. JALUR PERPINDAHAN HALAMAN OTOMATIS KE DASHBOARD
            navigate("/dashboard");
        } catch (error) {
            alert(
                "Login Gagal: " +
                    (error.response?.data?.message || error.message),
            );
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
