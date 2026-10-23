import "./Transactions.css";

const items = [
  { name: "Monthly salary", date: "Oct 20, 2026", amount: "+$3,200.00" },
  { name: "Grocery store", date: "Oct 19, 2026", amount: "−$84.50" },
  { name: "Internet bill", date: "Oct 17, 2026", amount: "−$55.00" },
  { name: "Coffee shop", date: "Oct 16, 2026", amount: "−$12.50" },
];

export default function Transactions() {
  return (
    <section className="transactions-mfe">
      <div className="transactions-mfe__heading">
        <h1>Transactions</h1>
        <p>Your recent account activity.</p>
      </div>

      {items.map((item) => (
        <div className="transactions-mfe__row" key={item.name}>
          <div>
            <strong>{item.name}</strong>
            <p>{item.date}</p>
          </div>
          <strong
            className={
              item.amount.startsWith("+") ? "transactions-mfe__positive" : ""
            }
          >
            {item.amount}
          </strong>
        </div>
      ))}
    </section>
  );
}
