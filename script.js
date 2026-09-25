(function () {
  "use strict";
  var C = window.FOLEGO || {};
  var ct = C.contatos || {};
  var emp = C.empresa || {};

  function zapLink(msg) {
    if (!ct.whatsapp) return "";
    return "https://wa.me/" + ct.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg || "Olá! Vim pelo site da Fôlego Cred e quero saber mais sobre o crédito.");
  }

  var valores = {
    cnpj: emp.cnpj || "Em breve",
    razao: emp.razaoSocial || emp.nome || "Fôlego Cred",
    whatsapp: ct.whatsapp ? formatarFone(ct.whatsapp) : "Em breve",
    instagram: ct.instagram ? "@" + ct.instagram : "Em breve",
    email: ct.email || "Em breve",
    youtube: ct.youtube ? "YouTube" : "Em breve",
    tiktok: ct.tiktok ? "TikTok" : "Em breve",
    kwai: ct.kwai ? "Kwai" : "Em breve",
    horario: C.horario || "Em breve",
    ano: String(new Date().getFullYear())
  };
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = valores[el.getAttribute("data-cfg")];
    if (v !== undefined) el.textContent = v;
  });

  function formatarFone(n) {
    var d = n.replace(/\D/g, "");
    if (d.length === 13) return "+" + d.slice(0, 2) + " (" + d.slice(2, 4) + ") " + d.slice(4, 9) + "-" + d.slice(9);
    return "+" + d;
  }

  document.querySelectorAll("[data-link]").forEach(function (a) {
    var tipo = a.getAttribute("data-link"), url = "";
    if (tipo === "instagram" && ct.instagram) url = "https://instagram.com/" + ct.instagram;
    if (tipo === "email" && ct.email) url = "mailto:" + ct.email;
    if (tipo === "whatsapp") url = zapLink();
    if (tipo === "youtube" && ct.youtube) url = ct.youtube;
    if (tipo === "tiktok" && ct.tiktok) url = ct.tiktok;
    if (tipo === "kwai" && ct.kwai) url = ct.kwai;
    if (url) { a.href = url; if (tipo !== "email") { a.target = "_blank"; a.rel = "noopener"; } }
    else { a.removeAttribute("href"); }
  });

  document.querySelectorAll("[data-zap]").forEach(function (a) {
    var url = zapLink(a.getAttribute("data-zap"));
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = (document.body.dataset.pagina === "inicio" ? "" : "index.html") + "#pre-cadastro"; }
  });
  var zap = document.querySelector(".zap");
  if (zap && ct.whatsapp) { zap.href = zapLink(); zap.hidden = false; }

  document.querySelectorAll("[data-sorteio]").forEach(function (a) {
    if (C.sorteioUrl) { a.href = C.sorteioUrl; a.removeAttribute("aria-disabled"); a.textContent = "Ver o sorteio"; }
    else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); }
  });

  var telaPc = window.matchMedia("(min-width: 901px)");
  function prepararVideos() {
    document.querySelectorAll("video.video-auto").forEach(function (v) {
      var ativo = (v.dataset.tela === "pc") === telaPc.matches;
      if (!ativo) { if (!v.paused) v.pause(); return; }
      if (!v.dataset.carregado) {
        v.querySelectorAll("source[data-src]").forEach(function (s) { s.src = s.dataset.src; });
        v.dataset.carregado = "1";
        v.preload = "auto";
        v.load();
      }
      tocar(v);
    });
  }
  function tocar(v) {
    v.muted = true; v.defaultMuted = true;
    if (!v.paused) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  function tocarAtivos() {
    document.querySelectorAll("video.video-auto[data-carregado]").forEach(function (v) {
      if ((v.dataset.tela === "pc") === telaPc.matches) tocar(v);
    });
  }
  prepararVideos();
  if (telaPc.addEventListener) telaPc.addEventListener("change", prepararVideos);
  else if (telaPc.addListener) telaPc.addListener(prepararVideos);
  document.querySelectorAll("video.video-auto").forEach(function (v) {
    v.addEventListener("canplay", function () { if ((v.dataset.tela === "pc") === telaPc.matches) tocar(v); });
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) tocarAtivos(); });
  ["touchstart", "click", "scroll"].forEach(function (ev) {
    window.addEventListener(ev, tocarAtivos, { passive: true, once: true });
  });

  var botao = document.querySelector(".menu-botao"), menu = document.getElementById("menu");
  if (botao && menu) {
    botao.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", aberto);
      document.body.classList.toggle("menu-aberto", aberto);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("aberto");
        botao.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-aberto");
      });
    });
  }

  document.querySelectorAll('input[type="tel"]').forEach(function (i) {
    i.addEventListener("input", function () {
      var d = i.value.replace(/\D/g, "").slice(0, 11), s = d;
      if (d.length > 2) s = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) s = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
      i.value = s;
    });
  });

  document.querySelectorAll("form[data-tabela]").forEach(function (form) {
    var retorno = form.querySelector(".retorno");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      retorno.className = "retorno";
      if (form.querySelector(".hp input").value) return; // robô
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var dados = {};
      new FormData(form).forEach(function (v, k) { if (k !== "site") dados[k] = String(v).trim(); });
      dados.consentimento = true;
      dados.origem = location.pathname + location.search;

      var sb = C.supabase || {};
      if (!sb.url || !sb.anonKey) {
        mostrar("erro", "O cadastro pelo site ainda não está disponível. Fale com a gente pelos canais oficiais.");
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Enviando…";
      fetch(sb.url.replace(/\/$/, "") + "/rest/v1/" + form.dataset.tabela, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: sb.anonKey, Authorization: "Bearer " + sb.anonKey, Prefer: "return=minimal" },
        body: JSON.stringify(dados)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        mostrar("ok", form.dataset.sucesso);
        if (window.fbq) fbq("track", "Lead");
        if (window.gtag) gtag("event", "generate_lead", { form: form.dataset.tabela });
      }).catch(function () {
        mostrar("erro", "Não foi possível enviar agora. Confira sua internet e tente de novo, ou fale com a gente pelo WhatsApp.");
      }).finally(function () {
        btn.disabled = false; btn.textContent = btn.dataset.texto;
      });
    });
    function mostrar(tipo, msg) { retorno.textContent = msg; retorno.className = "retorno " + tipo; retorno.focus(); }
  });

  var temMedicao = C.googleAnalyticsId || C.metaPixelId;
  var aviso = document.getElementById("cookies");
  function carregarMedicao() {
    if (C.googleAnalyticsId) {
      var s = document.createElement("script");
      s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.googleAnalyticsId;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag("js", new Date()); gtag("config", C.googleAnalyticsId);
    }
    if (C.metaPixelId) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq("init", C.metaPixelId); fbq("track", "PageView");
    }
  }
  var escolha = null;
  try { escolha = localStorage.getItem("folego_cookies"); } catch (e) {}
  if (temMedicao && aviso) {
    if (escolha === "aceito") carregarMedicao();
    else if (!escolha) aviso.hidden = false;
    aviso.addEventListener("click", function (e) {
      var r = e.target.getAttribute("data-cookies");
      if (!r) return;
      try { localStorage.setItem("folego_cookies", r); } catch (err) {}
      aviso.hidden = true;
      if (r === "aceito") carregarMedicao();
    });
  }
})();

