import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Leaf, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-energy-grid.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_74px),linear-gradient(transparent_24px,rgba(255,255,255,0.05)_25px,rgba(255,255,255,0.05)_26px,transparent_27px,transparent_74px)] bg-[75px_75px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Main heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Aetherium
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            Decentralized Energy Marketplace
          </p>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Transform from energy consumer to prosumer. Trade renewable energy directly 
            and build a sustainable future through blockchain-powered peer-to-peer energy trading.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            <Zap className="mr-2 h-5 w-5" />
            Start Trading Energy
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border p-6 hover:shadow-glow-primary transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:shadow-glow-primary transition-all duration-300">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">P2P Trading</h3>
              <p className="text-muted-foreground text-sm">
                Sell excess energy directly to neighbors and earn more
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border p-6 hover:shadow-glow-primary transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center group-hover:shadow-glow-primary transition-all duration-300">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ZK Privacy</h3>
              <p className="text-muted-foreground text-sm">
                Private transactions with zero-knowledge proofs
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border p-6 hover:shadow-glow-secondary transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:shadow-glow-secondary transition-all duration-300">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Grid</h3>
              <p className="text-muted-foreground text-sm">
                Automated trading with smart contracts
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;