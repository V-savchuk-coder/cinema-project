import React, { useState } from "react";
import "./CinemaHall.css";

const CinemaHall = ({ selectedSeats, setSelectedSeats }) => {
    const rows = 5; // Кількість рядів
    const cols = 10; // Кількість місць у ряді
    const totalSeats = rows * cols; // Загальна кількість місць

    // Генеруємо початковий список місць
    const [seats, setSeats] = useState(
        Array.from({ length: totalSeats }, (_, index) => ({
            id: index + 1, // Унікальний номер для кожного місця
            reserved: false, // Логічне значення для заброньованих місць
        }))
    );

    // Логіка вибору місця
    const handleSeatSelect = (seatId) => {
        const updatedSeats = seats.map((seat) =>
            seat.id === seatId
                ? { ...seat, reserved: !seat.reserved } // Якщо вибрано, змінюємо стан
                : seat
        );
        setSeats(updatedSeats);

        // Оновлюємо список вибраних місць
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="cinema-container">
            <div className="screen">Screen</div> {/* Позначення екрана */}
            <div className="cinema-hall">
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        className={`seat ${seat.reserved ? "reserved" : ""} ${
                            selectedSeats.includes(seat.id) ? "selected" : ""
                        }`}
                        onClick={() => !seat.reserved && handleSeatSelect(seat.id)} // Вибір місця, якщо воно не заброньоване
                    >
                        {seat.id} {/* Номер місця */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaHall;