import {FiSearch} from 'react-icons/fi'
import './style.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

 async function handleSearch(){
   
    if(input === ''){
      alert("Digite um cep")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Ops, erro ao buscar o cep!")
      setInput("")
    }
  }

  return (
    <div className="contanier">
      <h1 className="title">Buscador CEP</h1>

      <div className="contanierInput">
        <input type="text" 
        placeholder="Digite seu cep:"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />
        

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>

          <span> {cep.logradouro}</span>
          <span> Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;
