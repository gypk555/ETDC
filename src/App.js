import React, { useEffect, useState } from "react";
import { parse, differenceInDays, isBefore } from "date-fns";
import './App.css';
import items from './items';

function App() {
  const [expiredItems, setExpiredItems] = useState([]);
  const [expiringSoonItems, setExpiringSoonItems] = useState([]);

  useEffect(() => {
    const today = new Date();
    // Filter items whose due date has already passed
    const expired = items.filter((item) =>
      isBefore(parse(item.Calibration_Due_date, "dd-MM-yyyy", today), today)
    );

    // Filter items expiring within the next 7 days
    const expiringSoon = items.filter((item) => {
      const expiryDate = parse(item.Calibration_Due_date, "dd-MM-yyyy", today);
      const daysLeft = differenceInDays(expiryDate, today);
      // if(daysLeft>=0 && daysLeft<=7){
      //   console.log("exp soon items ", daysLeft, " item no ", item.id);
      // }
      return daysLeft >= 0 && daysLeft <= 7;
    });

    setExpiredItems(expired);
    setExpiringSoonItems(expiringSoon);

    // Generate a single alert message for all expiring soon items
    if (expiringSoon.length > 0) {
      const alertMessage = expiringSoon.map((item) => (
        `⚠️ ${item.Details_of_the_Standard} - Due on: ${item.Calibration_Due_date}`
      )).join("\n");

      alert(`⚠️ Items expiring soon:\n\n${alertMessage}`);
    }
  }, [items]);

  return (
    <div className="App">
      <h3>Manage Items</h3>

      {/* Expired Items Section */}
      <div>
      {expiredItems.length > 0 ? <div>
      <h4>⚠️ Expired Items</h4>
      <div className="items-Display-headings">
          {/* <h4>S.No</h4> */}
          <h4>Eqp id</h4>
          <h4>Details of the Standard</h4>  
          <h4>Model and Make</h4>  
          <h4>Details Of the Traceability</h4>  
          <h4>Calibration  date</h4> 
          <h4>Calibration Due date</h4>
      </div>
      <div className='itemsList'>
        {expiredItems.map((item) => (
          <div key={item.id} className="items-Display expired">
            <h6>{item.id}</h6>
            <h6>{item.Details_of_the_Standard}</h6>
            <p>{item.Model_and_Make}</p>
            <p>{item.Details_Of_the_Traceability}</p>
            <p>{item.Calibration_date}</p>
            <p style={{ color: "red", fontWeight: "bold" }}>
              {/* {format(parseISO(item.Calibration_Due_date), "dd-MM-yyyy")} (Expired) */}
              {item.Calibration_Due_date}
            </p>
          </div>
        ))} 
      </div>
      </div>
      : 
      null
      }
      </div>



      {/* Items Expiring Soon */}
      <div>
      {expiringSoonItems.length > 0 ? <div>
      <h4 className="Expiring_items">⚠️ Items Expiring in 7 Days</h4>
      <div className="items-Display-headings">
          {/* <h4>S.No</h4> */}
          <h4>Eqp id</h4>
          <h4>Details of the Standard</h4>  
          <h4>Model and Make</h4>  
          <h4>Details Of the Traceability</h4>  
          <h4>Calibration  date</h4> 
          <h4>Calibration Due date</h4>
      </div>
      <div className='itemsList'>
        {expiringSoonItems.map((item) => (
          <div key={item.id} className="items-Display warning">
            <h6>{item.id}</h6>
            <h6>{item.Details_of_the_Standard}</h6>
            <p>{item.Model_and_Make}</p>
            <p>{item.Details_Of_the_Traceability}</p>
            <p>{item.Calibration_date}</p>
            <p style={{ color: "orange", fontWeight: "bold" }}>
              {/* {format(parseISO(item.Calibration_Due_date), "dd-MM-yyyy")} */}
              {item.Calibration_Due_date}
            </p>
          </div>
        ))}
      </div>
      </div>
      : 
      null
      }
      </div>

      {/* All Items */}
      <h4>All Items</h4>
      <div className="items-Display-headings">
          {/* <h4>S.No</h4> */}
          <h4>Eqp id</h4>
          <h4>Details of the Standard</h4>  
          <h4>Model and Make</h4>  
          <h4>Details Of the Traceability</h4>  
          <h4>Calibration  date</h4> 
          <h4>Calibration Due date</h4>
      </div>
      <div className='itemsList'>
        {items.length > 0 ? items.map((item) => (
          <div key={item.id} className="items-Display">
            <h6>{item.id}</h6>
            <h6>{item.Details_of_the_Standard}</h6>
            <p>{item.Model_and_Make}</p>
            <p>{item.Details_Of_the_Traceability}</p>
            <p>{item.Calibration_date}</p>
            {/* <p>{format(parseISO(item.Calibration_Due_date), "dd-MM-yyyy")}</p> */}
            <p>{item.Calibration_Due_date}</p>
          </div>
        )) : <p>No items found.</p>}
      </div>
    </div>
  );
}

export default App;