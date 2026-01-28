import EarningsSummary from "../components/EarningsSummary";
import TransactionList from "../components/TransactionList";

const MyEarnings = () => {
  return (
    <>
      <EarningsSummary />

      <TransactionList
        title="Earnings Summary"
        type="debit"
      />
    </>
  );
};

export default MyEarnings;
