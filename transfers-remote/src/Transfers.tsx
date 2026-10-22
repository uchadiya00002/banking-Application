import { useState } from "react";
import "./Transfers.css";

type TransfersProps = {
  onTransferComplete?: (message: string) => void;
};

export default function Transfers({ onTransferComplete }: TransfersProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = Number(amount);

    if (!recipient.trim() || !Number.isFinite(value) || value <= 0) {
      setError("Enter a recipient and a valid positive amount.");
      return;
    }

    const message = `Demo transfer of $${value.toFixed(2)} to ${recipient.trim()} simulated successfully.`;

    setError("");
    setRecipient("");
    setAmount("");

    onTransferComplete?.(message);
  }

  return (
    <section className="transfers-mfe">
      <h1>Transfer money</h1>
      <p>Send money in our fictional banking environment.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="transfer-recipient">Recipient</label>
        <input
          id="transfer-recipient"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          placeholder="e.g. Alex Morgan"
          required
        />

        <label htmlFor="transfer-amount">Amount (USD)</label>
        <input
          id="transfer-amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="100.00"
          required
        />

        {error && (
          <p className="transfers-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Simulate transfer</button>
      </form>

      <p className="transfers-notice">
        Demo only. No real money is moved or account balance changed.
      </p>
    </section>
  );
}
