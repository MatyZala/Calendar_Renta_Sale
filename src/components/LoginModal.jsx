import axios from "axios";
import React, { useState } from "react";
import Modal from 'react-modal'

export default function ({ isOpen, onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (email !== '' && password !== '') {
                const user = {
                    email,
                    password
                }

                setLoading(true)
                await axios.post('/api/login', user)
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userId', user.email);
                onClose();
            }
        } catch (error) {
            console.error("Error de red", error);
        }
    };


    const gradientButtonStyle = {
        background: "linear-gradient(to right, #4e9cff, #4285f4)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="custom-modal">
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={gradientButtonStyle}>Iniciar Sesión</button>
            </form>

        </Modal>
    )
}
