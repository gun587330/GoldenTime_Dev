/**
 * 메인 페이지 애플리케이션 컴포넌트
 * Layout과 페이지 라우팅
 * Zustand 스토어를 사용하여 전역 상태를 관리
 * 현재 페이지에 따라 컴포넌트 렌더링
 */
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Home from './Home';
import Like from './Like';
import Schedule from './Schedule';
import MyPage from './MyPage';
import SearchAddress from './SearchAddress';
import Login from './Login';
import Layout from '../components/Layout/Layout';
import useStore from '../hooks/store/useStore';
import useUserInfo from '../hooks/user/useUserInfo';

const MainPageApp = () => {
  // Zustand 스토어에서 페이지 관련 상태와 액션 가져오기
  const { currentPage, setCurrentPage } = useStore();
  
  // 사용자 정보에서 인증 상태와 주소 확인
  const { authUser, userAddress } = useUserInfo();

  // 주소가 없으면 주소 검색 페이지로 설정
  useEffect(() => {
    if (!userAddress && currentPage !== "search-address" && currentPage !== "login") {
      setCurrentPage("search-address");
    }
  }, [userAddress, currentPage, setCurrentPage]);

  // 로그인하지 않았으면 로그인 페이지로 설정
  if (!authUser && currentPage !== "login") {
    return (
      <Layout currentPage="login" onPageChange={setCurrentPage}>
        <Login />
      </Layout>
    );
  }

  // 주소가 없으면 주소 검색 페이지 표시
  if (!userAddress && currentPage !== "login") {
    return (
      <Layout currentPage="search-address" onPageChange={setCurrentPage}>
        <SearchAddress />
      </Layout>
    );
  }

  /**
   * 현재 페이지에 따른 컴포넌트 렌더링 함수
   * @returns {JSX.Element} 현재 페이지에 해당하는 컴포넌트
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "login":
        return <Login />;
      case "search-address":
        return <SearchAddress />;
      case "home":
        return <Home />;
      case "favorites":
        return <Like />; // 나중에 Favorites 컴포넌트로 교체
      case "history":
        return <Schedule />; // 나중에 History 컴포넌트로 교체
      case "mypage":
        return <MyPage />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default MainPageApp; 