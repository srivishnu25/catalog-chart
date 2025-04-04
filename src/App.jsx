import { DashboardTabs } from "./ui/DashboardTabs";
import PriceCard from "./ui/PriceCard";
import { useState } from "react";
import { useCallback } from "react";

function App() {
  const [lastPoint, setLastPoint] = useState({ last: 0, secondLast: 0 });

  const handleUpdate = useCallback((last, secondLast) => {
    setLastPoint({ last, secondLast });
  }, []);
  return (
    <div>
      <section className="px-10 py-10">
        <PriceCard
          currentPrice={lastPoint.last}
          prevPrice={lastPoint.secondLast}
        />
      </section>
      <DashboardTabs onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
