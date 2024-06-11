import { useState } from "react";
import { useContextPromedio } from "../context/ContextPromedio";
import { Operation, FilterTable } from "../../../types/types";

function Table() {
  const { items, valorTotalCompras, valorTotalVentas } = useContextPromedio();
  const [filter, setFilter] = useState<FilterTable>({ operation: "TODO" });

  return (
    <>
      <section className="mx-4 mt-10 mb-48">
        <div className="space-x-4 my-4">
          <button onClick={() => setFilter({ operation: "TODO" })} className={`${filter.operation === "TODO"? "scale-110 translate-y-1 border text-black border-black": "text-white bg-black"} transition  rounded-md px-4 py-1 duration-300`} >
            Todo
          </button>
          <button onClick={() => setFilter({ operation: Operation.Compra })} className={`${filter.operation === Operation.Compra? "scale-110 translate-y-1 text-black border border-green-500": "bg-green-500 text-white"}  transition rounded-md px-4 py-1 duration-300`}>
            Compra
          </button>
          <button onClick={() => setFilter({ operation: Operation.Venta })} className={`${filter.operation === Operation.Venta? "scale-110 translate-y-1 text-black border border-red-500": "bg-red-500 text-white"} transition rounded-md px-4 py-1 duration-300`}>
            Venta
          </button>
        </div>

        <table className="w-full bg-white border border-gray-300 rounded">
          <thead>
          <tr>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Operation</th>
            <th className="py-2 px-4 border">Cantidad</th>
            <th className="py-2 px-4 border">Valor Unitario</th>
            <th className="py-2 px-4 border">ValorTotal</th>
          </tr>
          </thead>
          <tbody>
          {items
            .filter((item) =>
              filter.operation === "TODO"
                ? true
                : item.operation === filter.operation
            )
            .map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border">{item.fecha}</td>
                <td className={`py-2 px-4 border ${item.operation === Operation.Compra? "text-green-500": "text-red-500"}`}>{item.operation}</td>
                <td className="py-2 px-4 border">{item.cantidad}</td>
                <td className="py-2 px-4 border">{item.valorUnitario}</td>
                <td className="py-2 px-4 border">{(item.cantidad * item.valorUnitario).toFixed(2)}</td>
              </tr>
          ))}

          {
            filter.operation === Operation.Compra && (
              <tr>
                <td colSpan={4} className="py-2 px-4 border font-bold">Total Compras</td>
                <td className="py-2 px-4 border">{valorTotalCompras().toFixed(2)}</td>
              </tr>
            ) 
          }
          {
            filter.operation === Operation.Venta && (
              <tr>
                <td colSpan={4} className="py-2 px-4 border font-bold">Total Ventas</td>
                <td className="py-2 px-4 border">{valorTotalVentas().toFixed(2)}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Table;
