let grabber = document.getElementsByClassName("grabber");
let songsName = document.querySelector("#song-name");
let playButton = document.getElementById("playButton")

let allData = [];
async function getData() {
  const response = await fetch(
    "https://api.napster.com/v2.1/tracks/top?apikey=YTM3ODVhZDYtNTJhMC00ODUzLThjZjItOGZmMzJjMDliNmQ3"
  );
  let parseData = await response.json();
  let data = parseData.tracks;
  allData = [...data];
  console.log(allData);
  console.log("-------------------------------------");
  allData.forEach((element) => {
    let audioElement = new Audio();
    let musicName = [element.name];
    console.log(musicName);
    let nodes = musicName.map(() => {
      let h3SongName = document.createElement("h3");
      audioElement = new Audio(element.previewURL);
      h3SongName.className = "h3SongName";
      h3SongName.innerHTML = element.name;
      h3SongName.onclick = () => {
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      };
      playButton.addEventListener("click", ()=> {
        if(audioElement.paused || audioElement.currentTime <= 0){
          audioElement.play();
          playButton.classList.remove("fa-solid-fa-circle-play");
          playButton.classList.add("fa-solid-fa-circle-pause");
        }
        else{
          audioElement.pause();
          playButton.classList.remove("fa-solid-fa-circle-pause")
          playButton.classList.add("fa-solid-fa-circle-play")
        }
      })

      songsName.append(h3SongName);
      console.log(h3SongName);
      return h3SongName;
    });
    songsName.append(...nodes);
  });
}
getData();

