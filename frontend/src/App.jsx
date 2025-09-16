import './App.css';
import Cabecalho from './componentes/Cabecalho';
import ResumoProcessos from './componentes/ResumoProcessos';
import ListaProcessos from './componentes/ListaProcessos';
import ModalNovoProcesso from './componentes/ModalNovoProcesso';
import ModalAndamentos from './componentes/ModalAndamentos';
import { useState, useEffect } from 'react';

function App() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirAndamentos, setAbrirAndamentos] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState(null);
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    carregarProcessos();
  }, []);

  const carregarProcessos = () => {
    fetch("http://localhost:3000/processos")
      .then(res => res.json())
      .then(data => setProcessos(data))
      .catch(err => console.error("Erro ao buscar processos:", err));
  };

  const atualizarOuAdicionarProcesso = (procAtualizado) => {
    setProcessos(prev => {
      const index = prev.findIndex(p => p.id === procAtualizado.id);
      if (index > -1) {
        const novos = [...prev];
        novos[index] = procAtualizado;
        return novos;
      } else {
        return [procAtualizado, ...prev];
      }
    });
  };

  const excluirProcesso = async (id) => {
    if (!window.confirm('Deseja realmente excluir este processo?')) return;
    try {
      const res = await fetch(`http://localhost:3000/processos/${id}`, { method: 'DELETE' });
      const data = await res.json();
      alert(data.message);
      setProcessos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir processo');
    }
  };

  return (
    <div className="container-principal">
      <Cabecalho onNovo={() => {
        setProcessoSelecionado(null);
        setAbrirModal(true);
      }} />
      <main>
        <ResumoProcessos processos={processos} />
        <ListaProcessos 
          processos={processos} 
          onEditar={(proc) => {
            setProcessoSelecionado(proc);
            setAbrirModal(true);
          }}
          onExcluir={excluirProcesso}
          onAndamentos={(proc) => {
            setProcessoSelecionado(proc);
            setAbrirAndamentos(true);
          }}
        />
        {abrirModal && (
          <ModalNovoProcesso 
            onFechar={() => setAbrirModal(false)}
            onProcessoCadastrado={atualizarOuAdicionarProcesso}
            processo={processoSelecionado}
          />
        )}
        {abrirAndamentos && processoSelecionado && (
          <ModalAndamentos 
            processo={processoSelecionado} 
            onFechar={() => {
              setAbrirAndamentos(false);
              setProcessoSelecionado(null);
            }}
            onAtualizarProcesso={atualizarOuAdicionarProcesso}
          />
        )}
      </main>
    </div>
  )
}

export default App;