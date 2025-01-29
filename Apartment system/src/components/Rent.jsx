import React from "react";
import "../../public/Rent.css";

const Rent = () => {
  const qrValue = "https://www.easybillindia.com/wp-content/uploads/2024/02/what-is-Qr-code-_.jpg"; // Replace with your payment URL

  return (
    <div className="rent-container">
      <h1 className="rent-title">Rent Payment</h1>
      <p className="rent-description">Scan the QR code below to pay your rent:</p>
      <div className="qr-code-img">
        <img src="https://www.easybillindia.com/wp-content/uploads/2024/02/what-is-Qr-code-_.jpg" alt="" />
      </div>
      <p className="rent-instructions">
        Use any QR scanner app to scan and proceed with the payment.
      </p>
    </div>
  );
};

export default Rent;
