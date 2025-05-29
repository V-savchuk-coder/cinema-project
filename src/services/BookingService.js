// services/BookingService.js

const BOOKING_STORAGE_KEY = "cinema_bookings";

export const saveBooking = (movieId, userData, selectedSeats) => {
    const currentBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    currentBookings[movieId] = {
        userData,
        seats: selectedSeats,
    };
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(currentBookings));
};

export const getBookedSeats = (movieId) => {
    const currentBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    return currentBookings[movieId]?.seats || [];
};