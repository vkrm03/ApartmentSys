import React from "react";
import "../../../public/PaymentStatus.css";

const PaymentStatus = () => {
  const payments = [
    { houseNo: "A-101", owner: "John Doe", status: "Paid", amount: "₹5,000" },
    { houseNo: "B-202", owner: "Alice Smith", status: "Pending", amount: "₹5,000" },
    { houseNo: "C-303", owner: "Bob Johnson", status: "Paid", amount: "₹5,000" },
  ];

  return (
    <div className="payment-status">
      <h2>Payment Status</h2>
      <table>
        <thead>
          <tr>
            <th>House No</th>
            <th>Owner Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.houseNo} className={payment.status === "Pending" ? "pending" : "paid"}>
              <td>{payment.houseNo}</td>
              <td>{payment.owner}</td>
              <td>{payment.status}</td>
              <td>{payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;
