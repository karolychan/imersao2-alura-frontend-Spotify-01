const searchInput = document.getElementById('search-input');
//const resultsArtist = document.getElementById('result-artist');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists'); 
// fim das variaveis do js 

// funcao muito bonita com fetch do js  consmindo reequisicoes da API 
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    //  vem as query parameters  pela URL com template string  (padrao pergutna para busca so do input)
    fetch(url)  //passagem da api endereco
        .then((response) => response.json() ) //chamada em prog assinc promises nland para escutar resposta e pegar
        .then((result) => displayResults(result, searchTerm)) // aqui chama funcao criada pra mostrar pro html de volta resultado da api artista + imgens
}
// mias uma funcaoo belezinha
function displayResults(result,searchTerm) {
    resultPlaylist.classList.add('hidden');
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML ="";  //  limpeza result anteriors

    const filteredArtists = result.filter ( artist => artist.name.toLowerCase().includes(searchTerm));

    filteredArtists.forEach(artist => {    
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
  
        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
        <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;
         gridContainer.appendChild(artistCard);
    });
  
    resultArtist.classList.remove('hidden');
  }

    // modo antigso de declarar buscas
    //const artistName = document.getElementById('artist-name');
    //const artistImg = document.getElementById('artist-img');
    


    //crie mais frescura para reecebimento das respostas da  tratamento antigo 
 //   result.forEach(element => {
 //       artistName.innerText = element.name;
 //       artistImg.src = element.urlImg;
 //   });
    // finalmente os coisa de exibir na html a card bolinha
//    resultsArtist.classList.remove('hidden');



// funcao principal da buscadora search
document.addEventListener('input',function(){
     const searchTerm  = searchInput.value.toLowerCase().trim();
     if (searchTerm === ''){ 

        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
        return;
        // funcao que esconde elemntu eh como se o back do front caso nao ache palavra la no CSS maincontet
        //resultPlaylist.classList.add('hidden');// antigo para mostrar playlist
        //resultsArtist.classList.remove('hidden'); //antigo pra escoder artista
       // return;
     }

     requestApi(searchTerm); //issu tipo console log da nossa funcao assincrona pra fazer searchs 
});