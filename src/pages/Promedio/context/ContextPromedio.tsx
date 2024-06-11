import { createContext, useContext, useEffect, useState } from "react"
import { InventarioRecord, Item, Operation, Saldo } from "../../../types/types";

const defaultValue: ContextPromedioType = {
    items: [],
    addItem: () => {},
    valorTotalCompras: () => 0,
    valorTotalVentas: () => 0,
    currentSaldo: {
      valorUnitario: 0,
      cantidad: 0,
      valorTotal: 0,
    },
    saldos: []
}

const ContextP = createContext<ContextPromedioType>(defaultValue);

export const useContextPromedio = () => {
  const context = useContext(ContextP);
  if (!context) throw new Error("No context");
  return context;
}

function ContextPromedio({children}: {children: React.ReactNode}) {

  const [items, setItems] = useState<Item[]>([]); // <Item[]> es el tipo de dato que se va a guardar en el estado
  const [saldos, setSaldos] = useState<Saldo[]>([]); // <Item[]> es el tipo de dato que se va a guardar en el estado
  const [currentSaldo, setCurrentSaldo] = useState<Saldo>({
    valorUnitario: 0,
    cantidad: 0,
    valorTotal: 0,
  }); // <Item[]> es el tipo de dato que se va a guardar en el estado
  

  function addItem(item: Item){
    
    if (item.operation === Operation.Compra){
      setItems([...items, item]);
      
      let cantidad: number = currentSaldo.cantidad + item.cantidad;
      let valorTotal = currentSaldo.valorTotal + item.cantidad * item.valorUnitario;

      const newSaldo: Saldo = {
        fecha: item.fecha,
        cantidad: cantidad,
        valorUnitario: Number((valorTotal / cantidad).toFixed(2)),
        valorTotal: valorTotal,
      }
      console.log(newSaldo)
      setSaldos([...saldos, newSaldo]);
      setCurrentSaldo(newSaldo);

    } else {

      if (currentSaldo.cantidad < item.cantidad){
        alert("No hay suficiente saldo para realizar la venta");
        return;
      }

      setItems([...items, {
        ...item,
        valorUnitario: currentSaldo.valorUnitario,
      }]);
      
      let cantidad = currentSaldo.cantidad - item.cantidad;
      let valorTotal = cantidad * currentSaldo.valorUnitario;

      const newSaldo: Saldo = {
        fecha: item.fecha,
        cantidad: cantidad,
        valorUnitario: currentSaldo.valorUnitario,
        valorTotal: valorTotal,
      }

      setSaldos([...saldos, newSaldo]);
      setCurrentSaldo(newSaldo);
    }
  }

  function valorTotalCompras(){
    return items.filter(item => item.operation === Operation.Compra).reduce((acc, item) => acc + item.cantidad * item.valorUnitario, 0);
  }

  function valorTotalVentas(){
    return items.filter(item => item.operation === Operation.Venta).reduce((acc, item) => acc + item.cantidad * item.valorUnitario, 0);
  }

  useEffect(() => {
    console.log(currentSaldo)
  }, [currentSaldo])

  return (
    <ContextP.Provider value={
        {
            items,
            addItem,
            valorTotalCompras,
            valorTotalVentas,
            currentSaldo,
            saldos
        }
    }>
      {children}
    </ContextP.Provider>
  )
}

export default ContextPromedio


type ContextPromedioType = {
    items: Item[],
    addItem: (item: Item) => void,
    valorTotalCompras: () => number,
    valorTotalVentas: () => number,
    currentSaldo: Saldo,
    saldos: Saldo[]
}