import React, { createContext, useState, useContext } from 'react';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [ticketDataContext, setTicketData] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([]); // Uncomment this line

  const setTicketDataContext = (data) => {
   
    setTicketData((prevTickets) => [...prevTickets, data]);
  };

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
