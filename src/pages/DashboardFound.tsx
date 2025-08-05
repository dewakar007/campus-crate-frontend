import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ItemCard, ItemData } from "@/components/items/ItemCard";
import { SearchFilter, FilterOptions } from "@/components/forms/SearchFilter";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardFound() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    setLoading(true);
    try {
      // call GET /api/items?type=found here
      
      // Mock data for demonstration
      const mockItems: ItemData[] = [
        {
          id: "f1",
          title: "Red Water Bottle",
          description: "Found this red Hydro Flask water bottle in the gym. Has some stickers on it.",
          category: "Other",
          tags: ["water bottle", "red", "hydro flask"],
          location: "Campus Gym",
          date: "2024-01-11",
          imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
          status: "active",
          type: "found"
        },
        {
          id: "f2",
          title: "Textbook - Calculus III",
          description: "Found this calculus textbook in the math building classroom 205.",
          category: "Books",
          tags: ["textbook", "calculus", "math"],
          location: "Math Building",
          date: "2024-01-10",
          imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
          status: "active",
          type: "found"
        },
        {
          id: "f3",
          title: "Wireless Earbuds",
          description: "Found Apple AirPods in a black case near the dining hall.",
          category: "Electronics",
          tags: ["airpods", "earbuds", "apple"],
          location: "Dining Hall",
          date: "2024-01-09",
          imageUrl: "https://images.unsplash.com/photo-1606400082777-ef05f3c57a5b?w=400",
          status: "returned",
          type: "found"
        }
      ];
      
      setItems(mockItems);
      setFilteredItems(mockItems);
    } catch (error) {
      console.error('Failed to fetch found items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredItems(filtered);
  };

  const handleFilter = (filters: FilterOptions) => {
    let filtered = [...items];

    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(item =>
        filters.tags!.some(tag => item.tags.includes(tag))
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Found Items</h1>
            <p className="text-muted-foreground mt-1">
              Browse items that have been found and help reunite them with their owners
            </p>
          </div>
          
          <Link to="/post-found">
            <Button variant="secondary" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Post Found Item
            </Button>
          </Link>
        </div>

        <SearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          className="mb-8"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-80"></div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No found items yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters, or help the community by posting found items.
            </p>
            <Link to="/post-found">
              <Button variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Post Found Item
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}