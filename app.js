function addEventListeners() {
    const startButton = document.getElementById('start-btn');

    startButton.addEventListener('click', function () {
        updateTime();
    });
}

function updateTime() {
    const timeElement = document.getElementById('time');
    timeElement.innerHTML = '0:00';
}

addEventListeners();
