let music = document.getElementById('audio');
let marquee = document.getElementById('marquee');

const seekBar = document.querySelector('.seek-bar');
const disk = document.querySelector('.disk-spin');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playButton = document.querySelector('.play-button');

playButton.addEventListener('loadeddata', () =>{
    startMarquee();
})

// start music
playButton.addEventListener('click', () => {
    if(playButton.className.includes('pause')){
        music.play();
        startMarquee();
    } else{
        music.pause();
        stopMarquee();
    }
    playButton.classList.toggle('pause');
    disk.classList.toggle('play');
})

// play music
const playMusic = (music) => {
    seekBar.value = 0; // set slide value to 0
    currentTime.innerHTML = '00:00';
    let song = new Audio("media/Imno ng PUP.mp3");
    setTimeout(() => {
        seekBar.max = song.duration;
        marquee.max = song.duration;
        musicDuration.innerHTML = formatTime(song.duration);
    })
}
playMusic(0)

// format music duration into minutes:seconds
const formatTime = (time) => {
    let minute = Math.floor(time/60);
    if(minute < 10){
        minute = `0${minute}`;
    }
    let second = Math.floor(time%60);
    if(second < 10){
        second = `0${second}`;
    }
    return `${minute}:${second}`;
}

// move the seek bar
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
    marquee.value = music.currentTime;
})

// start/stop the marquee
function startMarquee(){
    marquee.start();
}

function stopMarquee(){
    marquee.stop();
}

function seekBarMarquee(){
    marquee.value = music.currentTime;
}