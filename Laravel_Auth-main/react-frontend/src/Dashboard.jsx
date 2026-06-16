import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const api = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else {
            fetchProducts();
        }
    }, [token]);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Gagal mengambil data", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // PERBAIKAN 1: Menyesuaikan nama field agar dibaca Laravel (name & description) saat PUT
                await api.put(`/products/${editId}`, {
                    name: title,
                    description: content,
                });
                alert("Produk berhasil diperbarui!");
                setEditId(null);
            } else {
                // PERBAIKAN 2: Menyesuaikan nama field agar dibaca Laravel (name & description) saat POST
                await api.post("/products", {
                    name: title,
                    description: content,
                });
                alert("Produk berhasil ditambahkan!");
            }
            setTitle("");
            setContent("");
            fetchProducts();
        } catch (error) {
            alert("Gagal menyimpan data");
        }
    };

    const startEdit = (product) => {
        setEditId(product.id);
        // PERBAIKAN 3: Mengambil dari product.name dan product.description hasil cetakan Laravel
        setTitle(product.name);
        setContent(product.description);
    };

    const cancelEdit = () => {
        setEditId(null);
        setTitle("");
        setContent("");
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus produk ini?")) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert("Gagal menghapus produk");
            }
        }
    };

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Dashboard Produk</h2>
                <button
                    onClick={handleLogout}
                    style={{ backgroundColor: "red", color: "white" }}
                >
                    Logout
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                }}
            >
                <h3>{editId ? "Edit Produk" : "Tambah Produk Baru"}</h3>
                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <br />
                <textarea
                    placeholder="Deskripsi/Harga"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <br />
                <br />
                <button type="submit">
                    {editId ? "Perbarui Produk" : "Simpan Produk"}
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        style={{ marginLeft: "10px" }}
                    >
                        Batal
                    </button>
                )}
            </form>

            <h3>Daftar Produk</h3>
            <table
                border="1"
                cellPadding="10"
                style={{ width: "100%", borderCollapse: "collapse" }}
            >
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            {/* PERBAIKAN 4: Menampilkan data asli dari MySQL (name & description) */}
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                                <button
                                    onClick={() => startEdit(product)}
                                    style={{
                                        backgroundColor: "lightblue",
                                        marginRight: "5px",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={{ backgroundColor: "salmon" }}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
