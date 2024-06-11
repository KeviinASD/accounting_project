import React, { useState } from 'react';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Props {
  addItem: (item: Item) => void;
}

function Compras({ addItem }: Props): JSX.Element {
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Obtener la fecha y la hora actual
    const currentDateTime: string = new Date().toLocaleString();

    addItem({ name: currentDateTime, quantity: parseInt(quantity), price: parseFloat(price) });
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="number"
        placeholder="Precio por c/u"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 m-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 m-2">
        Agregar Artículo
      </button>
    </form>
  );
}

export default Compras;
