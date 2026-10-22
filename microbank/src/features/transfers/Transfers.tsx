import { useState } from "react";

export default function Transfers() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = Number(amount);

    if (!recipient.trim() || !Number.isFinite(value) || value <= 0) {
      setMessage("Enter a recipient and a valid positive amount.");
      return;
    }

    setMessage(
      `Demo transfer of $${value.toFixed(2)} to ${recipient} simulated successfully.`
    );
    setRecipient("");
    setAmount("");
  }

  return (
    <section className="panel form-panel">
      <h1>Transfer money</h1>
      <p>Simulate a transfer using fictional account details.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="recipient">Recipient</label>
        <input
          id="recipient"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          placeholder="e.g. Alex Morgan"
          required
        />

        <label htmlFor="amount">Amount (USD)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="100.00"
          required
        />

        <button className="primary-button" type="submit">
          Simulate transfer
        </button>
      </form>

      {message && <p className="form-message" role="status">{message}</p>}
      <p className="notice">
        Demo only: this does not move money or update your balance.
      </p>
    </section>
  );
}