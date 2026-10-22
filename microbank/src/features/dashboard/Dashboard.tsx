const transactions = [
  { name: "Monthly salary", date: "Oct 20, 2026", amount: 3200 },
  { name: "Grocery store", date: "Oct 19, 2026", amount: -84.5 },
  { name: "Internet bill", date: "Oct 17, 2026", amount: -55 },
  { name: "Coffee shop", date: "Oct 16, 2026", amount: -12.5 },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

export default function Dashboard() {
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Good morning!</h1>
          <p>Here's what's happening with your account.</p>
        </div>
        <span className="demo-badge">DEMO ACCOUNT</span>
      </div>

      <section className="balance-card">
        <p>Available balance</p>
        <h2>$12,450.00</h2>
        <p className="account-number">Account ending in 4821</p>
      </section>

      <section className="stat-grid">
        <article className="stat-card">
          <span>Income this month</span>
          <h3 className="positive">+$3,200.00</h3>
        </article>
        <article className="stat-card">
          <span>Expenses this month</span>
          <h3>−$840.00</h3>
        </article>
      </section>

      <section className="panel">
        <h2>Recent transactions</h2>
        {transactions.map((transaction) => (
          <div className="transaction-row" key={transaction.name}>
            <div>
              <strong>{transaction.name}</strong>
              <p>{transaction.date}</p>
            </div>
            <strong className={transaction.amount > 0 ? "positive" : ""}>
              {transaction.amount > 0 ? "+" : "−"}
              {money(transaction.amount)}
            </strong>
          </div>
        ))}
      </section>
    </>
  );
}
