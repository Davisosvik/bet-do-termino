import { connectDB } from "./src/db.js";
import Bet from "./src/models/Bet.js";

// Lista completa
const categories = [
  {
    title: "Quem Termina",
    options: ["Parceiro(a) A", "Parceiro(a) B", "Ambos de forma mútua"]
  },
  {
    title: "Duração do Relacionamento",
    options: [
      "Curto prazo (< 6 meses)",
      "Médio prazo (6 meses – 2 anos)",
      "Longo prazo (> 2 anos)"
    ]
  },
  {
    title: "Motivo do Término",
    options: [
      "Falta de comunicação",
      "Falta de confiança / traição",
      "Diferenças de objetivos de vida",
      "Problemas financeiros",
      "Distância / mudança de cidade ou país",
      "Desinteresse ou incompatibilidade",
      "Conflitos frequentes / brigas constantes",
      "Crescimento pessoal / mudança de prioridades",
      "Término impulsivo ou temporário"
    ]
  },
  {
    title: "Natureza do Término",
    options: [
      "Amigável / sem ressentimentos",
      "Conturbado / com brigas",
      "Silencioso / sem comunicação",
      "Dramático / com grandes conflitos",
      "Repentino / sem aviso"
    ]
  },
  {
    title: "Forma de Comunicação",
    options: ["Pessoalmente", "Mensagem / WhatsApp", "Ligação telefônica", "Redes sociais", "Por terceiros"]
  },
  {
    title: "Intensidade Emocional",
    options: ["Alívio", "Tristeza profunda", "Raiva", "Indiferença", "Confusão"]
  },
  {
    title: "Frequência de Discussões Antes do Término",
    options: ["Constante", "Esporádica", "Quase inexistente", "Aumento recente de conflitos"]
  },
  {
    title: "Fatores Externos",
    options: [
      "Interferência de amigos ou familiares",
      "Diferenças de vida ou carreira",
      "Problemas de confiança",
      "Situações financeiras",
      "Mudança de cidade ou país"
    ]
  },
  {
    title: "Possibilidade de Reconciliação",
    options: ["Pouca chance", "Média chance", "Alta chance / já houve pausas antes"]
  }
];

function randomOdd() {
  return Number((Math.random() * (3 - 1.2) + 1.2).toFixed(2));
}

async function main() {
  await connectDB();

  console.log("🟦 Criando apostas no banco...");

  await Bet.deleteMany();

  for (const cat of categories) {
    const bet = new Bet({
      title: cat.title,
      description: "Aposta de término 💔",
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      options: cat.options.map((o, idx) => ({
        id: `${cat.title.replace(/\s+/g, "_").toLowerCase()}_${idx}`,
        label: o,
        odds: randomOdd(),
        pooledAmount: 0
      }))
    });

    await bet.save();
    console.log(`✔ Criado: ${cat.title}`);
  }

  console.log("🔥 Todas as apostas foram criadas!");
  process.exit();
}

main();
