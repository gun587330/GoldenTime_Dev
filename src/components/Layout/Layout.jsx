// Layout.jsx
import { forwardRef } from "react";
import styled from 'styled-components';
import NavBar from '../nav/NavBar';

const Layout = forwardRef(({ children, currentPage = "home", onPageChange }, contentAreaRef) => {
  // 로그인/주소 검색 페이지에서는 NavBar 숨김
  const showNavBar = !['login', 'search-address'].includes(currentPage);

  return (
    <Container>
      <PhoneFrame>
        <ContentArea ref={contentAreaRef} className="content-area">
          {children}
        </ContentArea>
        {showNavBar && <NavBar current={currentPage} onSelect={onPageChange} />}
      </PhoneFrame>
    </Container>
  );
});

export default Layout;

// 전체 Layout: 반응형으로 수정
const Container = styled.div`
  min-height: 100vh;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* 데스크톱에서만 패딩 */

  /* 모바일에서는 전체 화면 */
  @media (max-width: 768px) {
    padding: 0;
    background: #fff;
  }
`;

// 핸드폰 프레임: 반응형으로 수정
const PhoneFrame = styled.div`
  width: 100%;
  max-width: 360px;
  height: 720px;
  background: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* 모바일에서는 프레임 제거하고 전체 화면 */
  @media (max-width: 768px) {
    max-width: 100%;
    height: 100vh;
    box-shadow: none;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

// 콘텐츠 영역: 반응형으로 수정
const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; /* 데스크톱에서 NavBar 높이만큼 */

  /* 모바일에서는 safe-area 고려 */
  @media (max-width: 768px) {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }

  /* 반응형 웹 수정: 모바일에서 스크롤 최적화 */
  -webkit-overflow-scrolling: touch;
  
  /* sticky 포지션이 제대로 작동하도록 설정 */
  position: relative;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
  
  /* 반응형 웹 수정: 모바일에서 스크롤바 숨김 */
  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;