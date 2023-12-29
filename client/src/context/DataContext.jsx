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
  "http://192.168.1.66:8000/api/";
=======
  "http://192.168.1.78:8000/api/";
>>>>>>> df8c82983640a4b7a5b9def8c03396a56486ebd7
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
