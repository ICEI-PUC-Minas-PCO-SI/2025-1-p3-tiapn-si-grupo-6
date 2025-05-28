import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../api/usuarios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getUsuarios();
      setUsuarios(data);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6">Gestão de Usuários</h1>

      {/* Seção de Pesquisa e Filtro */}
      <div className="flex gap-2 mb-6 w-full max-w-4xl justify-between">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Pesquisar por nome, login..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full"
          />
          <Button onClick={() => console.log("Pesquisar:", busca)}>Pesquisar</Button>
        </div>
        <Button variant="outline" onClick={() => alert("Abrir filtros avançados")}>
          Filtrar
        </Button>
      </div>

      {/* Modal de fundo + "Tabela" bonitinha */}
      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-6">
        <div className="grid grid-cols-5 font-semibold text-gray-700 border-b pb-2 mb-4">
          <span className="col-span-1">Cod</span>
          <span className="col-span-1">Nome</span>
          <span className="col-span-1">Contato</span>
          <span className="col-span-1">Tipo</span>
          <span className="col-span-1 text-right">Ações</span>
        </div>

        {usuarios.length === 0 && (
          <p className="text-center text-gray-500">Nenhum usuário cadastrado.</p>
        )}

        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="grid grid-cols-5 items-center py-2 px-2 rounded hover:bg-gray-50 transition"
          >
            <span className="col-span-1">{usuario.id}</span>
            <span className="col-span-1">{usuario.nome}</span>
            <span className="col-span-1">{usuario.email}</span>
            <span className="col-span-1 capitalize">{usuario.tipo}</span>
            <div className="col-span-1 flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Editar", usuario.id)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => console.log("Excluir", usuario.id)}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
