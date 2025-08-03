/**  
 * 가게 카드의 전체 구조를 담당하는 컴포넌트
 * 할인 배지, 이미지, 텍스트 정보, 좋아요 버튼 통합 
 */
import styled from "styled-components";
import CardText from "./CardText";
import DiscountBadge from "./DiscountBadge";
import LikeButton from "./LikeButton";
import StoreCard from "./StoreCard";

/**
 * Card 컴포넌트
 * @param {Object} store - 가게 정보 객체
 * @param {number} store.id - 가게 ID
 * @param {number} store.discountRate - 할인율
 * @param {boolean} store.isLiked - 좋아요 상태
 */

const Card = ({ store }) => {
  const { id, discountRate, isLiked } = store;

  return (
    <CardContainer>
      <CardHeader>
        <DiscountBadge discountRate={discountRate} />
        <StoreCard store={store} />
      </CardHeader>

      <CardFooter>
        <CardText store={store} />
        <LikeButton storeId={id} isLiked={isLiked} />
      </CardFooter>
    </CardContainer>
  );
};
export default Card;

// ===== Styled Components =====

/**
 * 카드 컨테이너
 * 가게 카드의 전체 레이아웃을 담당합니다.
 * 할인 배지, 이미지, 텍스트, 좋아요 버튼을 포함합니다.
 */
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
//  width: 100%;
  width: 328px;
  height: 216px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #CCC;
  background: #fff;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
`;

const CardHeader = styled.div`
//  margin-bottom: 8px;

`;
const CardFooter = styled.div`
    width: 100%;
    height: 100% - 148px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16.5px 0px 16.5px;
    margin-bttom: 6px;

    // 레이아웃 확인용
    //border: 1px solid blue;
`;