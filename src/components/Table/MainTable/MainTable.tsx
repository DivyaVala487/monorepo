import React, { useState } from 'react';
import TableRow from '../TableRow/TableRow';
import TableColumn from '../TableColumn/TableColumn';
import Pagination from '../Pagination/Pagination';
import "./MainTable.css"

// Ensure T is always an object
interface TableProps<T extends { [key: string]: unknown }> {
  data: Array<T>;                
  headers: string[];       
  itemsPerPage?: number;        
  rowHeight?: string;           
  rowColor?: string;             
  rowHoverColor?: string;       
  rowBorderColor?: string;       
  rowTextAlign?: 'left' | 'right' | 'center'; 
  colWidths?: string[];          
  colAlignments?: ('left' | 'right' | 'center')[]; 
  colHoverBackgroundColors?: string[]; 
  tableWidth?: string;           
  tableBorderCollapse?: boolean; 
  paginationProps?: {           
    totalPagesLabel?: string;
    prevLabel?: string;
    nextLabel?: string;
    showPageNumbers?: boolean;
    disablePrevNextOnBoundaries?: boolean;
  };
  rowPadding?: string;           
  colPadding?: string;           
  colFontSize?: string;         
  colFontWeight?: 'normal' | 'bold'; 
  colBorder?: string;            
}

const Table = <T extends { [key: string]: unknown }>({
  data,
  headers,
  itemsPerPage = 5,        
  rowHeight = '50px',       
  rowColor = 'white',       
  rowHoverColor = 'none',
  rowBorderColor = '#ccc',  
  rowTextAlign = 'left',    
  colWidths = [],          
  colAlignments = [],       
  colHoverBackgroundColors = [], 
  tableWidth = '100vw',      // Set the table width to 100% of the viewport width
  tableBorderCollapse = true, 
  paginationProps = {},    
  rowPadding = '10px',      
  colPadding = '10px',      
  colFontSize = '16px',    
  colFontWeight = 'normal', 
  colBorder = '1px solid #ccc', 
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='main-table' style={{ width: '100vw', overflowX: 'auto' }}> {/* Full screen width with horizontal scrolling */}
      <table
        style={{
          width: tableWidth,  // Make the table span the full screen width
          borderCollapse: tableBorderCollapse ? 'collapse' : 'separate',
          borderSpacing: tableBorderCollapse ? '0' : '8px',
        }}
      >
        <thead>
          <TableRow
            rowHeight={rowHeight}
            rowColor={'#f0f0f0'}
            rowTextAlign={rowTextAlign}
            rowPadding={rowPadding}
            rowBorder={`1px solid ${rowBorderColor}`}
          >
            {headers.map((header, index) => (
              <TableColumn
                key={index}
                colWidth={colWidths[index] || '150px'}
                colTextAlign={colAlignments[index] || 'left'}
                colPadding={colPadding}
                colFontSize={colFontSize}
                colFontWeight={colFontWeight}
                colBorder={colBorder}
              >
                {header}
              </TableColumn>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              rowHeight={rowHeight}
              rowColor={rowColor}
              rowHoverColor={rowHoverColor}
              rowTextAlign={rowTextAlign}
              rowPadding={rowPadding}
              rowBorder={`1px solid ${rowBorderColor}`}
            >
              {Object.values(row).map((cell, colIndex) => (
                <TableColumn
                  key={colIndex}
                  colWidth={colWidths[colIndex] || '150px'}
                  colTextAlign={colAlignments[colIndex] || 'left'}
                  colPadding={colPadding}
                  colFontSize={colFontSize}
                  colFontWeight={colFontWeight}
                  colHoverBackgroundColor={colHoverBackgroundColors[colIndex] || '#f0f0f0'}
                  colBorder={colBorder}
                >
                  {String(cell)} 
                </TableColumn>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        {...paginationProps}
      />
    </div>
  );
};

export default Table;
