import React, { createContext, useState, useContext } from 'react';
import axios from "axios";
const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketDataContext, setTicketData] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]); // Uncomment this line

  const setTicketDataContext = (data) => {
   
    setTicketData((prevTickets) => [...prevTickets, data]);
  };
  axios.defaults.baseURL =
  "http://186.186.18.235:8000/api/";
  return (
    <TicketContext.Provider value={{ ticketDataContext, setTicketDataContext, bookedTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};
