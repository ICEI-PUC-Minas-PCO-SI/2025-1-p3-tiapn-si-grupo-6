import React from "react";
import { useParams } from "react-router-dom";

const EditarPedido = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Pedido - ID {id}</h1>
      {/* Formulário para editar o pedido */}
    </div>
  );
};

export default EditarPedido;
