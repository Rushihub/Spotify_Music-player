console.log('Lets write javascript');

let currentSong = new Audio();
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Lec%2084/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track) => {
    if (currentSong.src === "/Lec 84/songs/" + track && !currentSong.paused) {
        // If the song is already playing, don't do anything
        return;
    }

    // Pause the current song if it's playing
    currentSong.pause();
    currentSong.currentTime = 0; // Optional: Reset time to the beginning

    // Set the new track and play it
    currentSong.src = "/Lec 84/songs/" + track;
    currentSong.play().then(() => {
        console.log("Now playing: " + track);
    }).catch((err) => {
        console.error("Error occurred while playing audio:", err);
    });
}


async function main() {


    //Get the list of all the songs 
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".yourPlaylist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="/Lec 84/Assets/Images/music-note-svgrepo-com.svg" width="25px">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Rushikesh</div>
                            </div>
                            <div class="playnow"><span>Play Now</span><img class="invert" src="/Lec 84/Assets/Images/play.svg" alt=""
                                width="30px"></div>
                            
                        </li> `;

    }
    //Attach an event listener to each song
    Array.from(document.querySelector(".yourPlaylist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element=>{

            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })



    //Attach an event listener to play, next and previous
   




    const play = document.getElementById('play');

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play().then(() => {
                play.src = "/Lec 84/Assets/Images/pause.svg"; // Change to pause button
            }).catch((err) => {
                console.error("Error occurred while playing audio:", err);
            });
        } else {
            currentSong.pause();
            play.src = "/Lec 84/Assets/Images/play.svg"; // Change to play button
        }
    });
    
    




}

main()