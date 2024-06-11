import OperationForm from "./Components/OperationForm";
import Table from "./Components/Table";
import CurrentSaldoCard from "./Components/CurrentSaldoCard";

function Promedio() {
  return (
    <>
      <CurrentSaldoCard />
      <main className="ml-[210px]">
        <OperationForm />
        <Table />
      </main>
    </>
  );
}

export default Promedio;
