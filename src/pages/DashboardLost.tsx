import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ItemCard, ItemData } from "@/components/items/ItemCard";
import { SearchFilter, FilterOptions } from "@/components/forms/SearchFilter";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardLost() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    setLoading(true);
    try {
      // call GET /api/items?type=lost here
      
      // Mock data for demonstration
      const mockItems: ItemData[] = [
        {
          id: "1",
          title: "Black iPhone 13",
          description: "Lost my black iPhone 13 near the library. Has a clear case with a university sticker.",
          category: "Electronics",
          tags: ["phone", "iphone", "black"],
          location: "Main Library",
          date: "2024-01-10",
          imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
          status: "active",
          type: "lost"
        },
        {
          id: "2",
          title: "Blue Backpack",
          description: "Lost my blue Jansport backpack in the student center. Contains textbooks and a laptop.",
          category: "Clothing",
          tags: ["backpack", "blue", "jansport"],
          location: "Student Center",
          date: "2024-01-09",
          imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
          status: "active",
          type: "lost"
        },
        {
          id: "3",
          title: "Silver Car Keys",
          description: "Lost my car keys with a Honda keychain near the parking lot.",
          category: "Keys",
          tags: ["keys", "honda", "silver"],
          location: "Parking Lot B",
          date: "2024-01-08",
          status: "claimed",
          type: "lost"
        }
      ];
      
      setItems(mockItems);
      setFilteredItems(mockItems);
    } catch (error) {
      console.error('Failed to fetch lost items:', error);
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
            <h1 className="text-3xl font-bold text-foreground">Lost Items</h1>
            <p className="text-muted-foreground mt-1">
              Browse items that fellow students have lost and help them find their belongings
            </p>
          </div>
          
          <Link to="/post-lost">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Report Lost Item
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
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No lost items found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters, or be the first to report a lost item.
            </p>
            <Link to="/post-lost">
              <Button variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Report Lost Item
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