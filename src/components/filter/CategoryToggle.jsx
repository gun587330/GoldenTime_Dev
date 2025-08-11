import React from 'react';
import styled from 'styled-components';

const CategoryToggle = ({ label = '업종', active, onClick }) => {
  return (
    <Button type="button" onClick={onClick} $active={active} aria-pressed={!!active}>
      <span>{label}</span>
    </Button>
  );
};

export default CategoryToggle;

const Button = styled.button`
  min-width: clamp(60px, 20vw, 72px);
  width: auto;
  height: clamp(30px, 7vh, 36px);
  border-radius: clamp(12px, 3vw, 16px);
  border: 1px solid ${props => props.$active ? '#DA2538' : '#CCC'};
  background: #fff;
  color: ${props => props.$active ? '#DA2538' : '#000000'};
  font-size: clamp(13px, 4vw, 15px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(4px, 2vw, 8px);
  padding: 0 clamp(8px, 3vw, 12px);
  white-space: nowrap;
  
  &:hover { 
    border: 1px solid #DA2538;
    color: #DA2538;
  }
`;

