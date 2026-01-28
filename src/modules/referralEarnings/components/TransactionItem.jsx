import cart from "../../../assets/images/cart.svg";

const TransactionItem = ({ type }) => {
  return (
    <li className={type === "credit" ? "green" : "red"}>
      <span>
        <img src={cart} alt="" />
      </span>

      <figcaption>
        <h5>Mohan</h5>
        <p>
          <small>#12225111</small>
          <small>14/06/2025</small>
        </p>
      </figcaption>

      <h6>{type === "credit" ? "+$750.50" : "-$750.50"}</h6>
    </li>
  );
};

export default TransactionItem;
