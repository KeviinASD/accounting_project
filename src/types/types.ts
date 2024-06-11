
export enum Operation {
    Compra = "COMPRA",
    Venta = "VENTA",
    SaldoInicial = "SALDO_INICIAL"
}

export type Item = {
    fecha: string,
    operation: Operation,
    cantidad: number,
    valorUnitario: number
}

export type Saldo = {
    fecha?: string,
    cantidad: number,
    valorUnitario: number,
    valorTotal: number
}

export type InventarioRecord = {
    valorTotalCompras: number,
    valorTotalVentas: number,
    saldoInicial: number,
    saldoFinal: number,
} 


export type FilterTable = {
    operation: Operation.Compra | Operation.Venta | "TODO",
}