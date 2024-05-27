const startButton = document.getElementById('start-btn');
const headerItemWork = document.getElementById('header-item-work');
const headerItemBreak = document.getElementById('header-item-break');
const headerItemLongBreak = document.getElementById('header-item-long-break');

function updateHeaderItemActive(item) {
    headerItemWork.classList.remove('header-active');
    headerItemBreak.classList.remove('header-active');
    headerItemLongBreak.classList.remove('header-active');
    item.classList.add('header-active');
}

class Timer {
    constructor() {
        this.counter = 0;

        this.setTime(25);
    }

    setTime(time) {
        clearInterval(this.interval);
        this.running = false;
        this.time = time * 60;
        this.mode = time > 15 ? 'work' : 'break';
        this.updateTime();
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.updateCounter();

            this.time--;
            this.updateTime();
            this.interval = setInterval(() => {
                this.time--;
                this.updateTime();
                if (this.time === 0) {
                    this.stop();
                }
            }, 1000);
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.interval);
        if (this.mode === 'work') {
            const audio = new Audio('./break.mp3');
            audio.volume = 1;
            audio.play();

            this.mode = 'break';
            this.setTime(5);
            updateHeaderItemActive(headerItemBreak);
        } else if (this.mode === 'break') {
            const audio = new Audio('./work.mp3');
            audio.volume = 1;
            audio.play();

            this.mode = 'work';
            this.setTime(25);
            updateHeaderItemActive(headerItemWork);
        }
    }

    updateTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;

        const timeElement = document.getElementById('time');
        timeElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updateCounter() {
        if (this.mode === 'work') {
            this.counter++;
            const counterElement = document.getElementById('counter');
            counterElement.innerHTML = `Maumodoro #${this.counter}`;
        }
    }
}

const timer = new Timer();

startButton.addEventListener('click', function () {
    timer.start();
});

headerItemWork.addEventListener('click', function () {
    timer.setTime(25);
    updateHeaderItemActive(headerItemWork);
});

headerItemBreak.addEventListener('click', function () {
    timer.setTime(5);
    updateHeaderItemActive(headerItemBreak);
});

headerItemLongBreak.addEventListener('click', function () {
    timer.setTime(15);
    updateHeaderItemActive(headerItemLongBreak);
});
