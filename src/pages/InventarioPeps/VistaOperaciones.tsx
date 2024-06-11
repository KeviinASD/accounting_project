import React, { useState } from 'react';
import Ventas from './Ventas';
import Compras from './Compras';
import CustomizedTables from './Tabla';

interface Item {
  quantity: number;
  price: number;
  total: number;
}

interface Sale {
  currentDateTime: string;
  quantity: number;
  totalCost: number;
}

type DataRow = Item | Sale;

function VistaOperaciones(): JSX.Element {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [purchases, setPurchases] = useState<Item[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>('opcion1');
  const [selectedTable, setSelectedTable] = useState<string>('opcion1');

  const inventoryHeaders: string[] = ['Fecha', 'Cantidad', 'Precio', 'Total'];
  const salesHeaders: string[] = ['Fecha', 'Cantidad', 'Costo Total'];

  const addItem = (item: Item): void => {
    const total: number = item.quantity * item.price;
    setInventory([...inventory, { ...item, total }]);
    setPurchases([...purchases, { ...item, total }]);
  };

  const sellItem = (quantity: number): void => {
    let remainingQuantity: number = quantity;
    let newInventory: Item[] = [...inventory];
    let totalCost: number = 0;

    while (remainingQuantity > 0 && newInventory.length > 0) {
      const firstItem: Item = newInventory[0];
      if (firstItem.quantity <= remainingQuantity) {
        totalCost += firstItem.quantity * firstItem.price;
        remainingQuantity -= firstItem.quantity;
        newInventory.shift();
      } else {
        totalCost += remainingQuantity * firstItem.price;
        newInventory[0].quantity -= remainingQuantity;
        newInventory[0].total = newInventory[0].quantity * newInventory[0].price;
        remainingQuantity = 0;
      }
    }

    if (remainingQuantity > 0) {
      alert('No hay suficiente inventario para la venta');
    } else {
      const currentDateTime: string = new Date().toLocaleString();
      setSales([...sales, { currentDateTime, quantity, totalCost }]);
      setInventory(newInventory);
    }
  };

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOperation(event.target.value);
  };

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTable(event.target.value);
  };

  const totalCompras: number = purchases.reduce((acc, item) => acc + item.total, 0);
  const totalInventario: number = inventory.reduce((acc, item) => acc + item.total, 0);
  const totalVentas: number = sales.reduce((acc, item) => acc + item.totalCost, 0);

  return (
    <div className="lg:h-4/5 flex lg:flex-row flex-col items-center gap-20 p-20">
      <div className="lg:w-1/2 w-full h-full flex flex-col gap-4">
        <select
          value={selectedOperation}
          onChange={handleOperationChange}
          className="block border border-gray-300 rounded-lg h-10"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="opcion1">Compras</option>
          <option value="opcion2">Ventas</option>
        </select>
        <div className="h-4/5">
          {selectedOperation === 'opcion1' && <Compras addItem={addItem} />}
          {selectedOperation === 'opcion2' && <Ventas sellItem={sellItem} sales={sales} />}
        </div>
        <div>
          {purchases.length > 0 ? (
            <p>Saldo inicial: {purchases[0].total}</p>
          ) : (
            <p>Saldo inicial: 0</p>
          )}
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex h-full flex flex-col gap-4">
        <select
          value={selectedTable}
          onChange={handleTableChange}
          className="block border border-gray-300 rounded-lg h-8"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="opcion1">Inventario</option>
          <option value="opcion2">Compras</option>
          <option value="opcion3">Ventas</option>
        </select>

        {selectedTable === 'opcion1' && (
          <CustomizedTables headers={inventoryHeaders} data={inventory} total={totalInventario} />
        )}
        {selectedTable === 'opcion2' && (
          <CustomizedTables headers={inventoryHeaders} data={purchases} total={totalCompras} />
        )}
        {selectedTable === 'opcion3' && (
          <CustomizedTables headers={salesHeaders} data={sales} total={totalVentas} />
        )}
      </div>
    </div>
  );
}

export default VistaOperaciones;
