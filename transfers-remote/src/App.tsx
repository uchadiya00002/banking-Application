import { useState } from "react";
import Transfers from "./Transfers";

// Standalone preview of the exposed module. The host never loads this file.
export default function App() {
  const [notice, setNotice] = useState("");

  return (
    <>
      {notice && <p role="status">{notice}</p>}
      <Transfers onTransferComplete={setNotice} />
    </>
  );
}
