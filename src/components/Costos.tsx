import React, { useState } from 'react';

interface Cost {
  description: string;
  amount: number;
}

const Costos: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [costs, setCosts] = useState<Cost[]>([]);

  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();
    setCosts([...costs, { description, amount: parseFloat(amount) }]);
    setDescription('');
    setAmount('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Registro de Costos</h2>
      <form className="space-y-4" onSubmit={handleAddCost}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Agregar Costo</button>
        </div>
      </form>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Lista de Costos</h3>
        <ul>
          {costs.map((cost, index) => (
            <li key={index} className="mb-2">
              {cost.description}: ${cost.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Costos;