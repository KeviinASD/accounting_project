

interface Props {
    ivan?: string,
    es?: string,
    puto?: string
}

function InventarioPeps({ivan = "por si no pasan nada"}: Props) {
  return (
    <div>
      {ivan}
    </div>
  )
}

export default InventarioPeps
