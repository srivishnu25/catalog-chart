import { DashboardTabs } from "./ui/DashboardTabs";
import PriceCard from "./ui/PriceCard";

function App() {
  return (
    <div>
      <section className="px-10 py-10">
        <PriceCard currentPrice={63179.71} prevPrice={60000.4} />
      </section>
      <DashboardTabs />
    </div>
  );
}

export default App;
