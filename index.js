const accessKey = "HWNWH9LZocqFc4fRncva77OcKl84K5KoqAOzfFCi_Hg";
const formEl = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const searchResultEl = document.querySelector('.search-results');
const showMoreButton = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages(){
    showMoreButton.style.display = 'none';
    inputData = searchInput.value;      // gets value of search bar
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1 || page === 0){
        searchResultEl.innerHTML = '';
    }


    const results = data.results;

    results.map((result)=>{

        const imageWraper = document.createElement('div');
        imageWraper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWraper.appendChild(image);
        imageWraper.appendChild(imageLink);

        searchResultEl.appendChild(imageWraper);

    })

    page++;


    if(page > 1){
        showMoreButton.style.display = 'block';
    }
}


formEl.addEventListener('submit', (event)=>{
    event.preventDefault();     // prevents web page from refreshing when form is submitted
    page = 1;
    searchImages();
})

showMoreButton.addEventListener('click', ()=>{
    searchImages();
})