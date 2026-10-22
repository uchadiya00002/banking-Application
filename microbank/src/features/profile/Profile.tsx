export default function Profile() {
  return (
    <section className="panel form-panel">
      <h1>Your profile</h1>
      <p>Fictional customer information for our POC.</p>

      <div className="profile-avatar">JD</div>

      <div className="profile-field">
        <span>Customer name</span>
        <strong>Jordan Davis</strong>
      </div>
      <div className="profile-field">
        <span>Email</span>
        <strong>jordan@example.test</strong>
      </div>
      <div className="profile-field">
        <span>Account type</span>
        <strong>Everyday Checking (Demo)</strong>
      </div>
    </section>
  );
}