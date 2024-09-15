import styled from "styled-components";
import CommentItem from "./CommentItem";
import nocommentImg from "../../../assets/nocomment.svg";
import { getComments } from "../../../api";
import { useEffect, useRef, useState } from "react";
import profileImg from "../../../assets/profile.svg";
import Button from "../../../components/Button";

function Comment({ id }) {
  const idRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      let data;
      try {
        data = await getComments({ id });
        setComments(data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComment();
  }, [id]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCommentId !== null) {
      setComments((prevComments) =>
        prevComments.map((item) =>
          item.id === editingCommentId
            ? { ...item, content: comment, updatedAt: new Date().toISOString() }
            : item
        )
      );
      setEditingCommentId(null);
    } else {
      const newComment = {
        id: idRef.current++,
        content: comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        writer: {
          id: 999,
          nickname: "mungyun",
          image: profileImg,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments]);
    }

    setComment("");
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setComment(content);
  };

  const onDelete = (id) => {
    setComments(comments.filter((item) => item.id !== id));
  };

  return (
    <>
      <QuestionWrapper>
        <Title>문의하기</Title>
        <form onSubmit={handleSubmit}>
          <QuestionBox
            onChange={handleChange}
            value={comment}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <ButtonSection>
            <Button
              color="#f3f4f6"
              width="74"
              type="submit"
              disabled={comment === ""}
            >
              등록
            </Button>
          </ButtonSection>
        </form>
      </QuestionWrapper>
      {comments?.length > 0 ? (
        <CommentList>
          {comments.map((item) => (
            <CommentItemWrapper key={item.id}>
              <CommentItem
                item={item}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            </CommentItemWrapper>
          ))}
        </CommentList>
      ) : (
        <NoCommentSection>
          <img src={nocommentImg} alt="댓글 없음" width="196" height="230" />
        </NoCommentSection>
      )}
    </>
  );
}

export default Comment;

const QuestionWrapper = styled.div`
  margin: 40px 0 58px;
  position: relative;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-top: 0;
  margin-bottom: 9px;
`;

const QuestionBox = styled.textarea`
  width: 100%;
  height: 104px;
  padding: 16px 24px 40px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  line-height: 1.2;
  resize: none;

  ::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    height: 129px;
    padding: 16px 24px 70px;

    ::placeholder {
      font-size: 14px;
      white-space: pre-wrap;
    }
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 16px;

  Button {
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  }
`;

const CommentList = styled.ul`
  padding: 0;
`;

const CommentItemWrapper = styled.li`
  list-style-type: none;
`;

const NoCommentSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0 48px;

  @media (max-width: 1200px) {
    padding: 40px 0 48px;
  }
`;