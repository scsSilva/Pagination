import { useEffect, useState } from "react";
import "./index.css";
import { api } from "./utils/api";
import { usePagination } from "./hooks/usePagination";

interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[] | null>([]);
  const {
    actualPage,
    getItemsPage,
    handleBackPage,
    handleNextPage,
    totalPages,
  } = usePagination(products!, 4);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const { data } = await api.get("https://fakestoreapi.com/products");
      setProducts(data);

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <p className="text-loading">Carregando os dados...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="content">
        <ul>
          {getItemsPage().map((product) => {
            return (
              <li key={product.id} className="product-item">
                <img src={product.image} />

                <div>
                  <p className="product-title">{product.title}</p>
                  <p className="product-price">{product.price}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      <section>
        <button
          type="button"
          onClick={handleBackPage}
          disabled={actualPage === 1}
        >
          Voltar
        </button>
        <p>
          PÁGINA {actualPage} DE {totalPages}
        </p>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={actualPage === totalPages}
        >
          Avançar
        </button>
      </section>
    </div>
  );
}

export default App;
