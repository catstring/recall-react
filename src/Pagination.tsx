import { useState } from "react";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

export default function PaginationApp() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter((_, i) => {
    if (filter === "odd") return (i + 1) % 2 !== 0;
    if (filter === "even") return (i + 1) % 2 === 0;
    return true;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1>Pagination App</h1>

      <div>
        <label>Items per page:</label>
        <input
          type="number"
          value={itemsPerPage}
          min="1"
          max="50"
          onChange={(e) => {
            const value = Math.max(1, Math.min(50, Number(e.target.value)));
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div>
        <label>Filter:</label>
        <select value={filter} onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="all">All</option>
          <option value="odd">Odd</option>
          <option value="even">Even</option>
        </select>
      </div>

      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
