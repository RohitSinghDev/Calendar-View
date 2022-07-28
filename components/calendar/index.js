import React, { useEffect, useState } from "react";
import "./calendar2.css";
const Calendar = (props) => {
  let width;
  // let style;
  const style = {
    position: "relative",
    margin: "50px auto",
  };
  useEffect(() => {
    width = props.width || "350px";
  }, []);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = () => {
    //gives current year
    return new Date().getFullYear();
  };

  const month = () => {
    // get current month
    const d = new Date();
    return months[d.getMonth()];
  };

  const [reqMonth, setReqMonth] = useState(month());
  // state contains chosen/required month

  const [reqYear, setReqYear] = useState(year());
  // state contains chosen/required year

  const daysInMonth = () => {
    //get number of days in current month
    return new Date(year(), months.indexOf(reqMonth) + 1, 0).getDate();
  };

  const currentDate = () => {
    // return dateContext.get("date");
    const today = new Date();
    return String(today.getDate()).padStart(2, "0");
  };

  const currentDay = () => {
    const d = new Date();
    return d.getDay();
  };

  const firstDayOfMonth = () => {
    const date = new Date();

    const firstDay = new Date(reqYear, months.indexOf(reqMonth), 1);
    return firstDay.getDay();
  };

  // gives all week days names at the top
  let weekDaysTable = weekDaysShort.map((day) => {
    return (
      <td key={day} className="week-day">
        {day}
      </td>
    );
  });

  // gives free spaces to be left at the start of calendar
  let blankDates = [];
  let index2 = 100;
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blankDates.push(
      <td key={i + index2} className="emptySlot">
        {""}
      </td>
    );
  }

  let datesOfMonth = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let checkIn = 0;
    let checkOut = 0;
    let currMonth;
    let currDate;
    if (props.dataMain[reqYear]) {
      // console.log(reqYear);
      if (months.indexOf(reqMonth) + 1 < 10) {
        currMonth = `0${months.indexOf(reqMonth) + 1}`;
      } else {
        currMonth = `${months.indexOf(reqMonth) + 1}`;
      }

      if (d < 10) {
        currDate = `0${d}`;
      } else {
        currDate = `${d}`;
      }
      if (props.dataMain[reqYear][currMonth]) {
        // console.log(reqMonth);
        if (props.dataMain[reqYear][currMonth][currDate]) {
          if (props.dataMain[reqYear][currMonth][currDate].income) {
            checkIn = props.dataMain[reqYear][currMonth][currDate].income;
            // console.log(currMonth, currDate, reqYear, checkIn);
          }
          if (props.dataMain[reqYear][currMonth][currDate].expense) {
            checkOut = props.dataMain[reqYear][currMonth][currDate].expense;
            // console.log(currMonth, currDate, reqYear, checkOut);
          }
        }
      }
    }
    let size1 = 0;
    let size2 = 0;

    if (checkIn != 0 || checkOut != 0) {
      size1 = (checkIn / (checkIn + checkOut)) * 20;
      size2 = (checkOut / (checkOut + checkIn)) * 20;
    }

    const bars = (
      <div className="div3">
        <div className="container1" style={{ width: `${size1}px` }}></div>
        <div className="container2" style={{ width: `${size2}px` }}></div>
      </div>
    );
    let className =
      d == currentDate() && reqMonth == month() && reqYear == year()
        ? "day current-day"
        : "day";
    datesOfMonth.push(
      <td key={d} className={className}>
        {d}
        {bars}
      </td>
    );
  }

  let totalDates = [...blankDates, ...datesOfMonth];
  let totalDatesElements = [];
  let tempDate = [];
  let index = 0;
  for (let i = 0; i < totalDates.length; i++) {
    if (i % 7 !== 0) {
      tempDate.push(totalDates[i]);
    } else {
      totalDatesElements.push(tempDate);
      tempDate = [];
      tempDate.push(totalDates[i]);
    }
  }
  totalDatesElements.push(tempDate);
  totalDatesElements.shift();

  const finalDates = totalDatesElements.map((arr) => {
    index += 1;
    return (
      <tr key={index}>
        {arr.map((j) => {
          return j;
        })}
      </tr>
    );
  });

  const monthOptions = months.map((m) => {
    return (
      <option key={m} value={m}>
        {m}
      </option>
    );
  });

  const yearOptions = [];

  const yearOptionsFunction = () => {
    for (let i = 1990; i < 2051; i++) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return yearOptions;
  };

  const nextMonth = () => {
    let curr = months.indexOf(reqMonth);
    let curr3 = parseInt(reqYear);
    if (curr == 11) {
      setReqMonth(months[0]);
      // console.log(reqYear);
      if (reqYear != 2050) {
        curr3 += 1;
        setReqYear(curr3.toString());
      } else {
        setReqYear(1990);
      }
    } else {
      setReqMonth(months[curr + 1]);
    }
  };

  const prevMonth = () => {
    let curr2 = months.indexOf(reqMonth);
    if (curr2 == 0) {
      setReqMonth(months[11]);
      if (reqYear != 1990) {
        setReqYear((prevYear) => prevYear - 1);
      } else {
        setReqYear(2050);
      }
    } else {
      setReqMonth(months[curr2 - 1]);
    }
  };

  return (
    <>
      <div className="calendar-container" style={style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5">
                <button onClick={prevMonth} className="prevButton">
                  prev
                </button>

                {/* dropdown for selecting month */}

                <select
                  className="label-month"
                  value={reqMonth}
                  onChange={(event) => {
                    setReqMonth(event.target.value);
                  }}
                >
                  {monthOptions}
                </select>
                {/* <input
                  className="label-year"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1900"
                  max="2050"
                  value={reqYear}
                  onChange={(event) => {
                    setReqYear(event.target.value);
                  }}
                ></input> */}
                {/* <p style={{ paddingLeft: "50px" }}>
                  {reqMonth} {reqYear}
                </p> */}
                <select
                  className="label-year"
                  value={reqYear}
                  onChange={(event) => {
                    setReqYear(event.target.value);
                  }}
                >
                  {yearOptionsFunction()}
                </select>
              </td>

              <td colSpan="2" className="nav-month">
                <button onClick={nextMonth} className="nextButton">
                  next
                </button>
              </td>
            </tr>
          </thead>
          <tbody className="calendar-body">
            <tr>{weekDaysTable}</tr>
            {finalDates}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
