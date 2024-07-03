let search = document.querySelector("input")
let root = document.querySelector(".root")
let url = "https://api.unsplash.com/photos/?client_id=7rJbnqy1kc_6Po5mDcse85EpNjIIUi8ZNnzBXtGSaQw";
function getSearchId(query){
    return `https://api.unsplash.com/search/photos?query=${query}&client_id=7rJbnqy1kc_6Po5mDcse85EpNjIIUi8ZNnzBXtGSaQw&client_id=7rJbnqy1kc_6Po5mDcse85EpNjIIUi8ZNnzBXtGSaQw`
}

function fetch(url, successhandler) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.onload = () => successhandler(JSON.parse(xhr.response))
    xhr.send();
}

function displayImages(images){
    root.innerHTML = "";
    images.forEach(image => {
        let li = document.createElement("li")
        let img = document.createElement("img")
        img.src = image.urls.thumb;
        li.append(img)
        root.append(li);
    });
}


fetch(url, displayImages)

function handleSearch(event){
    if(event.keyCode == 13 && search.value){
        fetch(getSearchId(search.value), (pic) => {
            displayImages(pic.results)
        })
        search.value = "";
    }
}


search.addEventListener("keyup",handleSearch);