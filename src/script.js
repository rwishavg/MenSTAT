function storeName() {
    var input = document.getElementById("username").value;
    localStorage.setItem("uname", input);
}
document.getElementById("name").innerHTML = localStorage.getItem("uname");