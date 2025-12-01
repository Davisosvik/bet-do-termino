import "./db.js";
import Bet from "./models/Bet.js";

const run = async () => {
  const bet = await Bet.create({
    title: "Quem termina primeiro? Alef ou Larissa?",
    description: "Aposta sobre quem vai terminar o relacionamento.",
    options: [
      { id: "a", label: "Alef termina", odds: 1.50, pooledAmount: 0 },
      { id: "b", label: "Larissa termina", odds: 1.80, pooledAmount: 0 },
      { id: "c", label: "Terminam juntos", odds: 2.20, pooledAmount: 0 }
    ],
    endsAt: new Date(Date.now() + 86400000),
    status: "open",
  });

  console.log("Aposta criada:", bet);
  process.exit(0);
};

run();
