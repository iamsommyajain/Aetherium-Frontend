import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-glass backdrop-blur-md border-b border-glass-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Aetherium
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="#real-time-market" className="text-foreground/80 hover:text-primary transition-colors">
              Real Time Market
            </a>
            <a href="#dashboard" className="text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
            <Button variant="default" size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Trade Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-glass backdrop-blur-md border-b border-glass-border">
            <div className="flex flex-col p-6 space-y-4">
              <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors">
                Marketplace
              </a>
              <a href="#real-time-market" className="text-foreground/80 hover:text-primary transition-colors">
                Real Time Market
              </a>
              <a href="#dashboard" className="text-foreground/80 hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-glass-border">
                <Button variant="outline" size="sm">
                  Connect Wallet
                </Button>
                <Button variant="default" size="sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Trade Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;