import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import './Calender.css'; // Calendar CSS styles

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  disablePastDates?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  disablePastDates = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start" onClick={() => prevMonth()}>
          <div className="icon">‹</div>
        </div>
        <div className="col col-center">
          <span>
            {format(currentMonth, 'MMMM yyyy')}
          </span>
        </div>
        <div className="col col-end" onClick={() => nextMonth()}>
          <div className="icon">›</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="days row">
        {daysOfWeek.map((day, index) => (
          <div className="col col-center" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        const isDisabled = disablePastDates && day < new Date();
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, currentMonth);

        days.push(
          <div
            className={`col cell ${
              !isCurrentMonth ? 'disabled' : isDisabled ? 'disabled' : ''
            } ${isSelected ? 'selected' : ''}`}
            key={day.toString()}
            onClick={() => !isDisabled && onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    onDateSelect(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
