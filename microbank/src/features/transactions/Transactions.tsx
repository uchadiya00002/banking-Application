const items = [
  { name: "Monthly salary", date: "Oct 20, 2026", amount: "+$3,200.00" },
  { name: "Grocery store", date: "Oct 19, 2026", amount: "−$84.50" },
  { name: "Internet bill", date: "Oct 17, 2026", amount: "−$55.00" },
  { name: "Coffee shop", date: "Oct 16, 2026", amount: "−$12.50" },
];

export default function Transactions() {
  return (
    <section className="panel">
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>Your recent account activity.</p>
        </div>
      </div>

      {items.map((item) => (
        <div className="transaction-row" key={item.name}>
          <div>
            <strong>{item.name}</strong>
            <p>{item.date}</p>
          </div>
          <strong className={item.amount.startsWith("+") ? "positive" : ""}>
            {item.amount}
          </strong>
        </div>
      ))}
    </section>
  );
}