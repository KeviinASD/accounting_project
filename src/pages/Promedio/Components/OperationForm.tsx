import React, { useState } from "react";
import { Item, Operation } from "../../../types/types";
import { useContextPromedio } from "../context/ContextPromedio";
import { SubmitHandler, useForm } from "react-hook-form";

function OperationForm() {
  const [isCompra, setIsCompra] = useState<boolean>(true); // <boolean> es el tipo de dato que se va a guardar en el estado
  const {addItem} = useContextPromedio();
  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {

    const item: Item = {
      fecha: data.fecha,
      operation: data.operation,
      cantidad: Number(data.cantidad),
      valorUnitario: data.valorUnitario
    }
    addItem(item);
  }

  return (
    <section>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <label className="block mt-2">
        <span className="text-gray-500 font-semibold text-sm">Fecha</span>
        <input type="date" {...register("fecha", {required: "La fecha es requerida"})} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.fecha && <span className="text-red-500 text-sm">{errors.fecha.message}</span>}
      </label>
      <label className="block mt-2">
        <span className="text-gray-500 font-semibold text-sm">Operacion</span>
        <select {...register("operation", {required: "La operación es requerida"})} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setIsCompra(e.target.value === Operation.Compra)}
        >
          <option value={Operation.Compra} >Compra</option>
          <option value={Operation.Venta}>Venta</option>
        </select>
        {errors.operation && <span className="text-red-500 text-sm">{errors.operation.message}</span>}
      </label>

      <label className="block mt-2">
        <span className="text-gray-500 font-semibold text-sm">Cantidad</span>
        <input type="number" {...register("cantidad", isCompra?{required: "La cantidad es requerida", validate: value => value > 0 || "La cantidad debe ser positiva"}:{validate: value => value > 0 || "La cantidad debe ser positiva"})} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        {errors.cantidad && <span className="text-red-500 text-sm">{errors.cantidad.message}</span>}
      </label>

      {
        isCompra && (
          <label className="block mt-2">
            <span className="text-gray-500 font-semibold text-sm">Valor Unitario</span>
            <input type="number" {...register("valorUnitario", {required: "El valor unitario es requerido", validate: value => value > 0 || "La cantidad debe ser positiva"})} className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            {errors.valorUnitario && <span className="text-red-500 text-sm">{errors.valorUnitario.message}</span>}
          </label>
        )
      }

      <button className="mx-auto w-auto block mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Agregar Operacion</button>
      
    </form>
    </section>
  );
};

export default OperationForm;

type FormValues = {
  fecha: string,
  operation: Operation,
  cantidad: number,
  valorUnitario: number
}