import "./Dashboard.css";

const transactions = [
  { id: 1, name: "Monthly salary", date: "Oct 20, 2026", amount: 3200 },
  { id: 2, name: "Grocery store", date: "Oct 19, 2026", amount: -84.5 },
  { id: 3, name: "Internet bill", date: "Oct 17, 2026", amount: -55 },
  { id: 4, name: "Coffee shop", date: "Oct 16, 2026", amount: -12.5 },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

export default function Dashboard() {
  return (
    <section className="dashboard-mfe">
      <div className="dashboard-mfe__heading">
        <div>
          <h1>Good morning!</h1>
          <p>Here's what's happening with your account.</p>
        </div>
        <span className="dashboard-mfe__badge">DEMO ACCOUNT</span>
      </div>

      <div className="dashboard-mfe__balance">
        <p>Available balance</p>
        <h2>$12,450.00</h2>
        <span>Account ending in 4821</span>
      </div>

      <div className="dashboard-mfe__stats">
        <article>
          <span>Income this month</span>
          <strong className="dashboard-mfe__positive">+$3,200.00</strong>
        </article>
        <article>
          <span>Expenses this month</span>
          <strong>−$840.00</strong>
        </article>
      </div>

      <div className="dashboard-mfe__panel">
        <h2>Recent transactions</h2>
        {transactions.map((transaction) => (
          <div className="dashboard-mfe__transaction" key={transaction.id}>
            <div>
              <strong>{transaction.name}</strong>
              <p>{transaction.date}</p>
            </div>
            <strong
              className={
                transaction.amount > 0 ? "dashboard-mfe__positive" : ""
              }
            >
              {transaction.amount > 0 ? "+" : "−"}
              {money(transaction.amount)}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
