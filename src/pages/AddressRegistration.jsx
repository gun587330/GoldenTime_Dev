/**
 * AddressRegistration.jsx
 * 주소 등록 페이지 컴포넌트
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

const AddressRegistration = () => {
  const navigate = useNavigate();
  const { setCurrentAddress, setCurrentPage } = useStore();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // 카카오 지도 API를 사용하여 주소 변환
            const response = await fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
              {
                headers: {
                  'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`
                }
              }
            );

            if (response.ok) {
              const data = await response.json();
              if (data.documents && data.documents.length > 0) {
                const addressData = data.documents[0];
                const fullAddress = addressData.address.address_name;
                setAddress(fullAddress);
                setCurrentAddress(fullAddress);
              }
            } else {
              console.error('Failed to get address from coordinates');
            }
          } catch (error) {
            console.error('Error getting address:', error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setIsLoading(false);
    }
  };

  // 수동 주소 입력 처리
  const handleAddressSubmit = () => {
    if (address.trim()) {
      setCurrentAddress(address);
      setCurrentPage('home');
      navigate('/');
    }
  };

  // 자동 주소 설정 처리
  const handleAutoAddress = () => {
    if (address.trim()) {
      setCurrentAddress(address);
      setCurrentPage('home');
      navigate('/');
    }
  };

  useEffect(() => {
    // 페이지 로드 시 자동으로 현재 위치 가져오기
    getCurrentLocation();
  }, []);

  return (
    <AddressContainer>
      <AddressCard>
        <Title>주소를 설정해주세요</Title>
        <Subtitle>현재 위치를 기반으로 주소를 자동으로 설정합니다</Subtitle>
        
        <AddressInput
          type="text"
          placeholder="주소를 입력하거나 현재 위치를 사용하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        
        <ButtonGroup>
          <AutoButton onClick={getCurrentLocation} disabled={isLoading}>
            {isLoading ? "위치 확인 중..." : "현재 위치 사용"}
          </AutoButton>
          
          <ManualButton onClick={handleAddressSubmit} disabled={!address.trim()}>
            수동 입력 완료
          </ManualButton>
        </ButtonGroup>
        
        {address && (
          <ConfirmButton onClick={handleAutoAddress}>
            이 주소로 설정하기
          </ConfirmButton>
        )}
      </AddressCard>
    </AddressContainer>
  );
};

// ===== Styled Components =====

const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const AddressCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  font-family: Pretendard, sans-serif;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  font-family: Pretendard, sans-serif;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  font-family: Pretendard, sans-serif;
  
  &:focus {
    outline: none;
    border-color: #DA2538;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const AutoButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #DA2538;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ManualButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #f8f8f8;
  color: #333;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #DA2538;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  
  &:hover {
    background: #b91c2e;
  }
`;

export default AddressRegistration; 