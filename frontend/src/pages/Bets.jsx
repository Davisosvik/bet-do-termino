import React, { useEffect, useState } from "react";
import { getBets, placeWager, getBet } from "../api/api";
import BetCard from "../components/BetCard";

export default function Bets() {
  const [bets, setBets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await getBets();
    if (res.success) setBets(res.bets);
  }

  function openBet(bet) {
    setSelected(bet);
    setSelectedOption(bet.options?.[0]?.id || "");
    setAmount("");
    setMsg(null);
  }

  async function handleWager() {
    if (!selected || !selectedOption || !amount) { setMsg("Preencha tudo"); return; }
    setLoading(true);
    const res = await placeWager(selected._id, { optionId: selectedOption, amount: Number(amount) });
    if (res.success) {
      setMsg("Aposta registrada!");
      await load();
    } else {
      setMsg(res.message || "Erro");
    }
    setLoading(false);
  }

  return (
    <div className="bets-page">
      <h2>Apostas</h2>

      <div className="bets-grid">
        {bets.map(b => <BetCard key={b._id} bet={b} onOpen={openBet} />)}
      </div>

      {selected && (
        <div className="modal">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>

          <div>
            {selected.options.map(opt => (
              <label key={opt.id} style={{ display:"block", margin:"8px 0" }}>
                <input type="radio" name="opt" value={opt.id}
                  checked={selectedOption === opt.id}
                  onChange={() => setSelectedOption(opt.id)} />
                {" "}{opt.label} — odds {opt.odds}
              </label>
            ))}
          </div>

          <input type="number" placeholder="Quantidade (pts)" value={amount} onChange={(e)=>setAmount(e.target.value)} />
          <div style={{ marginTop:8 }}>
            <button onClick={handleWager} disabled={loading}>{loading ? "Apostando..." : "Confirmar aposta"}</button>
            <button onClick={() => setSelected(null)} style={{ marginLeft:8 }}>Fechar</button>
          </div>

          {msg && <p style={{ marginTop:10 }}>{msg}</p>}
        </div>
      )}
    </div>
  );
}
