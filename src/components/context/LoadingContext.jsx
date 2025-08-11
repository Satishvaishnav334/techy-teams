// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
const LoadingContext = createContext();

export const LoadingProvider = ({ children}) => {
    
    const [loading, setLoading] = useState(false)
    
return (
    <LoadingContext.Provider value={{ loading,setLoading }}>
        {children}
    </LoadingContext.Provider>
);
};

export const useLoadingContext = () => useContext(LoadingContext);
