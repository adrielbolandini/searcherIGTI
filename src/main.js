window.addEventListener('load',()=>{
    eventos();
});

function eventos(){
    input.addEventListener('input',()=>{
        pesquisar();
    });
    botao.addEventListener('click',()=>{
        pesquisar();
    });

}

const botao = document.querySelector('button');
const input = document.querySelector('input');
const divusers = document.querySelector('.users');
const lista = document.querySelector('.users ul');
const divstatistcs = document.querySelector('.statistcs');

async function fetchpessoas(){
    let res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    let fres = await res.json();
    let infos = fres.results.map(e=>{
        return{
            name: `${e.name.first} ${e.name.last}`,
            picture: e.picture,
            gender: e.gender,
            age: e.dob.age 
        }
    });
    return infos;
}

async function pesquisar(){
    let db = await fetchpessoas();
    let words = input.value;
    let Words =0;
    if ((words.split(seaprator="")).length!==0){
        Words = (words[0]).toUpperCase();
    } else{
        Words = words;
    }
    Words = Words+words.slice(1);
    let newdb = db.filter(e=>{
        if (e.name.includes(words)===true|| e.name.includes(Words)===true){
            return true;
        }
        return false;
    });
    render(newdb);
    return true;
}

function render(db){
    var male=0, female=0, sumAge=0, avarAge = 0;
    if (db.length===0){
        divusers.innerHTML='';
        divstatistcs.innerHTML='';
        let messageusers = document.createElement('h1');
        messageusers.appendChild(document.createTextNode('Nenhum usuário filtrado'));
        divusers.appendChild(messageusers);
        let messagestatistcs = document.createElement('h1');
        messagestatistcs.appendChild(document.createTextNode('Nada a ser exibido'));
        divstatistcs.appendChild(messagestatistcs);
        return true
    }
    console.log(db);
    divusers.innerHTML='';
    divstatistcs.innerHTML='';
    lista.innerHTML='';
    db.forEach(element => {
        let elemento = document.createElement('p');
        let picture = document.createElement('img');
        picture.src = `${element.picture.thumbnail}`;
        elemento.appendChild(picture);

        element.gender==='male'? male++:female++;
        sumAge=sumAge+element.age;
        avarAge=sumAge/(male+female);


        elemento.appendChild(document.createTextNode(`${element.name}, ${element.age} anos`));
        lista.appendChild(elemento);
    });
    divusers.appendChild(lista);
    let Male = document.createElement('p');
    let Female = document.createElement('p');
    let AvarAge = document.createElement('p');
    let SumAge = document.createElement('p');
    Male.innerHTML=`Sexo Masculino: ${male}`;
    Female.innerHTML=`Sexo Feminino: ${female}`;
    SumAge.innerHTML=`Soma das Idades: ${sumAge}`;
    AvarAge.innerHTML=`Média das Idades: ${avarAge.toFixed(2)}`;
    divstatistcs.appendChild(Male);
    divstatistcs.appendChild(Female);
    divstatistcs.appendChild(SumAge);
    divstatistcs.appendChild(AvarAge);
}

