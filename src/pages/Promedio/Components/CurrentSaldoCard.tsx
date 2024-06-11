import React from "react";
import { useContextPromedio } from "../context/ContextPromedio";




function CurrentSaldoCard() {
  const {currentSaldo: {fecha, cantidad, valorTotal, valorUnitario}, saldos} = useContextPromedio();
  return (
    <div className="px-4 py-2 border w-[200px] ml-2 space-y-5 fixed mt-10">
        <h1 className="text-center border-b py-2 font-bold">Saldo Actual</h1>
        <p className="text-gray-600 text-sm">Fecha: {fecha?fecha.toString():"00-00-0000"}</p>
      <div className="flex items-center  space-x-4">
                <div className="p-2 bg-purple-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a2 2 0 00-2-2h-3v4z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15v4a2 2 0 002 2h3v-4" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15h16" />
                    </svg>
                </div>
                <div>
                    <div className="text-gray-600 text-sm">Cantidad Actual</div>
                    <div className="text-gray-900 text-2xl font-semibold">
                        {cantidad}
                        <span className="text-green-500 text-sm font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            
                        </span>
                    </div>
                </div>
        </div>
        <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a2 2 0 00-2-2h-3v4z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15v4a2 2 0 002 2h3v-4" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15h16" />
                    </svg>
                </div>
                <div>
                    <div className="text-gray-600 text-sm">Valor Unitario</div>
                    <div className="text-gray-900 text-2xl font-semibold">
                        {valorUnitario}
                        <span className="text-green-500 text-sm font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            
                        </span>
                    </div>
                </div>
        </div>
        <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a2 2 0 00-2-2h-3v4z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15v4a2 2 0 002 2h3v-4" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 15h16" />
                    </svg>
                </div>
                <div>
                    <div className="text-gray-600 text-sm">Valor Total</div>
                    <div className="text-gray-900 text-2xl font-semibold">
                        {valorTotal.toFixed(2)}
                        <span className="text-green-500 text-sm font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            
                        </span>
                    </div>
                </div>
        </div>
        <h1 className="text-center border-t py-2 font-bold">Dashboard</h1>
        <p>Ir {"->"}</p>
    </div>
  );
}

export default CurrentSaldoCard;