(function () {
  "use strict";
  var form = document.querySelector("form[data-etapas]");
  if (!form) return;
  var etapas = Array.prototype.slice.call(form.querySelectorAll(".etapa"));
  if (!etapas.length) return;
  var rotulo = form.querySelector("[data-rotulo]");
  var barra = form.querySelector(".barra");
  var preenchimento = form.querySelector("[data-preenchimento]");
  var nomes = ["quem é você", "onde e como você roda", "o que você precisa"];
  var atual = 0;

  function mostrar(i) {
    atual = i;
    etapas.forEach(function (e, n) { e.hidden = n !== i; });
    if (rotulo) rotulo.textContent = "Etapa " + (i + 1) + " de " + etapas.length + " — " + (nomes[i] || "");
    if (preenchimento) preenchimento.style.width = ((i + 1) / etapas.length * 100) + "%";
    if (barra) barra.setAttribute("aria-valuenow", i + 1);
    var primeiro = etapas[i].querySelector("input,select");
    if (primeiro && i > 0) primeiro.focus();
  }
  function valida(etapa) {
    var campos = etapa.querySelectorAll("input,select");
    for (var i = 0; i < campos.length; i++) {
      if (!campos[i].checkValidity()) { campos[i].reportValidity(); return false; }
    }
    return true;
  }
  form.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-avancar") && valida(etapas[atual])) mostrar(Math.min(atual + 1, etapas.length - 1));
    if (e.target.hasAttribute("data-voltar")) mostrar(Math.max(atual - 1, 0));
  });
  form.addEventListener("submit", function () { setTimeout(function () {
    if (form.querySelector(".retorno.ok")) mostrar(0);
  }, 800); });
  mostrar(0);
})();
