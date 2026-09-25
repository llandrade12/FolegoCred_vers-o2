# Site Fôlego Cred — como publicar e editar

## 1. Publicar no Netlify
Arraste a pasta inteira (ou o ZIP) em app.netlify.com > "Add new site" > "Deploy manually".

## 2. Preencher as informações (arquivo config.js)
Tudo que muda fica em um só lugar:
- CNPJ e razão social (hoje o CNPJ é provisório: 00.000.000/0000-00)
- WhatsApp, Instagram e e-mail (vazios aparecem como "Em breve")
- Link do site de sorteios
- Chaves do Supabase
- Google Analytics e Pixel da Meta

Enquanto o WhatsApp estiver vazio, os botões "Pedir meu crédito" levam ao pré-cadastro.

## 3. Ligar os formulários ao Supabase
1. No Supabase: SQL Editor > New query > cole o arquivo supabase.sql > Run.
2. Em Project Settings > API, copie a "Project URL" e a chave "anon public".
3. Cole as duas em config.js.
Os cadastros aparecem em Table Editor > pre_cadastros e representantes.
A chave pública só permite enviar cadastros, não ler.

## 4. Domínio próprio
Depois de comprar o domínio (ex.: folegocred.com.br no Registro.br):
- Netlify > Domain management > Add domain.
- Se o domínio for diferente de www.folegocred.com.br, troque o endereço
  em config.js, robots.txt, sitemap.xml e nas tags do <head> de cada página
  (busque por "folegocred.com.br").

## 5. Antes de divulgar
- Revisar Política de Privacidade e Termos de Uso com advogado
  (os campos "______" precisam ser preenchidos).
- Enviar o sitemap no Google Search Console.
- Criar o Google Meu Negócio e o perfil no Reclame Aqui.
- Registrar a marca no INPI.

## Arquivos
- index.html: página principal (abertura, como funciona, requisitos, regras, dúvidas, pré-cadastro, depoimentos e sorteio reservados)
- seja-representante.html, canais-oficiais.html
- politica-de-privacidade.html, termos-de-uso.html, 404.html
- styles.css (visual), script.js (funcionamento), config.js (suas informações)
- _headers (segurança no Netlify), robots.txt e sitemap.xml (Google)

## Vídeos da abertura
O site mostra um vídeo diferente em cada tela e só baixa o da tela em uso.
- Computador: assets/banner-pc.mp4, banner-pc.webm e banner-pc-poster.webp
- Celular: assets/celular.mp4, celular.webm e celular-poster.webp
Os vídeos tocam sem som e em repetição. Para trocar, substitua os arquivos
mantendo os mesmos nomes.


## 6. O que mudou nesta versão do visual
- Todas as páginas usam o mesmo `styles.css`. Trocar uma cor lá muda o site inteiro
  (as cores ficam no bloco `:root`, no topo do arquivo).
- O leão virou `assets/leao.webp`, recortado do banner. Ele aparece no topo das
  páginas internas, na chamada final da home e na página 404. No celular ele vira
  uma faixa embaixo do título, para não atrapalhar a leitura.
- A home tem o pedido em 3 etapas dentro do hero, com barra de progresso.
  A barra mostra a etapa real: são 3 etapas e nada além delas.
- No celular existe uma barra fixa embaixo com o botão "Pedir meu crédito".

## 7. PREENCHER ANTES DE PUBLICAR (obrigatório)
Procure por `class="preencher"` no `index.html`. São os campos de custo:
taxa de juros, IOF, valor da diária, prazo, total a pagar e CET.
Eles aparecem na seção "O custo, sem letra miúda" e no rodapé.

Sem esses números o site não pode anunciar crédito: o CDC (arts. 37 e 52) e a
Resolução CMN 3.517 exigem que juros, encargos, total e CET sejam informados de
forma clara e antes da contratação. Google Ads e Meta também reprovam anúncios
de crédito sem essas informações e sem CNPJ ativo.

Também continuam pendentes:
- CNPJ real em `config.js` (hoje: 00.000.000/0000-00) e razão social.
- Se a operação for feita por meio de instituição financeira parceira, o nome e
  o CNPJ dela precisam constar no rodapé.
- Revisão da Política de Privacidade e dos Termos de Uso por advogado.
