"use strict";

function searchFilms(input) {
    var errorText = document.getElementById('search-errors'),
        tbody = document.getElementById('films').getElementsByTagName('tbody')[0];

    errorText.innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/search?name=' + input.value, false);
    xhr.send();
    if (xhr.status != 200) {
        errorText.innerHTML = xhr.status + ': ' + xhr.statusText;
    } else {
        tbody.innerHTML = xhr.responseText;
    }
}