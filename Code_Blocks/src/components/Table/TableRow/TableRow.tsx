import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  rowHeight?: string;
  rowColor?: string;
  rowBorder?: string;
  rowTextAlign?: "left" | "right" | "center";
  rowFontSize?: string;
  rowPadding?: string;
  onRowClick?: () => void;
  rowHoverColor?: string;
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  rowHeight = "50px",
  rowColor = "white",
  rowBorder = "1px solid #ccc",
  rowTextAlign = "left",
  rowFontSize = "16px",
  rowPadding = "10px",
  onRowClick,
  rowHoverColor = "#f0f0f0",
}) => {
  return (
    <tr
      style={{
        height: rowHeight,
        backgroundColor: rowColor,
        border: rowBorder,
        textAlign: rowTextAlign,
        fontSize: rowFontSize,
        padding: rowPadding,
        cursor: onRowClick ? "pointer" : "default",
      }}
      onClick={onRowClick}
      onMouseOver={(e) => {
        if (rowHoverColor) {
          e.currentTarget.style.backgroundColor = rowHoverColor;
        }
      }}
      onMouseOut={(e) => {
        if (rowColor) {
          e.currentTarget.style.backgroundColor = rowColor;
        }
      }}
    >
      {children}
    </tr>
  );
};

export default TableRow;
