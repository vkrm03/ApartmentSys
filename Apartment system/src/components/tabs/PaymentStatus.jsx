
// PaymentStatus.jsx
import React, { useState } from "react";
import "../../../public/PaymentStatus.css";

const PaymentStatus = () => {
  const [payments, setPayments] = useState([
    { houseNo: "A-101", owner: "John Doe", status: "Pending", amount: "₹5,000" },
    { houseNo: "B-202", owner: "Alice Smith", status: "Pending", amount: "₹5,000" },
    { houseNo: "C-303", owner: "Bob Johnson", status: "Paid", amount: "₹5,000" },
  ]);

  const toggleStatus = (index) => {
    const updatedPayments = [...payments];
    updatedPayments[index].status = updatedPayments[index].status === "Paid" ? "Pending" : "Paid";
    setPayments(updatedPayments);
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.houseNo}>
              <td>{payment.houseNo}</td>
              <td>{payment.owner}</td>
              <td>{payment.status}</td>
              <td>{payment.amount}</td>
              <td>
                <input
                  type="checkbox"
                  checked={payment.status === "Paid"}
                  onChange={() => toggleStatus(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStatus;

