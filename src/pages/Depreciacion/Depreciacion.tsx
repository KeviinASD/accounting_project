import React from 'react';
import DepreciacionComponent from '../../components/Depreciacion';

const Depreciacion: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Depreciación</h1>
        <DepreciacionComponent />
      </div>
    </div>
  );
};

export default Depreciacion;
