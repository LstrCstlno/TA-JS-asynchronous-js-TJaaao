(function(){
    let main = document.querySelector(".main")
const booksUrl = "https://www.anapioficeandfire.com/api/books";
let charecterList = document.querySelector(".charecters-list");
let close = charecterList.querySelector(".close")

function handleSpin(rootElm, status = false){
    if(status){
        rootElm.innerHTML = `<div class="donut"></div>`
    }
}

function displayCharecters(charecters){
    handleSpin(charecterList, true);
    Promise.all(charecters.map((charecter) => fetch(charecter).then((res) => res.json())))
            .then((charData) => {
                charecterList.innerHTML = "";
                let h3 = document.createElement("h3")
                h3.innerText = `Charecters Names`
                let close = document.createElement("button");
                close.classList.add("close");
                close.innerText = "X";
                charecterList.append(close, h3)
                charData.forEach((char) => {
                    let li = document.createElement("li")
                    li.classList.add("charecter")
                    let p = document.createElement("p")
                    p.innerText = `${char.name} : (${char.aliases.join(",")})`
                    li.append(p)
                    charecterList.append(li)
                    close.addEventListener("click", () => {
                        charecterList.style.display = "none"
                    })
                })
            })
}

function displayBooks(data){
    main.innerHTML = "";
    data.forEach(book => {
        let li = document.createElement("li");
        li.classList.add("col");
        let h2 = document.createElement("h2")
        h2.innerText = book.name;
        let p = document.createElement("p");
        p.innerText = book.authors.join(" , ")
        let btn = document.createElement("button")
        btn.classList.add("char-btn");
        btn.innerText = `Show Charecters(${book.characters.length})`
        btn.addEventListener("click", () => {
            charecterList.style.display = "block";
            displayCharecters(book.characters);
        })
        li.append(h2,p,btn);
        main.append(li)
    });
}

function fetchdata() {
    handleSpin(main, true)
    fetch(booksUrl)
    .then((res => res.json()))
    .then((booksData) => {
        displayBooks(booksData);
    })
}

fetchdata();
})()
