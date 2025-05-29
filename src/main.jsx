import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        {/* Додавання контейнера для відображення сповіщень */}
        <ToastContainer
            position="top-center" // Сповіщення з'являються зверху по центру
            autoClose={3000} // Сповіщення автоматично зникає через 3 секунди
            hideProgressBar={false} // Показуємо прогрес-бар
            newestOnTop={true} // Нові сповіщення зверху
            closeOnClick // Сповіщення закривається при натисканні
            rtl={false} // Ліва-to-Права орієнтація
            pauseOnFocusLoss // Зупинка таймера при втраті фокуса сторінки
            draggable // Можна перетягувати сповіщення (для користувача)
            pauseOnHover // Таймер зупиняється, коли користувач навів на сповіщення
            theme="dark" // Темна тема для сповіщень
        />
    </StrictMode>
)