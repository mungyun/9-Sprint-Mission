import Container from "@/components/Container";
import axios from "@/lib/api/axios";
import Image from "next/image";
import styles from "./products.module.css";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await axios.get(`/products/${id}`);
    console.log(res);
    const itemData = res.data;
    return {
      props: {
        itemData,
      },
    };
  } catch (error) {
    console.error("페이지 로딩 중 에러 발생!", error);
    return {
      props: {
        itemData: null,
        error: "데이터를 불러오는 중 오류가 발생했습니다.",
      },
    };
  }
}

function ItemDetailPage({ itemData, error }) {
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <div className={styles.detailHeader}>
        <Image
          className={styles.mainImg}
          src={itemData.images[0]}
          alt="상품 이미지"
          width="486"
          height="486"
        />
        <div className={styles.mainContent}>
          <span>{itemData.name}</span>
          <span>{itemData.price}원</span>
          <p>{itemData.description}</p>
        </div>
      </div>
    </Container>
  );
}

export default ItemDetailPage;
