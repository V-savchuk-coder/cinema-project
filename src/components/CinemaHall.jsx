import React, { useState } from "react";
import "./CinemaHall.css";

const CinemaHall = ({ selectedSeats, setSelectedSeats, bookedSeats }) => {
    const rows = 5;
    const cols = 10;
    const totalSeats = rows * cols;

    const handleSeatSelect = (seatId) => {
        if (bookedSeats.includes(seatId)) return; // Заброньовані місця не можна вибрати
        if (selectedSeats.includes(seatId)) {
            // Якщо місце вже вибране, то зняти вибір
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            // Якщо місце не вибране — додати його до вибраних
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };



    return (
        <div className="cinema-hall">
            {Array.from({ length: totalSeats }, (_, index) => {
                const seatId = index + 1;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                    <div
                        key={seatId}
                        className={`seat ${isBooked ? "reserved" : ""} ${
                            isSelected ? "selected" : ""
                        }`}
                        onClick={() => !isBooked && handleSeatSelect(seatId)}
                    >
                        {seatId}
                    </div>
                );
            })}
        </div>
    );
};

export default CinemaHall;