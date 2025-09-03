import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EnergyDashboard from "@/components/EnergyDashboard";
import EnergyMarketplace from "@/components/EnergyMarketplace";
import RealTimeMarket from "@/components/RealTimeMarket";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <EnergyDashboard />
        <EnergyMarketplace />
        <RealTimeMarket />
      </main>
    </div>
  );
};

export default Index;
