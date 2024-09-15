import styled from "styled-components";
import ProductListItem from "./ProductListItem";
import { useNavigate } from "react-router-dom";

function ProductList({ products }) {
  const nav = useNavigate();

  return (
    <div>
      <ProductsList>
        {products.map((product) => (
          <li key={product.id} onClick={() => nav(`items/${product.id}`)}>
            <ProductListItem product={product} />
          </li>
        ))}
      </ProductsList>
    </div>
  );
}

export default ProductList;

const ProductsList = styled.ul`
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #1f2937;
  gap: 24px;
  grid-template-columns: repeat(5, 1fr);

  li {
    width: 221px;
    cursor: pointer;
  }

  li:nth-child(n + 11) {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    li:nth-child(n + 7) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    li:nth-child(n + 5) {
      display: none;
    }

    li {
      width: 168px;
    }

    li img {
      width: 168px;
      height: 168px;
    }
  }
`;