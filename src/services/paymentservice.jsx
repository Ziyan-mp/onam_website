const API = "http://localhost:5000/api/payments";

export const createOrder = async (amount) => {
    const response = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    });

    return await response.json();
};

export const verifyPayment = async (paymentResponse) => {
    const response = await fetch(`${API}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentResponse),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Payment verification failed");
    }

    return data;
};
