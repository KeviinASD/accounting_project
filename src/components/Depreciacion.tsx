import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const Depreciacion: React.FC = () => {
  const [description, setDescription] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [installationCost, setInstallationCost] = useState('');
  const [residualValue, setResidualValue] = useState('');
  const [usefulLife, setUsefulLife] = useState('');
  const [depreciations, setDepreciations] = useState<Depreciation[]>(() => {
    const storedDepreciations = localStorage.getItem('depreciations');
    return storedDepreciations ? JSON.parse(storedDepreciations) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('depreciations', JSON.stringify(depreciations));
  }, [depreciations]);

  const handleCalculateDepreciation = (e: React.FormEvent) => {
    e.preventDefault();

    const purchaseValueNum = parseFloat(purchaseValue) || 0;
    const transportCostNum = parseFloat(transportCost) || 0;
    const installationCostNum = parseFloat(installationCost) || 0;
    const residualValueNum = parseFloat(residualValue) || 0;
    const usefulLifeNum = parseFloat(usefulLife) || 0;

    const totalCost = purchaseValueNum + transportCostNum + installationCostNum;
    const annualDepreciation = usefulLifeNum > 0 ? (totalCost - residualValueNum) / usefulLifeNum : 0;
    const monthlyDepreciation = annualDepreciation / 12;

    const newDepreciation: Depreciation = {
      description,
      purchaseValue: purchaseValueNum,
      transportCost: transportCostNum,
      installationCost: installationCostNum,
      residualValue: residualValueNum,
      usefulLife: usefulLifeNum,
      annualDepreciation: parseFloat(annualDepreciation.toFixed(2)),
      monthlyDepreciation: parseFloat(monthlyDepreciation.toFixed(2)),
    };

    setDepreciations([...depreciations, newDepreciation]);

    setDescription('');
    setPurchaseValue('');
    setTransportCost('');
    setInstallationCost('');
    setResidualValue('');
    setUsefulLife('');
  };

  const handleViewTable = () => {
    navigate('/depreciacion-table', { state: depreciations });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-8 pb-8">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">Registro de Depreciación</h2>
        <form className="space-y-4" onSubmit={handleCalculateDepreciation}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción del Activo</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor de compra del Activo</label>
            <input
              type="number"
              value={purchaseValue}
              onChange={(e) => setPurchaseValue(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transporte y adecuación sitio</label>
            <input
              type="number"
              value={transportCost}
              onChange={(e) => setTransportCost(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Honorarios por instalación</label>
            <input
              type="number"
              value={installationCost}
              onChange={(e) => setInstallationCost(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor Residual</label>
            <input
              type="number"
              value={residualValue}
              onChange={(e) => setResidualValue(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vida útil total (años)</label>
            <input
              type="number"
              value={usefulLife}
              onChange={(e) => setUsefulLife(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">Calcular Depreciación</button>
          </div>
        </form>
      </div>
      <div className="flex-1 border-l border-gray-300 pl-8">
        <h2 className="text-xl font-semibold mb-2">Reporte de Datos Ingresados</h2>
        {depreciations.length > 0 ? (
          <div>
            <p><strong>Descripción:</strong> {depreciations[depreciations.length - 1].description}</p>
            <p><strong>Valor de compra del Activo:</strong> ${depreciations[depreciations.length - 1].purchaseValue.toFixed(2)}</p>
            <p><strong>Transporte y adecuación sitio:</strong> ${depreciations[depreciations.length - 1].transportCost.toFixed(2)}</p>
            <p><strong>Honorarios por instalación:</strong> ${depreciations[depreciations.length - 1].installationCost.toFixed(2)}</p>
            <p><strong>Valor Residual:</strong> ${depreciations[depreciations.length - 1].residualValue.toFixed(2)}</p>
            <p><strong>Vida útil total:</strong> {depreciations[depreciations.length - 1].usefulLife} años</p>
            <p><strong>Depreciación anual:</strong> ${depreciations[depreciations.length - 1].annualDepreciation.toFixed(2)}</p>
            <p><strong>Depreciación mensual:</strong> ${depreciations[depreciations.length - 1].monthlyDepreciation.toFixed(2)}</p>
          </div>
        ) : (
          <p>No hay datos ingresados</p>
        )}
        <button onClick={handleViewTable} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md">Ver Tabla de Depreciaciones</button>
      </div>
    </div>
  );
};

export default Depreciacion;
