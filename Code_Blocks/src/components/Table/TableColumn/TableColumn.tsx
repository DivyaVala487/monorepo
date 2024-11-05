import React from 'react';

interface TableColumnProps {
  children: React.ReactNode;      
  colWidth?: string;             
  colTextAlign?: 'left' | 'right' | 'center'; 
  colBackgroundColor?: string;    
  colBorder?: string;             
  colPadding?: string;           
  colFontSize?: string;           
  colFontWeight?: 'normal' | 'bold'; 
  colColor?: string;              
  colVerticalAlign?: 'top' | 'middle' | 'bottom'; 
  colHoverBackgroundColor?: string; 
  colCursor?: string;             
}

const TableColumn: React.FC<TableColumnProps> = ({
  children,
  colWidth = '150px', 
  colTextAlign = 'left', 
  colBackgroundColor = 'transparent', 
  colBorder = '1px solid #ccc', 
  colPadding = '10px', 
  colFontSize = '16px',
  colFontWeight = 'normal',
  colColor = '#000', 
  colVerticalAlign = 'middle', 
  colHoverBackgroundColor = '#f0f0f0', 
  colCursor = 'default', 
}) => {
  return (
    <td
      style={{
        width: colWidth,
        padding: colPadding,
        border: colBorder,
        textAlign: colTextAlign,
        backgroundColor: colBackgroundColor,
        fontSize: colFontSize,
        fontWeight: colFontWeight,
        color: colColor,
        verticalAlign: colVerticalAlign,
        cursor: colCursor,
        transition: 'background-color 0.3s', 
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = colHoverBackgroundColor; 
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = colBackgroundColor; 
      }}
    >
      {children}
    </td>
  );
};

export default TableColumn;
