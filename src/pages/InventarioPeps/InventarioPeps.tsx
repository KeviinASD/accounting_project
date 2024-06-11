import React from 'react';
import VistaOperaciones from './VistaOperaciones';

function InventarioPeps() {
  return (

    <div className='mx-auto h-full '>
      <div className='h-1/5 w-full sm:flex sm:justify-between justify:center items-center px-12 py-4'>
        <p className='text-4xl font-semibold font-poppins'>Método PEPS</p>
      </div>
      <VistaOperaciones />
      
    </div>
  );
}

export default InventarioPeps
