const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');



///api url 

const apiURL = 'https://api.lyrics.ovh';

//adding event lisener  in form

form.addEventListener('click', e=> {
    e.preventDefault();
    searchValue = search.value.trim()

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})

//search song 
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    //  console.log(data)
    showData(data)
}

//display final result 

function showData(data){
  
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <h3>${song.artist.name}</h3> ${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}



//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }


  //display-clear 

  document.getElementById('clean').addEventListener('click', function(){
      result.innerText = "";
  })