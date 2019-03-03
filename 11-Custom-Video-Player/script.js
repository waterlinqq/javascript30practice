const player = document.querySelector(".player")
const video = document.querySelector(".viewer")
const progressBar = player.querySelector(".progress")
const progressNow = player.querySelector(".progress__filled")
const playButton = player.querySelector(".player__button:first-of-type")
const playSliders = player.querySelectorAll(".player__slider")
const buttons = player.querySelectorAll("[data-skip]")


function togglePlay(){
    const toggle = video.paused ? "play" : "pause";
    video[toggle]()
    /*
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }*/
}

function updateButton(){
    playButton.textContent = this.paused ? "►" : "❚ ❚";
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}
function handleBarNowUpdate(){
    const persent = (video.currentTime/video.duration)*100
    progressNow.style.flexBasis = persent + "%";
}

function handleTime(){

    video.currentTime += parseFloat(this.dataset.skip)
}

function handleTimeUpdate(e){
    console.log(this)
    video.currentTime = 
    (e.clientX/progressBar.offsetWidth)*video.duration
    
}
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate',handleBarNowUpdate)
playSliders.forEach(slider => slider.addEventListener('change',handleRangeUpdate))
playSliders.forEach(slider => slider.addEventListener('mousemove',handleRangeUpdate))
buttons.forEach(button => button.addEventListener('click',handleTime))
let mouseDown = false;
progressBar.addEventListener('click',handleTimeUpdate)
progressBar.addEventListener('mousemove', (e) => mouseDown && handleTimeUpdate(e))//必須把e傳遞給handleTimeupdate 否則接收不到事件訊息
progressBar.addEventListener('mousedown',() => mouseDown = true)
progressBar.addEventListener('mouseup', () => mouseDown = false)