import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Battery, 
  Zap, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  BarChart3,
  Plus
} from "lucide-react";

const EnergyDashboard = () => {
  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Energy Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor your energy production, consumption, and trading activity in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Energy Overview */}
          <Card className="lg:col-span-2 bg-gradient-glass backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Energy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-1">142.5 kWh</div>
                  <div className="text-sm text-muted-foreground">Generated Today</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="text-2xl font-bold text-secondary mb-1">89.2 kWh</div>
                  <div className="text-sm text-muted-foreground">Consumed Today</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent mb-1">53.3 kWh</div>
                  <div className="text-sm text-muted-foreground">Available to Trade</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Solar Generation</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Battery Storage</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Grid Connection</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="energy" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                List Energy for Sale
              </Button>
              <Button variant="glass" className="w-full justify-start">
                <Battery className="mr-2 h-4 w-4" />
                Add Manual Reading
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Trades */}
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'sold', amount: '25.5 kWh', price: '$12.75', buyer: 'Neighbor A', time: '2 hours ago' },
                  { type: 'bought', amount: '15.0 kWh', price: '$7.50', seller: 'Solar Farm B', time: '5 hours ago' },
                  { type: 'sold', amount: '30.2 kWh', price: '$15.10', buyer: 'Community Grid', time: '1 day ago' },
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      <Badge variant={trade.type === 'sold' ? 'default' : 'secondary'}>
                        {trade.type === 'sold' ? 'Sold' : 'Bought'}
                      </Badge>
                      <div>
                        <div className="font-medium">{trade.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {trade.type === 'sold' ? `to ${trade.buyer}` : `from ${trade.seller}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-primary">{trade.price}</div>
                      <div className="text-sm text-muted-foreground">{trade.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earnings */}
          <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-secondary" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">$847.50</div>
                  <div className="text-sm text-muted-foreground">Total Earnings This Month</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy Sales</span>
                    <span className="font-medium text-primary">$847.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Grid Services</span>
                    <span className="font-medium text-accent">$89.40</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transaction Fees</span>
                    <span className="font-medium text-destructive">-$89.40</span>
                  </div>
                </div>
                
                <Button variant="hero" className="w-full">
                  Withdraw Earnings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnergyDashboard;