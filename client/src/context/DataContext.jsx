import React, { createContext, useState, useContext } from 'react';
import axios from "axios";
const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketDataContext, setTicketData] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]); // Uncomment this line

  const setTicketDataContext = (data) => {
   
    setTicketData((prevTickets) => [...prevTickets, data]);
  };
<<<<<<< HEAD
  axios.defaults.baseURL =
  "http://192.168.76.98:8000/api/";
=======
  axios.defaults.baseURL ="http://192.168.1.10:8000/api/";

>>>>>>> 0cf60ef4670e5942e60b53684ccd8c389778eedc
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
