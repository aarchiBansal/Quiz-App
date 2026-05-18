
let user = "";


let quiz = [];
let quizName = "";
let index = 0;
let score = 0;
let skipped = 0;


let timer = null;
let time = 10;


let totalScore = 0;
let totalSkipped = 0;
let totalPlayed = 0;


function getUserKey(){
  return "quizStats_" + user;
}


function show(id){

  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
    s.style.display = "none";
  });

  const el = document.getElementById(id);

  if(!el){
    console.error("Screen not found:", id);
    return;
  }

  el.style.display = "block";
  el.classList.add("active");
}

function startApp(){

  user = document.getElementById("username").value.trim();

  if(!user){
    alert("Enter your name");
    return;
  }

  localStorage.setItem("quizUser", user);


totalScore = 0;
totalSkipped = 0;
totalPlayed = 0;

localStorage.setItem(getUserKey(), JSON.stringify({
  totalScore: 0,
  totalSkipped: 0,
  totalPlayed: 0
}));

  show("homeScreen");
  loadHome();
}


const subjects = {
  trending:[
    {name:"JavaScript", img:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", link:"https://developer.mozilla.org/en-US/docs/Web/JavaScript"},
    {name:"HTML", img:"https://images.unsplash.com/photo-1545670723-196ed0954986", link:"https://developer.mozilla.org/en-US/docs/Web/HTML"}
  ],
  popular:[
    {name:"Python", img:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935", link:"https://www.w3schools.com/python/"},
    {name:"CSS", img:"https://images.unsplash.com/photo-1507721999472-8ed4421c4af2", link:"https://developer.mozilla.org/en-US/docs/Web/CSS"}
  ],
  recommended:[
    {name:"Java", img:"https://images.unsplash.com/photo-1555066931-4365d14bab8c", link:"https://www.geeksforgeeks.org/java/"},
    {name:"C++", img:"https://images.unsplash.com/photo-1518770660439-4636190af475", link:"https://www.cplusplus.com/doc/tutorial/"}
  ],
  new:[
    {name:"AI", img:"https://images.unsplash.com/photo-1531746790731-6c087fecd65a", link:"https://huggingface.co/learn"}
  ]
};


function loadHome(){

  Object.keys(subjects).forEach(row=>{

    let box = document.getElementById(row);
    if(!box) return;

    box.innerHTML = "";

    subjects[row].forEach(s=>{

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"
            style="background-image:
            linear-gradient(to top,rgba(0,0,0,0.75),transparent),
            url(${s.img})">
            <span>${s.name}</span>
          </div>

          <div class="card-back">
            <p>${s.name}</p>
          </div>
        </div>
      `;

      card.onclick = () => openChoiceScreen(s);

      box.appendChild(card);
    });
  });
}


function openChoiceScreen(subject){

  show("choiceScreen");

  document.getElementById("choiceScreen").innerHTML = `
    <div class="hero">
      <h2>${subject.name}</h2>

      <button onclick="window.open('${subject.link}','_blank')">
        📘 Learn ${subject.name}
      </button>

      <button onclick="startQuiz('${subject.name}')">
        🎮 Start Quiz
      </button>

      <button onclick="goHome()">
        ⬅ Back Home
      </button>
    </div>
  `;
}


const questions = {

JavaScript: [
  {q:"JS is used for?", o:["Web logic","DB","OS","Hardware"], a:0},
  {q:"DOM stands for?", o:["Document Object Model","Data Object Model","Digital Output Mode","None"], a:0},
  {q:"JS file extension?", o:[".js",".java",".css",".html"], a:0},
  {q:"let keyword is used for?", o:["Variables","Loops","Classes","Styles"], a:0},
  {q:"Array starts from?", o:["0","1","-1","2"], a:0},
  {q:"typeof null returns?", o:["object","null","undefined","number"], a:0},
  {q:"JS runs in?", o:["Browser","Server","Compiler","OS"], a:0},
  {q:"Which is JS framework?", o:["React","Laravel","Django","Spring"], a:0},
  {q:"Function keyword is?", o:["function","def","func","method"], a:0},
  {q:"JS is?", o:["Dynamic language","Static language","Binary","Low level"], a:0}
],

HTML: [
  {q:"HTML stands for?", o:["Hyper Text Markup Language","High Text Language","None","Home Tool"], a:0},
  {q:"HTML is used for?", o:["Structure","Logic","AI","DB"], a:0},
  {q:"Image tag?", o:["<img>","<image>","<pic>","<src>"], a:0},
  {q:"Anchor tag?", o:["<a>","<link>","<href>","<url>"], a:0},
  {q:"HTML file extension?", o:[".html",".css",".js",".py"], a:0},
  {q:"Paragraph tag?", o:["<p>","<para>","<text>","<pg>"], a:0},
  {q:"Line break tag?", o:["<br>","<lb>","<break>","<line>"], a:0},
  {q:"Head tag contains?", o:["Meta info","Body","Footer","Script"], a:0},
  {q:"Title appears in?", o:["Browser tab","Body","Footer","Console"], a:0},
  {q:"HTML is?", o:["Markup language","Programming language","OS","Database"], a:0}
],

CSS: [
  {q:"CSS stands for?", o:["Cascading Style Sheets","Computer Style System","Color Style Sheet","None"], a:0},
  {q:"CSS is used for?", o:["Styling","Logic","DB","AI"], a:0},
  {q:"Color property?", o:["color","font","text","style"], a:0},
  {q:"Flexbox is used for?", o:["Layout","Database","Loop","Class"], a:0},
  {q:"CSS file extension?", o:[".css",".html",".js",".py"], a:0},
  {q:"Hover is?", o:["Pseudo-class","Function","Loop","Tag"], a:0},
  {q:"Display:block means?", o:["Block element","Inline element","Hidden","None"], a:0},
  {q:"position:absolute means?", o:["Fixed position","Relative","Random","None"], a:0},
  {q:"Inline CSS uses?", o:["style attribute","script","link","meta"], a:0},
  {q:"CSS is used for?", o:["Design","Logic","Storage","OS"], a:0}
],

Python: [
  {q:"Python is?", o:["Language","OS","Game","Browser"], a:0},
  {q:"Python creator?", o:["Guido van Rossum","Elon Musk","Bill Gates","Ritchie"], a:0},
  {q:"Python extension?", o:[".py",".js",".html",".cpp"], a:0},
  {q:"print() is used for?", o:["Output","Input","Loop","Class"], a:0},
  {q:"List is?", o:["Mutable","Immutable","Fixed","Static"], a:0},
  {q:"Tuple is?", o:["Immutable","Mutable","Loop","Function"], a:0},
  {q:"Indentation is?", o:["Required","Optional","None","Only class"], a:0},
  {q:"Dictionary stores?", o:["Key-value","Only keys","Only values","None"], a:0},
  {q:"Python type?", o:["Interpreted","Compiled","Binary","Low level"], a:0},
  {q:"Python used for?", o:["AI/ML","Only games","Only OS","Hardware"], a:0}
],

Java: [
  {q:"Java created by?", o:["Sun Microsystems","Google","Apple","Microsoft"], a:0},
  {q:"Java is?", o:["OOP language","Markup","DB","OS"], a:0},
  {q:"Java extension?", o:[".java",".js",".cpp",".py"], a:0},
  {q:"JVM stands for?", o:["Java Virtual Machine","Java Variable Method","Joint VM","None"], a:0},
  {q:"Java is?", o:["Platform independent","Dependent","OS specific","Browser"], a:0},
  {q:"Main method?", o:["public static void main","main()","start()","run()"], a:0},
  {q:"Compiled to?", o:["Bytecode","Machine code","HTML","CSS"], a:0},
  {q:"Inheritance is?", o:["OOP concept","Loop","Variable","DB"], a:0},
  {q:"Java used for?", o:["Apps","Games","Web","OS"], a:0},
  {q:"Garbage collection?", o:["Memory auto cleanup","Manual delete","Loop","Function"], a:0}
],

"C++": [
  {q:"C++ extension?", o:[".cpp",".js",".html",".css"], a:0},
  {q:"C++ is?", o:["OOP language","Markup","DB","OS"], a:0},
  {q:"Creator?", o:["Bjarne Stroustrup","Guido van Rossum","Gosling","Ritchie"], a:0},
  {q:"cout is used for?", o:["Output","Input","Loop","Class"], a:0},
  {q:"cin is used for?", o:["Input","Output","Loop","Function"], a:0},
  {q:"Header file?", o:["<iostream>","<html>","<css>","<js>"], a:0},
  {q:"new keyword?", o:["Memory allocation","Loop","Input","Delete"], a:0},
  {q:"Destructor is?", o:["Free memory","Create object","Loop","Input"], a:0},
  {q:"C++ type?", o:["Compiled","Interpreted","Script","Markup"], a:0},
  {q:"C++ is extension of?", o:["C language","Java","Python","HTML"], a:0}
],

AI: [
  {q:"AI stands for?", o:["Artificial Intelligence","Auto Input","Advanced Internet","Applied Interface"], a:0},
  {q:"AI used in?", o:["Chatbots","Games","Web","None"], a:0},
  {q:"Example of AI?", o:["ChatGPT","Paint","Notepad","Calculator"], a:0},
  {q:"ML is part of?", o:["AI","HTML","CSS","OS"], a:0},
  {q:"AI works on?", o:["Data","Paint","Fonts","Images"], a:0},
  {q:"Neural network is like?", o:["Brain","CPU","Keyboard","Mouse"], a:0},
  {q:"AI cannot do?", o:["Feel emotions","Process","Learn","Predict"], a:0},
  {q:"Self driving cars use?", o:["AI","HTML","CSS","Manual system"], a:0},
  {q:"AI improves with?", o:["Data","Paint","Games","Images"], a:0},
  {q:"AI includes?", o:["Robotics","Cooking","Farming","Gardening"], a:0}
]

};


function startQuiz(name){

  quizName = name;
  quiz = questions[name];

  index = 0;
  score = 0;
  skipped = 0;

  show("quizScreen");
  loadQuestion();
}


function loadQuestion(){

  clearInterval(timer);
  time = 10;

  const q = quiz[index];

  document.getElementById("quizTitle").innerText = quizName;
  document.getElementById("questionBox").innerText = `Q${index+1}. ${q.q}`;
  document.getElementById("qNumber").innerText = `${index+1}/${quiz.length}`;

  const opt = document.getElementById("options");
  opt.innerHTML = "";

  q.o.forEach((o,i)=>{
    const btn = document.createElement("button");
    btn.innerText = o;
    btn.onclick = ()=>checkAnswer(i,q.a);
    opt.appendChild(btn);
  });

  updateProgress();
  startTimer();
}


function startTimer(){

  clearInterval(timer);

  document.getElementById("timer").innerText = time;

  timer = setInterval(()=>{
    time--;
    document.getElementById("timer").innerText = time;

   if(time <= 0){
  skipped++;
  nextQuestion();
}
  },1000);
}


function checkAnswer(s,c){
  clearInterval(timer);
  if(s === c) score++;
  nextQuestion();
}


function nextQuestion(){

  index++;

  if(index < quiz.length){
    loadQuestion();
  } else {
    showResult();
  }
}


function updateProgress(){
  document.getElementById("progressBar").style.width =
  ((index)/quiz.length)*100 + "%";
}


function showResult(){

  clearInterval(timer);

  show("resultScreen");

  totalScore += score;
  totalSkipped += skipped;
  totalPlayed++;

  localStorage.setItem(getUserKey(), JSON.stringify({
    totalScore,
    totalSkipped,
    totalPlayed
  }));

  document.getElementById("finalScore").innerText =
  `Score: ${score}/${quiz.length}`;

  document.getElementById("finalStats").innerText =
  `Skipped: ${skipped}`;
}


function goHome(){


  clearInterval(timer);
  timer = null;

 
  quiz = [];
  quizName = "";
  index = 0;
  score = 0;
  skipped = 0;
  time = 10;

  
  const q = document.getElementById("questionBox");
  const o = document.getElementById("options");
  const n = document.getElementById("qNumber");
  const t = document.getElementById("timer");
  const p = document.getElementById("progressBar");

  if(q) q.innerText = "";
  if(o) o.innerHTML = "";
  if(n) n.innerText = "";
  if(t) t.innerText = "10";
  if(p) p.style.width = "0%";


  show("homeScreen");


  loadHome();
}


function logout(){
  if(confirm("Logout?")){

    localStorage.removeItem(getUserKey());

    totalScore = 0;
    totalSkipped = 0;
    totalPlayed = 0;

    location.reload();
  }
}


function showMyStats(){

  show("statsScreen");

  document.getElementById("statsScreen").innerHTML = `
    <div class="hero">
      <h2>📊 Stats</h2>

      <p>User: ${user}</p>
      <p>Total Score: ${totalScore}</p>
      <p>Total Skipped: ${totalSkipped}</p>
      <p>Played: ${totalPlayed}</p>

      <button onclick="goHome()">⬅ Back Home</button>
    </div>
  `;
}


function showAbout(){

  show("aboutScreen");

  document.getElementById("aboutScreen").innerHTML = `
  
  <div class="about-box">

    <h2>About QuizFlix</h2>

    <p class="sub">
      Learn coding in a fun, interactive way — like playing a game.
    </p>

    <div class="about-info">

      <div class="info-item">
        <h3>🎯 Purpose</h3>
        <p>Make programming easy, fun and practice-based.</p>
      </div>

      <div class="info-item">
        <h3>📚 Subjects</h3>
        <p>HTML, CSS, JavaScript, Python, Java, C++, AI basics.</p>
      </div>

      <div class="info-item">
        <h3>⏱ System</h3>
        <p>Timed quizzes with instant scoring and progress tracking.</p>
      </div>

    </div>

    <div class="about-footer">

      <p>Built for learners who love interactive practice 🚀</p>

      <button onclick="goHome()">⬅ Back Home</button>

    </div>

  </div>
  `;
}


function skipQuestion(){
  skipped++;
  nextQuestion();
}


window.onload = ()=>{
  const savedUser = localStorage.getItem("quizUser");
  if(savedUser) user = savedUser;
};