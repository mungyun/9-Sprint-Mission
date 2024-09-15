import Navbar from "../../../components/Navbar";
import ProductDetails from "./ProductDetails";
import Comment from "./Comment";
import ReturnButton from "../../../components/ReturnButton";
import { Container } from "../../../styles/Container";
import styled from "styled-components";

const ItemDetailPage = ({ datas, id }) => {
  return (
    <>
      <Navbar />
      <StyledProductDetails>
        <ProductDetails datas={datas} />
        <Comment id={id} />
        <ReturnButton />
      </StyledProductDetails>
    </>
  );
};

export default ItemDetailPage;

const StyledProductDetails = styled.div`
  ${Container};
  padding: 24px 0 222px;

  @media (max-width: 1200px) {
    padding: 24px 0 243px;
  }

  @media (max-width: 768px) {
    padding: 16px 0 65px;
  }
`;