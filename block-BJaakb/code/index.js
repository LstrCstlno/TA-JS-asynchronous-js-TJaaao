function fetch(url) {
    return Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open(`GET`, url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject("there is an error");
        xhr.send();
    });
}