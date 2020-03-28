import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import './styles.css';

export default function Login() {
    const [ id, setId ] = useState('');
    const history = useHistory();
    
    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            id
        }

        try {
            const response = await api.post('sessions', data);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile');
        } catch(err) {
            alert("Não foi possível efetuar o login!");
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />

                <form>
                    <h1>Login</h1>

                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit" onClick={handleLogin}>Entrar</button>

                    <Link classname="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro, quero me cadastrar!
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}