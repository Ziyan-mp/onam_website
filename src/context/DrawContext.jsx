import React, { createContext, useState } from 'react';

export const DrawContext = createContext(null);

export const DrawProvider = ({ children }) => {
  const [activeDraw, setActiveDraw] = useState({
    id: 'ONAM-2026-MAIN',
    title: 'Thiruvonam Grand Bumper 2026',
    totalPrizePool: 50000000, // ₹5 Crore Bumper
    firstPrize: '₹12 Crore Grand Bumper',
    ticketPrice: 500,
    totalTickets: 100000,
    soldTickets: 68420,
    eventDate: '2026-08-28T17:00:00+05:30', // Onam Festival Date 2026
    status: 'ACTIVE',
  });

  const [myTickets, setMyTickets] = useState([]);
  const [selectedTicketCount, setSelectedTicketCount] = useState(1);

  const addTickets = (newTickets) => {
    setMyTickets((prev) => [...prev, ...newTickets]);
  };

  return (
    <DrawContext.Provider
      value={{
        activeDraw,
        setActiveDraw,
        myTickets,
        addTickets,
        selectedTicketCount,
        setSelectedTicketCount,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
};
