import React, { useState } from 'react';

interface Sale {
  quantity: number;
  totalCost: number;
}

interface Props {
  sellItem: (quantity: number) => void;
  sales: Sale[];
}

function Ventas({ sellItem, sales }: Props): JSX.Element {
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    sellItem(parseInt(quantity));
    setQuantity('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          placeholder="Cantidad a vender"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 m-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2">
          Vender
        </button>
      </form>
      <ul>
        {sales.map((sale, index) => (
          <li key={index}>
            {sale.quantity} unidades vendidas por un total de ${sale.totalCost}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ventas;
