import { GetServerSideProps } from "next";
import axios from "@/lib/api/axios";
import { Post } from "@/types/types";
import Container from "@/components/Container";
import ReturnButton from "@/components/ReturnButton";
import DetailHeader from "./components/DetailHeader";
import CommentList from "@/components/CommentList";
import DetailEditer from "./components/DetailEditer";

interface PostDetailPageProps {
  post: Post;
  comments: Post[];
  nextCursor: string | null;
}

export const getServerSideProps: GetServerSideProps<
  PostDetailPageProps
> = async ({ params }) => {
  let post: Post | null = null;
  let comments: Post[] = [];
  let nextCursor: string | null = null;

  try {
    const [res1, res2] = await Promise.all([
      axios.get(`/articles/${params?.id}`),
      axios.get(`/articles/${params?.id}/comments?limit=10`),
    ]);

    post = res1.data ?? null;
    comments = res2.data.list ?? [];
    nextCursor = res2.data.nextCursor ?? null;
  } catch (error) {
    console.error(error);
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      comments,
      nextCursor,
    },
  };
};

const PostDetailPage: React.FC<PostDetailPageProps> = ({
  post,
  comments,
  nextCursor,
}) => {
  return (
    <Container>
      <DetailHeader post={post} />
      <DetailEditer />
      <CommentList comments={comments} nextCursor={nextCursor} />
      <ReturnButton />
    </Container>
  );
};

export default PostDetailPage;
