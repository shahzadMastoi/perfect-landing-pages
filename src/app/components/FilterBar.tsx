type FilterBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
};

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
