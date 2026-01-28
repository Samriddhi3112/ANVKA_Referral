import BankDetailsCard from "../components/BankDetailsCard";
import TransactionList from "../components/TransactionList";

const PaymentHistory = () => {
  return (
    <>
      <BankDetailsCard />
      <TransactionList
        title="Last Transaction"
        type="credit"
      />
    </>
  );
};

export default PaymentHistory;
