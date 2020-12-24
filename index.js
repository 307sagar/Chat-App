let messages  = document.getElementById('messages');
let textbox  = document.getElementById('textbox');
let send  = document.getElementById('sendButton');
let chatDisplay = document.getElementById('chat-display');
let chatWindow = document.getElementById('chat-window');
let chatContainer = document.getElementById('chat-container');

let imgToDisplay,avatarName,imgSrc,avatarText;

var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

//formattig date time for messages
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}    

send.addEventListener('click', (e)=>{
    let newMessage = document.createElement('div');
    let d = new Date;
    let dformat = [ (d.getMonth()+1).padLeft(),
                d.getDate().padLeft(),
                d.getFullYear()].join('/')+
                ' ' +
              [ d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');

    newMessage.innerHTML = `<div class="container">
                        <img src="${imgSrc}" alt="${avatarText}" style="width:100%;">
                        <p>${textbox.value}</p>
                        <span class="time-right">${dformat}</span>
                        </div>`;
    if(textbox.value !== ''){
    messages.appendChild(newMessage);
    textbox.value = '';
    }

    else if(textbox.value === ''){
                window.alert('Cannot post empty message!')
    }
})

//Load and Search feature

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://run.mocky.io/v3/ea4ed786-7f3b-4882-b678-255c1791c2d8');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>              
                <img src="${character.image}"></img>
            </li>
        `;
        });
    charactersList.innerHTML = htmlString;
};

loadCharacters();


 //Display of Chat message of each Contact

 charactersList.addEventListener('click',(e)=>{
    let sp = document.createElement('span');
    
        let target = e.target;
        let oldTarget,newTarget;
        //  console.log(charactersList);
        // console.log(oldTarget);
        // console.log(newTarget);
        
         let ul = document.getElementById("charactersList");
                let items = ul.getElementsByTagName("li");
                for (var i = 0; i < items.length; i++) {
                    if(target === items[i]){
                        newTarget = items[i];
                        console.log(newTarget);
                                    items[i].setAttribute('id','targetContact');
                                    items[i].style.background = 'lightpink';
                                    chatDisplay.style.display = 'block';
                                    textbox.style.height = '30px';
                                    chatContainer.style.display = 'block';
                            chatDisplay.style.float = 'right';
                            chatWindow.style.display = 'block';
                            chatWindow.style.display = 'flex';
                            chatWindow.style.float = 'right';
                            avatarName = e.target.children[0];
                            imgToDisplay = e.target.children[1];
                            imgToDisplay.setAttribute('id','avatarImage');
                            avatarName.setAttribute('id','avatarName');
                        imgSrc =  document.getElementById('avatarImage').src;
                        avatarText = avatarName.innerHTML;
                        sp.innerHTML = `<span id='new_Span'><p style="color: white;">&#x2190; &nbsp; &nbsp; ${avatarText} &nbsp; &nbsp;<img id='newImgSpan' src="${imgSrc}" alt="${avatarText}"></p>
                                        </span>`;  
                        document.getElementById('image-avatar').append(sp); 
                }
                
            } 
           // console.log(oldTarget);
     target.removeAttribute('id'); 
     imgToDisplay.removeAttribute('id');
 });

 
 