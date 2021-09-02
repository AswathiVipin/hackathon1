const base_url="https://api.jikan.moe/v3/anime/";

function searchAnime(event){

    event.preventDefault();

const form=new FormData(this);
const query=form.get("search");

console.log(query);

fetch('${base_url}/search/anime?q=${query}&page=1') 
.then((res)=>res.json())
.then(updateDom)
.catch((err)=>{
    console.log(err);  
})

}


function updateDom(data){
    const searchResults=document.getElementById('search-results');

    const animeByCategory=data.results
    .reduce((acc,anime) => {
        const{type}=anime;
        if (acc[type]===undefined)  acc[type]=[];
        acc[type].push(anime);
        return acc;
    },{});


    searchResults.innerHTML=Object.keys(animeByCategory).map(key=>{
    const animeHTML=animeByCategory[key]
    .sort((a,b)=>a.episodes - b.episodes)
    .map(anime =>{

        return
        `
        <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="${anime.image_url}">
        </div>
        <div class="card-content">
        <span class="card-title">${anime.title}</span>
          <p>${anime.synopsis}</p>
        </div>
        <div class="card-action">
          <a href="${anime.url}">This is a link</a>
        </div>
      </div>
    </div>     
        `
             
        
    }).join("");
    return `
    
    <section>
        <h3>${key.toUpperCase()}</h3>
        <div class="row">${animeHTML}</div>
    </section>
    ` 
    }).join("");
}

function pageLoaded(){
    const form=document.getElementById('search_form')
    form.addEventListener("submit",searchAnime);
}

window.addEventListener("loaded",pageLoaded);