document.querySelector('.player').onclick = playPause;
document.querySelector('.buttons-wrap--sound').onclick = soundOnOff;

const video = document.querySelector('.player-video'),
    progress = document.querySelector('.player-progress'),
    popUpContent = document.querySelector('.popup'),
    textFullTime = document.querySelector('.time-second-end'),
    textOutTime = document.querySelector('.time-second-start');

video.onloadedmetadata = function () {
    textFullTime.innerHTML = '0:' + Math.floor(video.duration);
    textOutTime.innerHTML = '0:' + Math.floor(video.currentTime);
};

video.ontimeupdate = progressUpdate;

// progress.onclick = videoRewind;

function playPause(e) {
    if (e.target.classList.contains('playPause')) {
        if (video.paused) {
            video.play();
            this.classList.add("visible");
        }
        else {
            video.pause();
            this.classList.remove("visible");
        }
    }
}

function soundOnOff(e) {
    if (e.target.classList.contains('buttons-sound')) {
        if (video.muted == false) {
            video.muted = true;
            this.classList.add("visible");
        }
        else if (video.muted == true) {
            video.muted = false;
            this.classList.remove("visible");
        }
    }
}

document.querySelector('#fullScreen').onclick = function () {
    video.requestFullscreen();
};

function progressUpdate() {
    let fullTimeVariables = video.duration;
    let outTimeVariables = video.currentTime;
    progress.value = (100 * outTimeVariables) / fullTimeVariables;
    textFullTime.innerHTML = '0:' + Math.floor(video.duration);
    textOutTime.innerHTML = '0:' + Math.floor(video.currentTime);
    if (outTimeVariables >= 5 && outTimeVariables <= 5.3) {
        popUpActive();
    }
}

// function videoRewind() {
//     let w = this.offsetWidth;
//     let o = event.offsetX;
//     this.value = 100 * o / w;
//     video.pause();
//     video.currentTime = video.duration * (o / w);
//     video.play();
// }

function popUpActive() {
    document.querySelector('.popup-btn').onclick = validate;
    video.pause();
    popUpContent.classList.add("active");
}

document.querySelector('.popup-lang-ru').onclick = function () {
    document.querySelector('.popup-text--ru').style.display = 'block';
    document.querySelector('.popup-text--en').style.display = 'none';
};
document.querySelector('.popup-lang-en').onclick = function () {
    document.querySelector('.popup-text--ru').style.display = 'none';
    document.querySelector('.popup-text--en').style.display = 'block';
};

function validate() {
    let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        myMail = document.querySelector('.popup-input--email').value,
        valid = re.test(myMail);
    if (valid) {
        video.play();
        popUpContent.classList.remove("active");
    }
}
