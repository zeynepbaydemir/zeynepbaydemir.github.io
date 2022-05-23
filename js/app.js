// Query Selectors
const recipeForm = document.querySelector('#recipe-form');
const recipeContainer = document.querySelector('#recipe-container');
let listItems = [];

// FUNCTIONS
function handleFormSubmit(e){
  e.preventDefault();
  const isim = DOMPurify.sanitize(recipeForm.querySelector('#isim').value);
  const sure = DOMPurify.sanitize(recipeForm.querySelector('#sure').value);
  const desen = DOMPurify.sanitize(recipeForm.querySelector('#desen').value);
  const boyut = DOMPurify.sanitize(recipeForm.querySelector('#boyut').value);
  const icindekiler = DOMPurify.sanitize(recipeForm.querySelector('#icindekiler').value);
  const not = DOMPurify.sanitize(recipeForm.querySelector('#not').value);
  const newRecipe = {
    isim,
    sure,
    desen,
    boyut,
    icindekiler,
    not,
    id: Date.now(),
  }
  listItems.push(newRecipe);
  e.target.reset();
  recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

function displayRecipes(){
  const tempString = listItems.map(item => `
    <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm border-success">
        <div class="card-header py-3 text-white bg-success border-success">
          <h4 class="my-0">${item.isim}</h4>
        </div>
        <div class="card-body">
          <ul class="text-start">
            <li><strong>Pişme Süresi: </strong>${item.sure}</li>
            <li><strong>Desen: </strong>${item.desen}</li>
            <li><strong>Boyut: </strong>${item.boyut}</li>
            <li><strong>İçindekiler: </strong>${item.icindekiler}</li>
            ${!item.not.length ? "" : `<li><strong>Not: </strong>${item.not}</li>`}
          </ul>
          <button class="btn btn-lg btn-outline-danger" aria-label="Delete ${item.isim}" value="${item.id}">Çikolatanı Sil</button>
        </div>
      </div>
    </div>
    `).join('');
  recipeContainer.innerHTML = tempString;
}

function mirrorStateToLocalStorage(){
  localStorage.setItem('recipeContainer.list', JSON.stringify(listItems));
}

function loadinitialUI(){
  const tempLocalStorage = localStorage.getItem('recipeContainer.list');
  if(tempLocalStorage === null || tempLocalStorage === []) return;
  const tempRecipes = JSON.parse(tempLocalStorage);
  listItems.push(...tempRecipes);
  recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

function deleteRecipeFromList(id){
  listItems = listItems.filter(item => item.id !== id);
  recipeContainer.dispatchEvent(new CustomEvent('refreshRecipes'));
}

// EVENT LISTENERS
recipeForm.addEventListener('submit', handleFormSubmit);
recipeContainer.addEventListener('refreshRecipes', displayRecipes);
recipeContainer.addEventListener('refreshRecipes', mirrorStateToLocalStorage);
window.addEventListener('DOMContentLoaded', loadinitialUI);
recipeContainer.addEventListener('click', (e) => {
  if(e.target.matches('.btn-outline-danger')){
    deleteRecipeFromList(Number(e.target.value));
  };
})

/*Çikolata oluşturma kısmı biter*/ 



/*Yeni yıl kolaysiyonu süre başlar*/ 
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "1 Jan 2023";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);


/*quiz başlar*/
const quizData = [
  {
      question: "Dünyanın en iyi çikolata markası hangisidir?",
      a: "Willy Wonka Çikolataları",
      b: "Milka",
      c: "Ülker",
      d: "Torku",
      correct: "a",
  },
  {
      question: "İyi bir çikolatayı nasıl anlarsınız?",
      a: "Pahalı olmasından",
      b: "Anlayamam çünkü hiç Willy Wonka çikolataları satın almadım.",
      c: "Güzel olmasından",
      d: "Şekerli olmasından",
      correct: "b",
  },
  {
      question: "Çikolatayı çikolata yapan nedir?",
      a: "Çikolata olması",
      b: "Kahverengi olması",
      c: "Willy Wonka Çikolatası olması",
      d: "Şekersiz olması",
      correct: "c",
  },
  {
      question: "Dünyanın en iyi çikolata fabrikası?",
      a: "Ülker Fabrika",
      b: "Willy Wonka Çikolata Fabrikası",
      c: "Torku Fabrika",
      d: "Nutella Fabrika",
      correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
          answer = answerEl.id;
      }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
      answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // check to see the answer
  const answer = getSelected();

  if (answer) {
      if (answer === quizData[currentQuiz].correct) {
          score++;
      }

      currentQuiz++;
      if (currentQuiz < quizData.length) {
          loadQuiz();
      } else {
          quiz.innerHTML = `
              <h2>Doğru cevapladığınız soru sayısı: ${score}/${quizData.length} </h2>
              
              <button class="btn btn-outline-success" onclick="location.reload()">Tekrar yükle</button>
          `;
      }
  }
});

