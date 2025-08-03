/**
 * 애플리케이션의 루트 컴포넌트
 * Layout과 페이지 라우팅
 * Zustand 스토어를 사용하여 전역 상태를 관리
 * 현재 페이지에 따라 컴포넌트 렌더링
 */
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddressRegistration from './pages/AddressRegistration';
import Like from './pages/Like';
import Layout from './components/Layout';
import useStore from './store/useStore';

function App() {
  // Zustand 스토어에서 페이지 관련 상태와 액션 가져오기
  const { currentPage, setCurrentPage } = useStore();

  /**
   * 현재 페이지에 따른 컴포넌트 렌더링 함수
   * @returns {JSX.Element} 현재 페이지에 해당하는 컴포넌트
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "favorites":
        return <Like />; // 나중에 Favorites 컴포넌트로 교체
      case "history":
        return <div>일정 페이지</div>; // 나중에 History 컴포넌트로 교체
      case "mypage":
        return <div>MY 페이지</div>; // 나중에 MyPage 컴포넌트로 교체
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;
