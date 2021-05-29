function storeName() {
    var input = document.getElementById("username").value;
    localStorage.setItem("uname", input);
}
document.getElementById("name").innerHTML = localStorage.getItem("uname");

function storeEntry() {
    var entry = document.getElementById("subject").value;
    localStorage.setItem("journal_entry", entry);
    alert(entry)
}