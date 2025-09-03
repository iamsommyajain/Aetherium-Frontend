import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Filter,
  Search,
  Star
} from "lucide-react";

const EnergyMarketplace = () => {
  const energyListings = [
    {
      id: 1,
      seller: "Solar Home #4231",
      amount: "50.5 kWh",
      price: "0.48",
      currency: "ETH",
      location: "2.5 km away",
      rating: 4.8,
      timeLeft: "2h 15m",
      type: "solar",
      verified: true
    },
    {
      id: 2,
      seller: "WindTech Farm",
      amount: "200.0 kWh",
      price: "0.42",
      currency: "ETH",
      location: "5.2 km away",
      rating: 4.9,
      timeLeft: "1h 30m",
      type: "wind",
      verified: true
    },
    {
      id: 3,
      seller: "Micro Grid Co-op",
      amount: "75.8 kWh",
      price: "0.45",
      currency: "ETH",
      location: "1.8 km away",
      rating: 4.7,
      timeLeft: "45m",
      type: "hydro",
      verified: false
    },
    {
      id: 4,
      seller: "Community Solar",
      amount: "120.0 kWh",
      price: "0.50",
      currency: "ETH",
      location: "3.1 km away",
      rating: 4.6,
      timeLeft: "3h 20m",
      type: "solar",
      verified: true
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'solar': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'wind': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'hydro': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Energy Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Buy and sell renewable energy directly with your neighbors through peer-to-peer trading
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by location, seller, or energy type..." 
              className="pl-10 bg-glass-bg border-glass-border"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border text-center p-4">
            <div className="text-2xl font-bold text-primary">156</div>
            <div className="text-sm text-muted-foreground">Active Listings</div>
          </Card>
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border text-center p-4">
            <div className="text-2xl font-bold text-secondary">0.47 ETH</div>
            <div className="text-sm text-muted-foreground">Avg Price/kWh</div>
          </Card>
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border text-center p-4">
            <div className="text-2xl font-bold text-accent">2,340</div>
            <div className="text-sm text-muted-foreground">kWh Available</div>
          </Card>
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border text-center p-4">
            <div className="text-2xl font-bold text-primary">24h</div>
            <div className="text-sm text-muted-foreground">Avg Delivery</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Listings */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Available Energy</h3>
            {energyListings.map((listing) => (
              <Card key={listing.id} className="bg-gradient-glass backdrop-blur-md border-glass-border hover:shadow-glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold">{listing.seller}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {listing.rating}
                          {listing.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getTypeColor(listing.type)} border`}>
                      {listing.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Amount</Label>
                      <div className="font-semibold text-primary">{listing.amount}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Price</Label>
                      <div className="font-semibold">{listing.price} {listing.currency}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Location</Label>
                      <div className="text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Time Left</Label>
                      <div className="text-sm flex items-center gap-1 text-accent">
                        <Clock className="h-3 w-3" />
                        {listing.timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="hero" size="sm" className="flex-1">
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Make Offer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sell Energy Form */}
          <div className="space-y-6">
            <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Sell Your Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount (kWh)</Label>
                  <Input 
                    id="amount" 
                    placeholder="Enter kWh amount" 
                    className="bg-glass-bg border-glass-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price per kWh (ETH)</Label>
                  <Input 
                    id="price" 
                    placeholder="0.50" 
                    className="bg-glass-bg border-glass-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Listing Duration</Label>
                  <Input 
                    id="duration" 
                    placeholder="24 hours" 
                    className="bg-glass-bg border-glass-border"
                  />
                </div>
                
                <div>
                  <Label htmlFor="energy-type">Energy Source</Label>
                  <select className="w-full p-2 rounded-md bg-glass-bg border border-glass-border text-foreground">
                    <option value="solar">Solar</option>
                    <option value="wind">Wind</option>
                    <option value="hydro">Hydro</option>
                    <option value="battery">Battery Storage</option>
                  </select>
                </div>

                <Button variant="energy" className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  List Energy for Sale
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  Platform fee: 2% • Transaction fee: ~$0.50
                </div>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
              <CardHeader>
                <CardTitle className="text-lg">Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Solar Energy</span>
                    <span className="text-sm text-secondary">+5.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wind Energy</span>
                    <span className="text-sm text-secondary">+2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hydro Energy</span>
                    <span className="text-sm text-destructive">-1.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Battery Storage</span>
                    <span className="text-sm text-secondary">+8.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyMarketplace;