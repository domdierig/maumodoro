class Timer {
    constructor() {
        this.startButton = document.getElementById('start-btn');
        this.headerItemWork = document.getElementById('header-item-work');
        this.headerItemBreak = document.getElementById('header-item-break');
        this.headerItemLongBreak = document.getElementById('header-item-long-break');

        this.timeElement = document.getElementById('time');
        this.titleElement = document.getElementById('title');

        this.counter = 0;
        this.running = false;
        this.time = 0;
        this.mode = 'work';

        this.setTime(25);
        this.addEventListeners();
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
            this.updateCounter();

            this.running = true;
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
            this.updateHeaderItemActive(this.headerItemBreak);
        } else if (this.mode === 'break') {
            const audio = new Audio('./work.mp3');
            audio.volume = 1;
            audio.play();

            this.mode = 'work';
            this.setTime(25);
            this.updateHeaderItemActive(this.headerItemWork);
        }
    }

    updateTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;

        this.timeElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.titleElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updateCounter() {
        if (this.mode === 'work') {
            this.counter++;
            const counterElement = document.getElementById('counter');
            counterElement.innerHTML = `Maumodoro #${this.counter}`;
        }
    }

    updateHeaderItemActive(item) {
        this.headerItemWork.classList.remove('header-active');
        this.headerItemBreak.classList.remove('header-active');
        this.headerItemLongBreak.classList.remove('header-active');
        item.classList.add('header-active');
    }

    addEventListeners() {
        this.startButton.addEventListener('click', () => {
            this.start();
        });

        this.headerItemWork.addEventListener('click', () => {
            this.setTime(25);
            this.updateHeaderItemActive(this.headerItemWork);
        });

        this.headerItemBreak.addEventListener('click', () => {
            this.setTime(5);
            this.updateHeaderItemActive(this.headerItemBreak);
        });

        this.headerItemLongBreak.addEventListener('click', () => {
            this.setTime(15);
            this.updateHeaderItemActive(this.headerItemLongBreak);
        });
    }
}

class Tasks {
    constructor() {
        this.addTaskButton = document.getElementById('add-task-btn');
        this.taskList = document.getElementById('task-list');
        this.taskInput = document.getElementById('task-input');
        this.taskListItemTemplate = document.getElementById('task-list-item-template');

        this.taskElements = [];

        this.addEventListeners();
    }

    addEventListeners() {
        this.addTaskButton.addEventListener('click', () => {
            this.addTask();
        });
    }

    addTask() {
        const task = this.taskInput.value;
        this.taskInput.value = '';

        if (task.length > 0) {
            const newItem = this.taskListItemTemplate.cloneNode(true);

            newItem.classList.remove('hidden');
            newItem.id = `task-${this.taskElements.length}`;

            newItem.childNodes[1].value = task;

            newItem.childNodes[3].addEventListener('click', () => {
                this.resolveTask(newItem);
            });

            this.taskElements.push(newItem);
            this.taskList.appendChild(newItem);
        }
    }

    resolveTask(taskElement) {
        taskElement.childNodes[1].classList.add('strike-through');
    }
}

class Log {}

const timer = new Timer();
const tasks = new Tasks();
const log = new Log();
