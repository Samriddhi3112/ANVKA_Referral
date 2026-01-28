import TransactionItem from "./TransactionItem";
import filter from "../../../assets/images/filter.svg";

const TransactionList = ({ title, type }) => {
  return (
    <div className="lastTransactions">
      <div className="header">
        <h4>{title}</h4>
        <button className="filterBtn">
          <img src={filter} alt="" /> Filter
        </button>
      </div>

      <ul>
        {[1, 2, 3, 4].map((_, i) => (
          <TransactionItem key={i} type={type} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
