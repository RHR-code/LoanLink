import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.TransactionId,
            LoanId: res.data.loanId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      {paymentInfo.transactionId && <Confetti recycle={false} />}

      <h2 className="text-5xl text-secondary">Payment is Successful</h2>
      <h4 className=" text-2xl my-5">
        <strong>Your TransactionId:</strong> {paymentInfo.transactionId}
      </h4>
      <h4 className=" text-2xl">
        <strong>Your LoanId:</strong> {paymentInfo.LoanId}
      </h4>
    </div>
  );
};

export default PaymentSuccess;
