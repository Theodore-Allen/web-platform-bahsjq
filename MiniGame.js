const catImg = document.getElementById('img');
const loadingObj = document.getElementById('loading');
const optionContainer = document.getElementById('q-container');
const WLPage = document.getElementById('WLPage');
const WLPageTxt = document.getElementById('WLPage-word');
const WLPageBtn = document.getElementById('nextCatBtn');

//game variable
const optionAmount = 4; // ten is the max but its really slow to load
let answer;
let score;

app();
async function app() {
  loading(true);
  getCatArray().then((e) =>
    id2CatInfo(
      e.map((e) => {
        return e.id;
      })
    ).then((e) => {
      var tempCat = [];
      for (var i = 0; i < optionAmount; i++) {
        tempCat.push({ name: e[i].breeds[0].name, id: e[i].id, url: e[i].url });
      }
      console.log(tempCat);
      gameStart(tempCat);
    })
  );
}

//event listenser
WLPageBtn.addEventListener('click', () => {
  app();
});
//functions

// pulls the cat id and img url from the api
async function getCatArray() {
  const endpoint =
    'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';
  const server = await fetch(endpoint);
  const response = await server.json();

  return response;
}

function gameStart(catsArray) {
  optionContainer.innerHTML = '';

  var tempRand = RandomInt(0, optionAmount);
  answer = tempRand;

  catImg.style.backgroundImage = `url(${catsArray[tempRand].url})`;

  // making the optionsBTNS for each cat
  for (var i = 0; i < optionAmount; i++) {
    const button = document.createElement('button');

    button.innerText = catsArray[i].name;
    button.setAttribute('index', i);
    button.addEventListener('click', (e) =>
      answerCheck(button.getAttribute('index'))
    );

    optionContainer.append(button);
  }

  if (document.readyState === 'ready' || document.readyState === 'complete') {
    loading(false);
  } else {
    document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
        loading(false);
      }
    };
  }
}

// runs the id back threw the api to get everything about the cat like the breed
async function id2CatInfo(id) {
  var cats = [];
  for (var i = 0; i < optionAmount; i++) {
    const endpoint = 'https://api.thecatapi.com/v1/images/' + id[i];
    const server = await fetch(endpoint);
    const response = await server.json();
    cats.push(response);
  }

  return cats;
}
//returns a random int number
function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function answerCheck(index) {
  console.log(index);
  if (index == answer) {
    console.log('you won');
    OpenWLPage(1);
  } else {
    console.log('you lose');
    OpenWLPage(0);
  }

  // app();
}
function loading(bool) {
  WLPage.style.display = 'none';
  if (bool === true) {
    loadingObj.classList.remove('hide');
  } else {
    loadingObj.classList.add('hide');
  }
}
// 0 lost 1 Win
function OpenWLPage(WL) {
  let rand = RandomInt(0, 2);
  console.log(rand);
  let win = ['you won', 'great job'];
  let lose = ['youre trash', 'you lost'];

  if (WL == 0) {
    // loosing
    WLPageTxt.innerText = lose[rand];
  } else {
    //winning
    WLPageTxt.innerText = win[rand];
  }

  catImg.style.background = 'none';
  catImg.style.boxShadow = 'none';

  WLPage.style.display = 'block';
}
//Api's used
// https://thecatapi.com/
