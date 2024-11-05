import React, { useState } from 'react';
import './Tabs.css'; 
interface TabProps {
  label: string; 
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[]; 
  activeTabColor?: string; 
  inactiveTabColor?: string; 
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabColor = 'blue',
  inactiveTabColor = 'gray',
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0); 

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTabIndex === index ? 'active' : ''}`}
            style={{
              backgroundColor:
                activeTabIndex === index ? activeTabColor : inactiveTabColor,
            }}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTabIndex].content}</div>
    </div>
  );
};

export default Tabs;
