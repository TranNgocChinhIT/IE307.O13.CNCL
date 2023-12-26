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
<<<<<<< HEAD
  "http://192.168.1.9:8000/api/";
=======
  "http://192.168.76.98:8000/api/";
>>>>>>> 45f6e60e84458caef29e4c63718714ebe4e42bb0
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
