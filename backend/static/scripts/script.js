function storeName() {
    console.log("hit");
    var input = document.getElementById("username").value;
    localStorage.setItem("uname", input);
    // alert(input)
    const URL = 'URL'
    const xhr = new XMLHttpRequest();
    sender = input;
    xhr.open('POST', URL);
    xhr.send(sender);
    location.href = 'C:/Users/Ved Prakash Dubey/Documents/DB-setup/templates/journal.html';
}
document.getElementById("name").innerHTML = localStorage.getItem("uname");

function storeEntry() {
    var entry = document.getElementById("subject").value;
    localStorage.setItem("journal_entry", entry);
    location.href = '/src/graph.html';
}