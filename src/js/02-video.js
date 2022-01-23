import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
    
player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(event) {
    
    localStorage.setItem('videoplayer-current-time', event.seconds);
      
};

if (localStorage.getItem('videoplayer-current-time')) { 
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
};
















