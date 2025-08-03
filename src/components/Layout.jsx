// Layout.jsx
import { forwardRef } from "react";
import styled from 'styled-components';
import NavBar from './nav/NavBar';

const Layout = forwardRef(({ children, currentPage = "home", onPageChange }, contentAreaRef) => {
  return (
    <Container>
      <PhoneFrame>
        <ContentArea ref={contentAreaRef} className="content-area">
          {children}
        </ContentArea>
        <NavBar current={currentPage} onSelect={onPageChange} />
      </PhoneFrame>
    </Container>
  );
});

export default Layout;

// 전체 Layout: 모바일 크기에 맞춤 + 중앙 정렬 + 반응형 여백
const Container = styled.div`
  min-height: 100vh;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

// 핸드폰 프레임: 360px x 720px 최대 크기로 제한
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

  @media (max-width: 420px) {
    box-shadow: none;
    height: 100vh;
  }
`;

// 콘텐츠 영역: NavBar 높이만큼 여백을 두고 스크롤 가능
const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 64px; /* 네비게이션 높이만큼 여백 */
  
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
`;