import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CinemaHall from "../components/CinemaHall";
import { saveBooking, getBookedSeats } from "../services/BookingService";
import { toast } from "react-toastify";
import movies from "../data/movies"; // Загальний список фільмів
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
    const { id } = useParams(); // Отримуємо ID фільму з URL
    const movie = movies.find((m) => m.id === parseInt(id)); // Знаходимо фільм за ID
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]); // Уже заброньовані місця
    const [showForm, setShowForm] = useState(false); // Показувати форму чи ні
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    // При завантаженні сторінки отримуємо список заброньованих місць
    useEffect(() => {
        const seats = getBookedSeats(id);
        setBookedSeats(seats);
    }, [id]);

    // Обчислення доступних місць
    const totalSeats = 50;
    const availableSeats = totalSeats - bookedSeats.length;

    // Управління введенням даних у формі
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Валідація форми
    const validateForm = () => {
        const { name, phone, email } = userData;
        if (!name || !phone || !email) {
            toast.error("Усі поля є обов'язковими!");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Невірний формат електронної пошти!");
            return false;
        }
        return true;
    };

    // Обробка завершення бронювання
    const handleBooking = () => {
        if (!validateForm()) return;

        // Збереження через BookingService
        saveBooking(id, userData, selectedSeats);
        toast.success("Бронювання успішно збережене!");
        setBookedSeats([...bookedSeats, ...selectedSeats]); // Оновлюємо заброньовані місця
        setSelectedSeats([]); // Очищаємо обрані місця
        setShowForm(false); // Повертаємося до вибору місць
    };

    return (
        <div className="booking-container">
            {/* Відображення інформації про фільм */}
            <h2>Бронювання для фільму: {movie.title}</h2>
            <p>Доступно місць: {availableSeats}</p>
            <p>Заброньовано місць: {bookedSeats.length}</p>

            {/* Логіка перемикання між вибором місць і формою */}
            {!showForm ? (
                <>
                    <CinemaHall
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        bookedSeats={bookedSeats}
                    />
                    {selectedSeats.length > 0 && (
                        <button
                            className="booking-button"
                            onClick={() => setShowForm(true)} // Показати форму для бронювання
                        >
                            Забронювати
                        </button>
                    )}
                </>
            ) : (
                <>
                    <div className="booking-form">
                        <h3>Введіть свої дані:</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ім'я"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Телефон"
                            value={userData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Електронна пошта"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleBooking}>Підтвердити бронювання</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Booking;