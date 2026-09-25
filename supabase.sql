-- Fôlego Cred — tabelas do site
-- Cole no Supabase: SQL Editor > New query > Run

create table if not exists public.pre_cadastros (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  nome text not null check (char_length(nome) between 3 and 120),
  telefone text not null check (char_length(telefone) between 10 and 20),
  cidade text not null check (char_length(cidade) <= 80),
  uf text not null check (char_length(uf) = 2),
  veiculo text not null,
  aplicativo text not null,
  ganhos text not null,
  valor_desejado text not null,
  consentimento boolean not null default false,
  origem text,
  status text not null default 'novo'
);

create table if not exists public.representantes (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  nome text not null check (char_length(nome) between 3 and 120),
  telefone text not null check (char_length(telefone) between 10 and 20),
  email text check (char_length(email) <= 120),
  cidade text not null check (char_length(cidade) <= 80),
  uf text not null check (char_length(uf) = 2),
  experiencia text not null,
  mensagem text check (char_length(mensagem) <= 800),
  consentimento boolean not null default false,
  origem text,
  status text not null default 'novo'
);

-- Segurança: o site só consegue INSERIR. Ninguém lê os dados com a chave pública.
alter table public.pre_cadastros enable row level security;
alter table public.representantes enable row level security;

drop policy if exists "site insere pre_cadastros" on public.pre_cadastros;
create policy "site insere pre_cadastros" on public.pre_cadastros
  for insert to anon with check (consentimento = true);

drop policy if exists "site insere representantes" on public.representantes;
create policy "site insere representantes" on public.representantes
  for insert to anon with check (consentimento = true);

-- Para consultar os cadastros, use o painel do Supabase (Table Editor)
-- ou um sistema interno logado com usuário autenticado.
