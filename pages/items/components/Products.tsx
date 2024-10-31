import { useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { Product } from "@/types/types";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import axios from "@/lib/axios";
import LoadingSpinner from "@/components/LoadingSpinner";
interface ProductsProps {
  initialProducts: Product[] | null;
  total?: number;
}

const PAGE_SIZE = 10;
const PAGE_LIMIT = 5;
const DEBOUNCE_DELAY = 300;

function Products({ initialProducts, total }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const [order, setOrder] = useState<string>("recent");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    setPage(1);
    setError(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchProducts = async (orderQuery: string, pageQuery: number) => {
    setLoading(true);
    setError(null);
    let res;

    try {
      res = await axios.get(
        `/products?page=${pageQuery}&pageSize=${PAGE_SIZE}&orderBy=${orderQuery}`
      );
      setProducts(Array.isArray(res.data.list) ? res.data.list : []);
    } catch (err) {
      console.error(err);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getProducts = useCallback(() => {
    fetchProducts(order, page);
  }, [order, page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div>
      <div className={styles.header}>
        <h2>전체 상품</h2>
        <div>
          <input
            onChange={handleSearchChange}
            value={search}
            type="text"
            className={styles.headerInput}
            placeholder="검색할 상품을 입력해주세요"
          />
          <Button width="133px" height="42px">
            상품 등록하기
          </Button>
          <select onChange={handleChange} className={styles.headerSelect}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      {loading && <LoadingSpinner />}
      {error && <p className={styles.error}>{error}</p>}
      {!error && (
        <ul className={styles.products}>
          {products.length > 0 ? (
            products.map((item) => (
              <li key={item.id}>
                <ProductItem item={item} size="small" />
              </li>
            ))
          ) : (
            <li>상품이 없습니다.</li>
          )}
        </ul>
      )}
      <Pagination
        page={page}
        total={totalPages}
        pageLimit={PAGE_LIMIT}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Products;
