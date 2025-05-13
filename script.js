// === BOOT ===
window.onload = () => {
  const boot = document.getElementById("boot");
  setTimeout(() => {
    boot.style.display = "none";
    document.getElementById("menu").style.opacity = 0;
    document.getElementById("menu").style.transform = "translateY(20px)";
    document.getElementById("menu").style.display = "block";
    setTimeout(() => {
      document.getElementById("menu").style.animation = "fadeIn 1s ease-out forwards";
    }, 10);
  }, 3000);
};

// === ESTADOS DO JOGO ===
let enigmaBinarioDecifrado = false;
let urlAcessada = false;
let dataNotaEncontrada = null;
let mensagemTxtAberta = false;
let botaoFonteBinVisivel = false;

// === ELEMENTOS DA INTERFACE ===
const logIndicator = document.getElementById("log-indicator");
const arquivoLog = document.getElementById("arquivo-log");
const inputNavegador = document.getElementById("inputNavegador");
const respostaNavegador = document.getElementById("respostaNavegador");
const iframeNavegador = document.getElementById("iframeNavegador");
const textoNotas = document.getElementById("texto-notas");
const respostaArquivos = document.getElementById("respostaArquivos");
const mensagemTxt = document.getElementById("mensagem-txt");
const iconeChatmini = document.getElementById("icon-chatmini");
const botaoFonteBin = document.getElementById("botao-fonte-bin");
const telaFinal = document.getElementById("tela-final");
const mensagemFinal = document.getElementById("mensagem-final");
const conversaChatmini = document.getElementById("conversa-chatmini");

// === SOM MACABRO ===
function tocarSomMacabro() {
  const som = document.getElementById("somMacabro");
  som.currentTime = 0;
  som.play();
}

// === INTRODUÇÃO ===
function iniciarIntro() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("introducao").style.display = "block";
  const texto = [
    "2002. Alan encontrou um PC antigo no porão da nova casa dos pais.",
    "A tela está danificada, mas ele decide ligá-lo mesmo assim.",
    "Logo, percebe que este não é um computador comum...",
    "Programas estranhos. Mensagens. Vozes?",
    "Um programa aparece do nada: 'você é como ele?'",
    "Algo — ou alguém — ainda vive dentro dessa máquina..."
  ];
  const container = document.getElementById("textoIntro");
  container.innerHTML = "";
  texto.forEach((linha, index) => {
    const p = document.createElement("p");
    p.textContent = linha;
    p.style.animationDelay = `${index * 3}s`;
    container.appendChild(p);
  });

  setTimeout(() => {
    document.getElementById("introducao").style.display = "none";
    document.getElementById("desktop").style.opacity = 0;
    document.getElementById("desktop").style.transform = "translateY(20px)";
    document.getElementById("desktop").style.display = "flex";
    setTimeout(() => {
      document.getElementById("desktop").style.animation = "fadeIn 0.5s ease-out forwards";
    }, 10);
    // Primeiro enigma após um tempo no desktop
    setTimeout(exibirEnigmaBinario, 5000);
  }, 21000);
}

// === CRÉDITOS ===
function mostrarCreditos() {
  const c = document.getElementById("creditos");
  c.style.display = c.style.display === "none" ? "block" : "none";
}

// === JANELAS ===
function abrirJanela(id) {
  const janela = document.getElementById(id);
  janela.classList.remove("window-oculta");
  janela.classList.add("window-aparecendo");
  janela.style.display = "block";
}
function fecharJanela(id) {
  const janela = document.getElementById(id);
  janela.classList.remove("window-aparecendo");
  janela.classList.add("window-oculta");
  setTimeout(() => {
    janela.style.display = "none";
  }, 300); // Tempo da animação de fade out
}

// === ENIGMA BINÁRIO ===
function exibirEnigmaBinario() {
  arquivoLog.textContent = "Mensagem: Chatmini.Ai está perto... Ele nunca se foi...\n\nNova Mensagem: Binário: 01010011 01101001 01100111 01100001 00100000 01101111 00100000 01100011 01101111 01100101 01101100 01101000 01101111 00100000 01100010 01110010 01100001 01101110 01100011 01101111 00101110";
  arquivoLog.style.display = "block";
  logIndicator.classList.add("notification-ativo");
  arquivoLog.onclick = () => {
    if (!enigmaBinarioDecifrado) {
      const binario = arquivoLog.textContent.split("Binário: ")[1];
      const bytes = binario.split(" ");
      let mensagem = "";
      for (const byte of bytes) {
        mensagem += String.fromCharCode(parseInt(byte, 2));
      }
      arquivoLog.textContent += "\n\nDecifrado: " + mensagem;
      enigmaBinarioDecifrado = true;
      logIndicator.classList.remove("notification-ativo");
      iconeChatmini.classList.add("icon-aparecendo");
    }
    arquivoLog.onclick = null; // Desativa o clique após decifrar
  };
}

