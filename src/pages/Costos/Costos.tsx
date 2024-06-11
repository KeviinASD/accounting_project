import React from 'react';
import CostosComponent from '../../components/Costos';

const Costos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Costos</h1>
        <CostosComponent />
      </div>
    </div>
  );
};

export default Costos;