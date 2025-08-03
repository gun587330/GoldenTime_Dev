/**
 * Login.jsx
 * 구글 간편로그인 페이지 컴포넌트
 */
import React from "react";
import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setCurrentPage } = useStore();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Google OAuth 토큰을 서버로 전송하여 사용자 정보를 받아옴
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setCurrentPage('address');
        navigate('/address');
      } else {
        console.error('Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>동작마을방범대</Logo>
        <Subtitle>안전한 동네 정보를 확인하세요</Subtitle>
        
        <GoogleLoginWrapper>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </GoogleLoginWrapper>
      </LoginCard>
    </LoginContainer>
  );
};

// ===== Styled Components =====

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  font-family: Pretendard, sans-serif;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  font-family: Pretendard, sans-serif;
`;

const GoogleLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Login;