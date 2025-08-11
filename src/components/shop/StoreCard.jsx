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
    </CardImageContainer>
  );
};
export default StoreCard;

// ===== Styled Components ===== //

/* 카드 이미지 컨테이너

(메인 이미지를 담는 flex 컨테이너) */
const CardImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* 반응형 웹 수정: 고정 높이 대신 반응형 높이 사용 */
  height: clamp(120px, 35vh, 148px); // 딱히 드라마틱한 변화는 없음
  flex-shrink: 0;
`;

/* 메인 카드 이미지
(248x148 크기의 메인 이미지 영역)
*/
const MainCardImage = styled.img`
  /* 반응형 웹 수정: 고정 크기 대신 반응형 크기 사용 */
//  width: clamp(180px, 60vw, 248px);
  width: 100%;
  height: clamp(120px, 35vh, 148px);
  object-fit: cover;
  flex-shrink: 0;
`;