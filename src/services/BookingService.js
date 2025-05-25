// services/BookingService.js

const BOOKING_STORAGE_KEY = "cinema_bookings";

// Зберегти бронювання
export const saveBooking = (movieId, userData, selectedSeats) => {
    const currentBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    currentBookings[movieId] = {
        userData,
        seats: selectedSeats,
    };
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(currentBookings));
};

// Отримати заброньовані місця за id фільму
export const getBookedSeats = (movieId) => {
    const currentBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    return currentBookings[movieId]?.seats || [];
};