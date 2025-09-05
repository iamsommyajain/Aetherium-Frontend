import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, Download, FileText, Sheet, Copy, ChevronLeft, ChevronRight } from "lucide-react";

const RealTimeMarket = () => {
  const [selectedInterval, setSelectedInterval] = useState("15-Min-Block");
  const [deliveryDateRange, setDeliveryDateRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  // 🔗 Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiBase}/all`); // backend endpoint
        setMarketData(res.data);
      } catch (err: any) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(marketData.length / recordsPerPage);
  const paginatedData = marketData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const exportData = (format: string) => {
    console.log(`Exporting data in ${format} format`);
  };

  if (loading) return <div className="p-6">⏳ Loading market data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <section id="real-time-market" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-3xl font-bold text-primary">Real Time Market</h2>
            <Info className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground max-w-4xl">
            This data is scraped live from the IEX Day Ahead Market Snapshot.
          </p>
        </div>

        <Card className="bg-gradient-glass backdrop-blur-md border-glass-border">
          <CardContent className="p-6">
            <Tabs defaultValue="market-snapshot" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="market-snapshot">MARKET SNAPSHOT</TabsTrigger>
                <TabsTrigger value="adas-curves">ADAS CURVES</TabsTrigger>
              </TabsList>

              <TabsContent value="market-snapshot" className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>Select Interval</Label>
                    <Select value={selectedInterval} onValueChange={setSelectedInterval}>
                      <SelectTrigger className="bg-glass-bg border-glass-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15-Min-Block">15-Min-Block</SelectItem>
                        <SelectItem value="30-Min-Block">30-Min-Block</SelectItem>
                        <SelectItem value="1-Hour-Block">1-Hour-Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Delivery Date Range</Label>
                    <Input
                      value={deliveryDateRange}
                      onChange={(e) => setDeliveryDateRange(e.target.value)}
                      placeholder="eg. 03/09/2025 - 03/09/2025"
                      className="bg-glass-bg border-glass-border"
                    />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90">Submit</Button>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => exportData("copy")}>
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportData("excel")}>
                    <Sheet className="h-4 w-4" /> Excel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportData("pdf")}>
                    <FileText className="h-4 w-4" /> PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportData("csv")}>
                    <Download className="h-4 w-4" /> CSV
                  </Button>
                </div>

                {/* Data Table */}
                <div className="border border-glass-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary">
                        <TableHead className="text-primary-foreground">Block</TableHead>
                        <TableHead className="text-primary-foreground">Time Range</TableHead>
                        <TableHead className="text-primary-foreground">Purchase Bid</TableHead>
                        <TableHead className="text-primary-foreground">Sell Bid</TableHead>
                        <TableHead className="text-primary-foreground">MCV</TableHead>
                        <TableHead className="text-primary-foreground">Scheduled Volume</TableHead>
                        <TableHead className="text-primary-foreground">MCP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((row, i) => (
                        <TableRow key={i} className="hover:bg-muted/50">
                          <TableCell>{row.block}</TableCell>
                          <TableCell>{row.timeRange}</TableCell>
                          <TableCell>{row.purchaseBid}</TableCell>
                          <TableCell>{row.sellBid}</TableCell>
                          <TableCell>{row.mcv}</TableCell>
                          <TableCell>{row.finalScheduledVolume}</TableCell>
                          <TableCell>{row.mcp ?? "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Showing page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <Button
                        key={idx}
                        variant={currentPage === idx + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="adas-curves" className="text-center py-12">
                <div className="text-muted-foreground">
                  ADAS Curves visualization will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RealTimeMarket;
