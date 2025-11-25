// src/data/betsData.js
const betsData = {
  mainBets: [
    { id: "m1", label: "Falta de comunicação", odds: 1.9 },
    { id: "m2", label: "Falta de confiança / traição", odds: 1.7 },
    { id: "m3", label: "Diferenças de objetivos de vida", odds: 2.1 },
    { id: "m4", label: "Problemas financeiros", odds: 2.3 },
    { id: "m5", label: "Distância / mudança de cidade", odds: 2.5 }
  ],

  otherBets: [
    {
      category: "Quem termina",
      items: [
        { id: "q1a", label: "Parceiro(a) A", odds: 1.85 },
        { id: "q1b", label: "Parceiro(a) B", odds: 2.2 },
        { id: "q1c", label: "Ambos de forma mútua", odds: 3.5 }
      ]
    },
    {
      category: "Duração do relacionamento",
      items: [
        { id: "q2a", label: "Curto prazo (< 6 meses)", odds: 3.0 },
        { id: "q2b", label: "Médio prazo (6m - 2a)", odds: 2.0 },
        { id: "q2c", label: "Longo prazo (> 2 anos)", odds: 1.6 }
      ]
    },
    {
      category: "Motivo do término",
      items: [
        { id: "q3a", label: "Falta de comunicação", odds: 1.9 },
        { id: "q3b", label: "Falta de confiança / traição", odds: 1.7 },
        { id: "q3c", label: "Diferenças de objetivos de vida", odds: 2.1 },
        { id: "q3d", label: "Problemas financeiros", odds: 2.3 },
        { id: "q3e", label: "Distância / mudança", odds: 2.5 },
        { id: "q3f", label: "Desinteresse / incompatibilidade", odds: 2.2 },
        { id: "q3g", label: "Conflitos frequentes", odds: 2.0 },
        { id: "q3h", label: "Crescimento pessoal", odds: 3.2 },
        { id: "q3i", label: "Término impulsivo", odds: 3.8 }
      ]
    },
    {
      category: "Natureza do término",
      items: [
        { id: "q4a", label: "Amigável", odds: 2.8 },
        { id: "q4b", label: "Conturbado", odds: 1.9 },
        { id: "q4c", label: "Silencioso", odds: 2.4 },
        { id: "q4d", label: "Dramático", odds: 1.6 },
        { id: "q4e", label: "Repentino", odds: 3.0 }
      ]
    },
    {
      category: "Forma de comunicação",
      items: [
        { id: "q5a", label: "Pessoalmente", odds: 2.0 },
        { id: "q5b", label: "Mensagem / WhatsApp", odds: 2.6 },
        { id: "q5c", label: "Ligação", odds: 2.2 },
        { id: "q5d", label: "Redes sociais", odds: 3.4 },
        { id: "q5e", label: "Por terceiros", odds: 4.0 }
      ]
    },
    {
      category: "Intensidade emocional",
      items: [
        { id: "q6a", label: "Alívio", odds: 3.2 },
        { id: "q6b", label: "Tristeza profunda", odds: 1.8 },
        { id: "q6c", label: "Raiva", odds: 2.1 },
        { id: "q6d", label: "Indiferença", odds: 3.6 },
        { id: "q6e", label: "Confusão", odds: 2.7 }
      ]
    },
    {
      category: "Frequência de discussões",
      items: [
        { id: "q7a", label: "Constante", odds: 1.7 },
        { id: "q7b", label: "Esporádica", odds: 2.6 },
        { id: "q7c", label: "Quase inexistente", odds: 4.0 },
        { id: "q7d", label: "Aumento recente", odds: 2.2 }
      ]
    },
    {
      category: "Fatores externos",
      items: [
        { id: "q8a", label: "Interferência de amigos", odds: 2.8 },
        { id: "q8b", label: "Diferenças de carreira", odds: 2.3 },
        { id: "q8c", label: "Problemas financeiros", odds: 2.5 },
        { id: "q8d", label: "Mudança de cidade/país", odds: 3.1 }
      ]
    },
    {
      category: "Possibilidade de reconciliação",
      items: [
        { id: "q9a", label: "Pouca chance", odds: 3.5 },
        { id: "q9b", label: "Média chance", odds: 2.2 },
        { id: "q9c", label: "Alta chance", odds: 1.7 }
      ]
    }
  ],

  couples: [
    { id: "c1", label: "João & Maria" },
    { id: "c2", label: "Ana & Lucas" },
    { id: "c3", label: "Pedro & Sofia" },
    { id: "c4", label: "Bruno & Lara" },
    { id: "c5", label: "Carlos & Júlia" }
  ]
};

export default betsData;
