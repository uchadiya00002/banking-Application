import "./Profile.css";

const fields = [
  { label: "Customer name", value: "Jordan Davis" },
  { label: "Email", value: "jordan@example.test" },
  { label: "Account type", value: "Everyday Checking (Demo)" },
];

export default function Profile() {
  return (
    <section className="profile-mfe">
      <h1>Your profile</h1>
      <p>Fictional customer information for our POC.</p>

      <div className="profile-mfe__avatar">JD</div>

      {fields.map((field) => (
        <div className="profile-mfe__field" key={field.label}>
          <span>{field.label}</span>
          <strong>{field.value}</strong>
        </div>
      ))}
    </section>
  );
}
