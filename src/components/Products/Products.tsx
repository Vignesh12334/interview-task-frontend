import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";

interface Product {
  id: number;
  dataCategory: string;
  recordCount: number;
  fields: string;
}

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.dataCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.recordCount?.toString().includes(searchTerm)
  );
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Product Catalog
          </h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search by category, record-count..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Record Count
                </th>
                <th
                  scope="col"
                  className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fields
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200  ">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.dataCategory}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.recordCount}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {product.fields.split(",").map((field, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 rounded-full px-2 sm:px-3 py-1 text-xs font-semibold text-blue-600"
                        >
                          {field.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
