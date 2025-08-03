import React from "react";
import styled from "styled-components";

const FilterBar = ({ activeFilter, onFilterChange, sortOptions, onSortChange }) => {
  return (
    <FilterRow>
      <FilterTab 
        active={activeFilter === 'time'} 
        onClick={() => onFilterChange('time')}
      >
        시간순
      </FilterTab>
      <FilterTab 
        active={activeFilter === 'category'} 
        onClick={() => onFilterChange('category')}
      >
        업종
      </FilterTab>
      <FilterSelect onChange={(e) => onSortChange(e.target.value)}>
        {sortOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </FilterSelect>
    </FilterRow>
  );
};

const FilterRow = styled.div`
  margin: 16px 12px 6px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterTab = styled.button`
  padding: 5px 18px;
  border-radius: 16px;
  border: 1px solid #DA2538;
  background: ${props => props.active ? "#DA2538" : "#fff"};
  color: ${props => props.active ? "#fff" : "#DA2538"};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? "#DA2538" : "#f8f8f8"};
  }
`;

const FilterSelect = styled.select`
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
`;

export default FilterBar; 