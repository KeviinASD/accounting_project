import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Depreciation {
  description: string;
  purchaseValue: number;
  transportCost: number;
  installationCost: number;
  residualValue: number;
  usefulLife: number;
  annualDepreciation: number;
  monthlyDepreciation: number;
}

const DepreciacionTable: React.FC = () => {
  const location = useLocation();
  const [depreciations, setDepreciations] = useState<Depreciation[]>([]);

  useEffect(() => {
    const storedDepreciations = localStorage.getItem('depreciations');
    if (storedDepreciations) {
      setDepreciations(JSON.parse(storedDepreciations));
    }
  }, [location]);

  const handleDeleteDepreciation = (index: number) => {
    const updatedDepreciations = [...depreciations];
    updatedDepreciations.splice(index, 1);
    setDepreciations(updatedDepreciations);
    localStorage.setItem('depreciations', JSON.stringify(updatedDepreciations));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Tabla de Depreciaciones</h1>
        <div className="overflow-x-auto w-full h-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Descripción</th>
                <th className="border px-4 py-2">Valor de Compra</th>
                <th className="border px-4 py-2">Transporte y Adecuación</th>
                <th className="border px-4 py-2">Honorarios por Instalación</th>
                <th className="border px-4 py-2">Valor Residual</th>
                <th className="border px-4 py-2">Vida Útil (años)</th>
                <th className="border px-4 py-2">Depreciación Anual</th>
                <th className="border px-4 py-2">Depreciación Mensual</th>
                <th className="border px-4 py-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {depreciations.map((dep, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{dep.description}</td>
                  <td className="border px-4 py-2">${dep.purchaseValue.toFixed(2)}</td>
                  <td className="border px-4 py-2">${dep.transportCost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${dep.installationCost.toFixed(2)}</td>
                  <td className="border px-4 py-2">${dep.residualValue.toFixed(2)}</td>
                  <td className="border px-4 py-2">{dep.usefulLife}</td>
                  <td className="border px-4 py-2">${dep.annualDepreciation.toFixed(2)}</td>
                  <td className="border px-4 py-2">${dep.monthlyDepreciation.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDeleteDepreciation(index)} className="bg-red-500 text-white py-1 px-2 rounded-md">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/depreciacion" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md">Volver</Link>
      </div>
    </div>
  );
};

export default DepreciacionTable;
