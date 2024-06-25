let search = document.querySelector("input[type = 'text']");
let username = document.querySelector(".name")
let login = document.querySelector(".username")
let dp = document.querySelector(".dp").children[0];
let follow = document.querySelectorAll(".follow")
let followArr = Array.from(follow);
let followimgs = followArr.map(arr => arr.children[0])
let catimg = document.querySelector(".catimg").children[0];
let btn = document.querySelector("input[type = 'button']");


function handler(event) {
    if(event.keyCode === 13){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${event.target.value}`)
        let xhr1 = new XMLHttpRequest();
        xhr1.open('GET', `https://api.github.com/users/${event.target.value}/followers`)
        let xhr2 = new XMLHttpRequest();
        xhr2.open('GET', `https://api.github.com/users/${event.target.value}/following`)
        
        
        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            dp.src = userData.avatar_url;
            username.innerText = userData.name;
            login.innerText = userData.login;
        }
        
        xhr1.onload = function(){
            let followerData = JSON.parse(xhr1.response);
            followimgs[0].src = followerData[0].avatar_url;
            followimgs[1].src = followerData[1].avatar_url;
            followimgs[2].src = followerData[2].avatar_url;
            followimgs[3].src = followerData[3].avatar_url;
        }
        
        xhr2.onload = function(){
            let followerData = JSON.parse(xhr2.response);
            followimgs[4].src = followerData[0].avatar_url;
            followimgs[5].src = followerData[1].avatar_url;
            followimgs[6].src = followerData[2].avatar_url;
            followimgs[7].src = followerData[3].avatar_url;
        }
        
        xhr.send();
        xhr1.send();
        xhr2.send();
        event.target.value = "";
    }
}

function handleClick() {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, `https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    xhr.onload = function(){
        let catData = JSON.parse(xhr.response);
        catimg.src = catData[0].url;
    }
    xhr.send();
}

search.addEventListener("keyup", handler);
btn.addEventListener("click", handleClick);