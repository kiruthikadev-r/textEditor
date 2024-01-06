import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';

const CommentItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const TextDetails = styled.div`
  flex: 1;
`;

const InitialText = styled.p`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.fontColor};
  font-family: ${(props) => props.fontFamily};
  margin: 0;
`;

const MetaInfo = styled.div`
  text-align: right;
`;

const Time = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Comment = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

const ListItems = (props) => {
  const { textDetails } = props;
  const { id, text, fontColor, fontList, fontFamily, fontSize } = textDetails;

  const onClickLike = () => {
    const { toggleIsLiked } = props;
    toggleIsLiked(id);
  };

  const onDeleteComment = () => {
    const { deleteComment } = props;
    deleteComment(id);
  };

  return (
    <CommentItem>
      <CommentContainer>
        <TextDetails>
          <InitialText fontSize={fontSize} fontColor={fontColor} fontFamily={fontFamily}>
            {text}
          </InitialText>
          <MetaInfo>
         
          </MetaInfo>
        </TextDetails>
       
        <button onClick={onDeleteComment}>Delete</button>
      </CommentContainer>
    </CommentItem>
  );
};

export default ListItems;