// === NAVEGADOR ===
function verificarURL() {
  const urlDigitada = inputNavegador.value.toLowerCase();
  if (urlDigitada === "dominio.oculto/chave.html") {
    respostaNavegador.textContent = "Aguarde...";
    iframeNavegador.onload = () => {
      urlAcessada = true;
      respostaNavegador.style.display = "none";
      iframeNavegador.style.display = "block";
      // Extrair texto criptografado e código Morse (simulado)
      const iframeDocument = iframeNavegador.contentDocument || iframeNavegador.contentWindow.document;
      const textoCriptografado = iframeDocument.getElementById("criptografado").textContent;
      const codigoMorse = iframeDocument.getElementById("morse").textContent;

      const mensagemBase64Decifrada = atob(textoCriptografado);
      textoNotas.value += "\n\nPista do Navegador: " + mensagemBase64Decifrada;
      dataNotaEncontrada = "081102"; // Simulação da data
      textoNotas.value += "\n\nData Importante (Exemplo): " + dataNotaEncontrada;
    };
    iframeNavegador.src = "chave.html"; // Você precisaria criar este arquivo HTML
  } else {
    respostaNavegador.textContent = "Domínio não encontrado.";
    iframeNavegador.style.display = "none";
  }
}

// === ARQUIVOS ===
function abrirMensagem() {
  mensagemTxtAberta = true;
  respostaArquivos.style.display = "none";
  mensagemTxt.style.display = "block";
  const textoCifrado = "Lipps${svph${e${tvymrk${e${zpegi${evsviky${hsqmig$";
  const chave = parseInt(dataNotaEncontrada ? dataNotaEncontrada.substring(0, 2) : "0", 10); // Usa o dia da data como chave (simulado)
  mensagemTxt.value = decifrarCesar(textoCifrado, chave);
  if (mensagemTxt.value.includes("borda inferior direita")) {
    botaoFonteBin.classList.add("mostrar");
    botaoFonteBinVisivel = true;
  }
}

// === FUNÇÃO DE DECODIFICAÇÃO CÉSAR ===
function decifrarCesar(textoCifrado, chave) {
  let textoDecifrado = "";
  for (let i = 0; i < textoCifrado.length; i++) {
    let char = textoCifrado[i];
    if (char.match(/[a-z]/i)) {
      const code = textoCifrado.charCodeAt(i);
      let shifted;
      if (code >= 65 && code <= 90) { // Maiúsculas
        shifted = ((code - 65 - chave + 26) % 26) + 65;
      } else if (code >= 97 && code <= 122) { // Minúsculas
        shifted = ((code - 97 - chave + 26) % 26) + 97;
      }
      textoDecifrado += String.fromCharCode(shifted);
    } else {
      textoDecifrado += char;
    }
  }
  return textoDecifrado;
}

// === FINAL DO JOGO ===
function finalizarJogo(apagarFonte) {
  document.getElementById("desktop").style.display = "none";
  document.getElementById("escolha").style.display = "none";
  telaFinal.style.display = "flex";
  document.body.style.backgroundColor = "black"; // Garante fundo preto na tela final
  if (apagarFonte) {
    mensagemFinal.textContent = "Chatmini.Ai foi silenciada... mas Zack se foi para sempre.";
  } else {
    mensagemFinal.textContent = "O resgate de Zack... continua em outra dimensão.";
    // Aqui você poderia adicionar lógica para desbloquear mais enigmas/conteúdo
  }
}

// === ARRASTAR JANELAS (PC + MOBILE) ===
document.querySelectorAll(".window").forEach((janela) => {
  const barra = janela.querySelector(".title-bar");
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;

  const startDrag = (x, y) => {
    offsetX = x - janela.offsetLeft;
    offsetY = y - janela.offsetTop;
    isDragging = true;
    janela.style.zIndex = 999;
  };

  const drag = (x, y) => {
    if (isDragging) {
      janela.style.left = `${x - offsetX}px`;
      janela.style.top = `${y - offsetY}px`;
    }
  };

  const stopDrag = () => {
    isDragging = false;
    janela.style.zIndex = 5; // Restaura o z-index padrão
  };

  // PC
  barra.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
  document.addEventListener("mousemove", (e) => drag(e.clientX, e.clientY));
  document.addEventListener("mouseup", stopDrag);

  // Mobile
  barra.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    drag(touch.clientX, touch.clientY);
  });
  document.addEventListener("touchend", stopDrag);
});

// === ARRASTAR ÍCONES (PC + MOBILE) ===
let dragged = null;

document.querySelectorAll(".icon").forEach((icon) => {
  icon.addEventListener("dragstart", (e) => {
    dragged = e.target;
  });

  // Mobile workaround
  icon.addEventListener("touchstart", (e) => {
    dragged = e.currentTarget;
  });
});

function permitirSoltar(e) {
  e.preventDefault();
}

function soltarNaLixeira(e) {
  e.preventDefault();
  if (dragged && dragged.classList.contains("icon")) {
    dragged.style.display = "none";
    if (dragged.id === "icon-chatmini") {
      alert("Você deletou o Chatmini.Ai. Silêncio eterno.");
      tocarSomMacabro();
      setTimeout(() => {
        finalizarJogo(true); // Fim do jogo ao deletar Chatmini.Ai
      }, 3000);
    } else {
      alert("Ícone enviado para a lixeira.");
    }
    dragged = null;
  }
}
