import React, { useState } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";
import CinemaHall from "../components/CinemaHall";

const Booking = () => {
    const { id } = useParams(); // Отримуємо id фільму з URL
    const movie = movies.find((m) => m.id === parseInt(id)); // Знаходимо потрібний фільм
    const [selectedSeats, setSelectedSeats] = useState([]); // Стан для вибраних місць

    return (
        <div>
            <h2>Booking for {movie.title}</h2>
            <CinemaHall
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
            />
        </div>
    );
};

export default Booking;