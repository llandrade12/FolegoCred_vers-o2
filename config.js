/* =========================================================
   FÔLEGO CRED — CONFIGURAÇÕES DO SITE
   Edite SOMENTE este arquivo para trocar contatos, CNPJ,
   links e chaves. Tudo que estiver vazio ("") aparece no
   site como "Em breve".
   ========================================================= */
window.FOLEGO = {
  empresa: {
    nome: "Fôlego Cred",
    razaoSocial: "",                 // ex.: "Fôlego Cred Ltda." (preencher)
    cnpj: "00.000.000/0000-00",      // PROVISÓRIO — trocar pelo CNPJ real
    dominio: "https://www.folegocred.com.br" // trocar quando comprar o domínio
  },

  contatos: {
    whatsapp: "",   // só números, com DDI e DDD. ex.: "5571999999999"
    instagram: "folegocred",  // sem @. ex.: "folegocred"
    email: "",       // ex.: "contato@folegocred.com.br"
    youtube: "https://www.youtube.com/@F%C3%B4legoCred",
    tiktok: "https://www.tiktok.com/@folegocred",
    kwai: "https://k.kwai.com/u/@FolegoCred/LxWCwkY5"
  },

  // Horário de atendimento (aparece no rodapé e na página de canais oficiais)
  horario: "Seg. a sex., 9h às 17h30 · Sáb., 9h às 16h30",

  // Link do site de sorteios (deixe "" enquanto não estiver pronto)
  sorteioUrl: "",

  // Supabase — pré-cadastro e representantes.
  // Crie as tabelas com o arquivo supabase.sql
  supabase: {
    url: "",       // ex.: "https://xxxx.supabase.co"
    anonKey: ""    // chave "anon public" do projeto
  },

  // Medição (deixe "" para desativar)
  googleAnalyticsId: "", // ex.: "G-XXXXXXXXXX"
  metaPixelId: ""        // ex.: "123456789012345"
};
