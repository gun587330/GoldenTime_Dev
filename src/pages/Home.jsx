/**
 * 메인 페이지(Home) 컴포넌트
 * 주소 표시, 배너, 필터, 가게 목록을 포함함.
 */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import useStore from "../store/useStore";
import Card from "../components/shop/Card";
import bannerImage from "../assets/images/bannerImage.png";

export default function Home() {
  /* 토글 상태 관리 */
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  /* Zustand 스토어에서 필요한 상태와 액션 가져오기 */
  const { 
    currentAddress, 
    currentTime, 
    updateCurrentTime, 
    sortOption, 
    setSortOption, 
    getSortedStores 
  } = useStore();

  /* 컴포넌트 마운트 시 현재 시간을 한 번만 설정(갱신기준: 새로고침) */
  useEffect(() => {
    // 초기 시간 설정 (새로고침 시에만 실행)
    updateCurrentTime();
  }, [updateCurrentTime]);

  /**
   * 정렬 옵션 변경 핸들러
   * @param {string} option - 정렬 옵션
   */
  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  /* 토글 상태 변경 handler 함수 */
  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  // 정렬된 가게 목록 가져오기
  const sortedStores = getSortedStores();

  return (
    <HomeContainer>
      {/* 상단 주소 선택 바 (Layout 내부에서 고정) */}
      <AddressBar>
        <AddressText>
          {/* 제목 6글자까지 표시*/}
          {currentAddress.length > 6 ? `${currentAddress.slice(0, 6)}...` : currentAddress}
          <FiChevronDown size={24} color="#DA2538" />
        </AddressText>
      </AddressBar>

      {/* 프로모션 배너 */}
      <BannerWrapper>
        <BannerImage src={bannerImage} alt="배너 이미지" />
        <BannerSub>꾸미기 딱 좋은 날♥</BannerSub>
        <BannerText>
          우리동네 네일샵<br />
          최대 50% 할인!
        </BannerText>
      </BannerWrapper>

      {/* 필터/정렬 영역 (배너 아래에 위치, 스크롤 시 주소바 바로 아래에 고정) */}
      <FilterRow>
        <TimeFilterTab active>
          <span>{currentTime}</span>
          <FiChevronDown size={16} />
        </TimeFilterTab>
        <FilterTab>업종</FilterTab>
        <SortToggleContainer>
          <SortToggle onClick={handleToggleSort}>
            <span>{sortOption === 'discount' ? '할인율순' : '가격순'}</span>
            <AiFillCaretDown size={16} color="#000" />
          </SortToggle>
          {isSortOpen && (
            <SortDropdown>
              <SortOption onClick={() => handleSortChange('discount')}>
                할인율순
              </SortOption>
              <SortOption onClick={() => handleSortChange('price')}>
                가격순
              </SortOption>
            </SortDropdown>
          )}
        </SortToggleContainer>
      </FilterRow>

      {/* 매장 리스트 */}
      <StoreList>
        {sortedStores.map(store => (
          <Card key={store.id} store={store} />
        ))}
      </StoreList>

    </HomeContainer>
  );
};

// ===== Styled Components ===== //

/* Layout 내부에서 스크롤 가능한 영역(내부 화면) */
const HomeContainer = styled.div`
  background: #fff;
  min-height: 100%;
  padding: 0 16px;
`;

/* 상단 주소 바(Layout 내부에서 상단에 고정되어 스크롤에 영향을 받지 않음) */
const AddressBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 32px 0 0 0;
  gap: 6px;
  justify-content: space-between;
  background: #fff;
  width: 328px;
`;

/* 주소 텍스트 */
const AddressText = styled.div`
  overflow: hidden;
  color: var(--, #000);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 4px;
`;

/* 배너 광고 영역(주소바 아래에 위치) */
const BannerWrapper = styled.div`
  margin: 16px 0;
  border-radius: 10px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  background-color: #000000a9;
`;


/* 배너 이미지 */
const BannerImage = styled.img`
  width: 100%;
  height: 130px;
  opacity: 0.7;
  object-fit: cover;
  display: block;
`;

/* 배너 이미지 위에 Overlay되는 텍스트 */
const BannerText = styled.div`
  // 위치 일단 직관으로 맞춤
  position: absolute;
  left: 0; right: 3px; bottom: 5px;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: normal;
  text-align: right;
`;

/* 배너 서브 텍스트 배너 상단에 표시되는 작은 텍스트(폰트 적용 X) */
const BannerSub = styled.div`
  // 위치 일단 직관으로 맞춤
  position: absolute;
  right: 3px; bottom: 58px;
  color: #FFB1B9;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

`;

/* 필터 라인 영역
(배너 아래에 위치, 스크롤 시 주소바 바로 아래에 Layout 내부에서 고정됨.) */
const FilterRow = styled.div`
  position: sticky;
  top: 58.2px; /* 주소바 높이만큼 아래에 위치 */
  z-index: 15;
  margin: 0px 0px 16px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  transition: all 0.3s ease;
  width: 328px;
`;

/* 시간 필터 탭 버튼
(시간 표시와 드롭다운 아이콘 포함.) */
const TimeFilterTab = styled.button`
  width: 74px;
  height: 30px;
  border-radius: 16px;
  border: 1px solid ${props => props.active ? "#DA2538" : "#CCC"};
  background: #fff;
  color: ${props => props.active ? "#DA2538" : "#666"};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 8px;

  &:hover {
    background: #f8f8f8;
  }
`;

/* 필터 탭 버튼
(시간 표시와 업종 필터를 위한 버튼) */
const FilterTab = styled.button`
  padding: 5px 18px;
  border-radius: 16px;
  border: 1px solid ${props => props.active ? "#DA2538" : "#CCC"};
  background: #fff;
  color: ${props => props.active ? "#DA2538" : "#666"};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }
`;

/* 정렬 토글 컨테이너(토글 버튼 & 드롭다운) */
const SortToggleContainer = styled.div`
  margin-left: auto;
  position: relative;
`;

/* 정렬 토글 버튼(할인율순/가격순 정렬 옵션) */
const SortToggle = styled.button`
  font-size: 14px;
  color: #000;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
`;

/* 정렬 드롭다운 메뉴 */
const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #CCC;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 80px;
`;

/* 정렬 옵션 */
const SortOption = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

/* 매장 리스트 컨테이너(가게 카드들 담는 컨테이너) */
const StoreList = styled.div`
  background: #fff;
`;