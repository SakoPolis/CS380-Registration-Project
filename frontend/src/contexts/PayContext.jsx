// frontend/src/contexts/PayContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const defaultValue = {
    payData: {
        paymentType: "creditCard",
        cardNumber: "",
        cvv: "",
        expirationDate: "",
        cardHolder: "",
    },
    setPayData: () => {},
    addPayData: () => {},
};

const PayContext = createContext(defaultValue);

export const PayProvider = ({ children }) => {
    const [payData, setPayData] = useState(defaultValue.payData);

    const addPayData = (newData) => {
        setPayData((prev) => ({ ...prev, ...newData }));
    };

    const value = useMemo(() => ({ payData, setPayData, addPayData }), [payData]);

    return <PayContext.Provider value={value}>{children}</PayContext.Provider>;
};

export const usePayData = () => useContext(PayContext);
