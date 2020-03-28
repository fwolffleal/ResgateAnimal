import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'

import './styles.css';
import api from '../../services/api';

export default function Incidents() {
    const ongId  = localStorage.getItem('ongId');
    
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value: price
        };

        try {
            await api.post(
                'incidents',
                data,
                {
                    headers: {
                        ong_id: ongId
                    }
                }
            );

            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar caso.');
        }
    }

    return(
        <div className="incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um doador para resolvê-lo.</p>
                    <Link classname="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para o perfil
                    </Link>
                </section>

                <form>
                    <input type="text" 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => { setTitle(e.target.value) }}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => { setDescription(e.target.value) }}
                    />
                   <input type="number" 
                        placeholder="Valor em R$"
                        value={price}
                        onChange={e => { setPrice(e.target.value) }}
                    />

                    <button className="button" type="submit" onClick={handleNewIncident} >Cadastrar</button>
                </form>
            </div>
        </div>
    );
}