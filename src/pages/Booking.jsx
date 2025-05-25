import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CinemaHall from "../components/CinemaHall";
import { saveBooking, getBookedSeats } from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
    const { id } = useParams(); // Отримуємо id фільму через URL
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    // Завантажуємо заброньовані місця при завантаженні сторінки
    useEffect(() => {
        const seats = getBookedSeats(id);
        setBookedSeats(seats);
    }, [id]);

    // Оновлюємо стани введених даних
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Валідація форми
    const validateForm = () => {
        const { name, phone, email } = userData;
        if (!name || !phone || !email) {
            toast.error("Усі поля є обов'язковими.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Невірний формат електронної пошти.");
            return false;
        }
        return true;
    };

    // Підтвердження бронювання
    const handleBooking = () => {
        if (!validateForm()) return;

        // Збереження через BookingService
        saveBooking(id, userData, selectedSeats);
        toast.success("Бронювання успішно збережено!");
        setBookedSeats([...bookedSeats, ...selectedSeats]); // Оновлюємо заброньовані місця
        setSelectedSeats([]); // Очищаємо обрані місця
    };

    return (
        <div>
            <h2>Бронювання для фільму ID: {id}</h2>
            <CinemaHall
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bookedSeats={bookedSeats} // Передаємо заброньовані місця
            />
            <div className="booking-form">
                <h3>Ваші дані:</h3>
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
                <button onClick={handleBooking}>Забронювати</button>
            </div>
        </div>
    );
};

export default Booking;