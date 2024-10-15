import React from 'react';

interface PaginationProps {
  totalItems: number;             
  itemsPerPage: number;           
  currentPage: number;            
  onPageChange: (page: number) => void; 
  totalPagesLabel?: string;       
  prevLabel?: string;            
  nextLabel?: string;            
  showPageNumbers?: boolean;      
  buttonStyle?: React.CSSProperties; 
  labelStyle?: React.CSSProperties;  
  containerStyle?: React.CSSProperties;
  disablePrevNextOnBoundaries?: boolean; 
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  totalPagesLabel = "of",             
  prevLabel = "Previous",             
  nextLabel = "Next",                 
  showPageNumbers = true,              
  buttonStyle = {},                   
  labelStyle = {},                    
  containerStyle = {},                
  disablePrevNextOnBoundaries = true, 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', ...containerStyle }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disablePrevNextOnBoundaries && currentPage === 1}
        style={{
          padding: '5px 10px',
          marginRight: '10px',
          ...buttonStyle,
        }}
      >
        {prevLabel}
      </button>

      {showPageNumbers && (
        <span style={{ margin: '0 10px', ...labelStyle }}>
          Page {currentPage} {totalPagesLabel} {totalPages}
        </span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disablePrevNextOnBoundaries && currentPage === totalPages}
        style={{
          padding: '5px 10px',
          marginLeft: '10px',
          ...buttonStyle,
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Pagination;
