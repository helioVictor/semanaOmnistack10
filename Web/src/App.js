import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
// Componente - Bloco isolado de html/css/js, o qual não interfere no restante de aplicação *primeira letra maiúscula
// Propriedade/Atributo - Quando é passado um atributo para um componente no React - Herança
// Estado - Informações mantidas pelo componentes (Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
        const response = await api.get('/devs');
          
        setDevs(response.data);
    }

    loadDevs();
  }, []); 

  async function handleAddDev(data) {
    const response = await api.post('./devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            < DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
