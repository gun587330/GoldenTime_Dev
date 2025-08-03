/**
 * 가게 사진 정보를 표시하는 컴포넌트
 * 메인 이미지와 썸네일 이미지들을 담당함.
 */
import styled from "styled-components";
import chickenImage from "../../assets/images/cardImage.png";

/**
 * StoreCard 컴포넌트
 * @param {Object} store - 가게 정보 객체 (현재는 사용하지 않음)
 */
const StoreCard = ({ store }) => {
  return (
    <CardImageContainer>
      <MainCardImage src={chickenImage} alt="치킨 메인 이미지" />
      <ThumbnailContainer>
        <CardImage src={chickenImage} alt="치킨 썸네일 1" />
        <CardImage src={chickenImage} alt="치킨 썸네일 2" />
      </ThumbnailContainer>
    </CardImageContainer>
  );
};
export default StoreCard;

// ===== Styled Components ===== //

/* 카드 이미지 컨테이너
(메인 이미지와 썸네일들을 담는 flex 컨테이너) */
const CardImageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 148px;
  flex-shrink: 0;
`;

/* 메인 카드 이미지
(248x148 크기의 메인 이미지 영역)
*/
const MainCardImage = styled.img`
  width: 248px;
  height: 148px;
  object-fit: cover;
  flex-shrink: 0;
`;

/* 카드 이미지
(썸네일용 크기의 이미지) */
const CardImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

/* 썸네일 이미지 컨테이너
(두 개의 썸네일 이미지를 세로로 배치함) */
const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  margin-left: auto;
`;