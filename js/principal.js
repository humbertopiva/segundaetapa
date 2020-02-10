(function () {
  function renderQuiz() {
    const output = [];
    questoes.forEach(
      (currentQuiz, numeroEnunciado) => {
        const alternativas = [];
        for (letter in currentQuiz.alternativas) {
          alternativas.push(
            `<label>
              <input type="radio" name="enunciado${numeroEnunciado}" value="${letter}">
              ${letter} :
              ${currentQuiz.alternativas[letter]}
            </label>`
          );
        }
        output.push(
          `<div class="slide">
            <img src="${currentQuiz.imagem}" class="imagem-quiz">
            <div class="enunciado"> ${currentQuiz.enunciado} </div>
            <div class="alternativas"> ${alternativas.join("")} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }

  function mostrarResultados() {
    const respostaContainers = quizContainer.querySelectorAll('.alternativas');
    const nomeCandidato = document.querySelector('#nome').value;

    let contAcertos = 0;

    questoes.forEach((currentQuiz, numeroEnunciado) => {
      const respostaContainer = respostaContainers[numeroEnunciado];
      const selector = `input[name=enunciado${numeroEnunciado}]:checked`;
      const candidatoResposta = (respostaContainer.querySelector(selector) || {}).value;

      if (candidatoResposta === currentQuiz.respostaCorreta) {
        contAcertos++;
      }
    });

    if (contAcertos >= 7) {
      alert (`Parabéns ${nomeCandidato} você acertou ${(contAcertos / questoes.length) * 100}% das questões e foi aprovado!`)
      window.location.href = 'index.html';
    } else {
      alert(`Poxa ${nomeCandidato}, você acertou apenas ${(contAcertos / questoes.length) * 100}% das questões e infelizmente foi reprovado.`)
      window.location.href = 'index.html';
    }
  }


  function mostrarSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      anteriorButton.style.display = 'none';
    }
    else {
      anteriorButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      proximoButton.style.display = 'none';
      concluirButton.style.display = 'inline-block';
    }
    else {
      proximoButton.style.display = 'inline-block';
      concluirButton.style.display = 'none';
    }
  }

  function mostrarProximoSlide() {
    mostrarSlide(currentSlide + 1);
  }

  function mostrarSlideAnterior() {
    resultadosContainer.innerHTML = '';
    mostrarSlide(currentSlide - 1);
  }

  // Variaveis
  const quizContainer = document.getElementById('quiz');
  const resultadosContainer = document.getElementById('resultados');
  const concluirButton = document.getElementById('concluir');

  renderQuiz();

  const anteriorButton = document.getElementById("anterior");
  const proximoButton = document.getElementById("proximo");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  mostrarSlide(currentSlide);

  concluirButton.addEventListener('click', mostrarResultados);
  anteriorButton.addEventListener("click", mostrarSlideAnterior);
  proximoButton.addEventListener("click", mostrarProximoSlide);
}
)();
