var engine ={

 "cores": ['green', 'red','yellow', 'pink', 'purple', 'orange','grey', 'black', 'Maroon', 'Sienna', 'Violet','Lavender'],
"hexadecimais":{
    'green':'#02EF00',
    'red':'#E90808',
    'yellow':'#E7D703',
    'pink':'#F646A5',
    'purple':'#790093',
    'orange':'#F16529',
    'grey':'#EBEBEB',
    'black':'#000000',
    'Maroon':'#800000',
    'Sienna':'#A0522D',
    'Violet':'#EE82EE',
    'Lavender':'#E6E6FA',
},

"moedas":0

}

const audioMoeda = new Audio('audio/moeda.mp3')
const audioErrou = new Audio('audio/errou.mp3')

function sortearCor(){
    var indexcorSorteada =Math.floor(  Math.random() * engine.cores.length);
    var legendaCorCaixa = document.getElementById('cor-caixa');
    var nomeCorSorteada =  engine.cores[indexcorSorteada];
    legendaCorCaixa.innerText = nomeCorSorteada.toUpperCase();
    return engine.hexadecimais[nomeCorSorteada];
   
}
function aplicarCorCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById('cor-atual');
    caixaDasCores.style.backgroundColor  =nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('./img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');
    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    }else{
        audioMoeda.play();
    }
    pontuacao.innerText = engine.moedas;
}


aplicarCorCaixa(sortearCor())
//API DE RECONHECIMENTO DE VOZ

var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";
var respotaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI(); 
  
  gravador.continuos = false;
  gravador.lang ="en-US";


gravador.onstart = function(){
    btnGravador.innerText = "Estou Ouvindo";
    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
}

gravador.onend = function(){
    btnGravador.innerText = "Responder";
    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
}

gravador.onresult = function(event){
   transcricaoAudio = event.results[0][0].transcript.toUpperCase();
   respotaCorreta = document.getElementById('cor-caixa').innerText.toUpperCase();
  
   if(transcricaoAudio === respotaCorreta){
        atualizaPontuacao(1);
   }else{
        atualizaPontuacao(-1);
   }

   aplicarCorCaixa(sortearCor());
  
}


}else{
    alert('não tem suporte');
}



btnGravador.addEventListener('click', function(){
    gravador.start();
})