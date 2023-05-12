let url_input = document.getElementById("basic-url");
let download_btn = document.getElementById("download_btn");
let url_err = document.getElementById("url-err");
let loading = document.getElementById("loading");
let audio_container = document.getElementById("audio-container");
let audio = document.getElementById("audio");
let result_err = document.getElementById("result-err");
let music_title = document.getElementById("music-title");

download_btn.addEventListener("click", function () {
  console.log(url_input.value);
  let str = url_input.value;
  let pattern = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
  console.log(pattern.test(str));
  if (!pattern.test(str)) {
    url_err.classList.replace("d-none", "d-block");
    return;
  } else {
    url_err.classList.replace("d-block", "d-none");
  }
  loading.classList.replace("d-none", "d-flex");
  try {
    let xhr = new XMLHttpRequest();
    let url = "https://soundcloud-downloader4.p.rapidapi.com/soundcloud/track";
    let params = `url=${url_input.value}`; // https://soundcloud.com/dj_tuso/mixset-love-the-way-you-lie-tuso-x-cris-a?in=le-tuan-242265282/sets/ns-2023&si=ee96c409e27746b2a389b869a977bcbc&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
    xhr.open("GET", url + "?" + params);
    xhr.setRequestHeader(
      "X-RapidAPI-Key",
      "ef1db37c87msh2dadec0d1f6132dp1f5662jsn1d2fdcad68da"
    );
    xhr.setRequestHeader(
      "X-RapidAPI-Host",
      "soundcloud-downloader4.p.rapidapi.com"
    );
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(JSON.parse(this.responseText));
        audio.setAttribute(
          "src",
          JSON.parse(this.responseText).music.download_url
        );
        music_title.textContent = JSON.parse(this.responseText).music.title;
      }
    };
    xhr.send();
    loading.classList.replace("d-flex", "d-none");
    audio_container.classList.replace("d-none", "d-flex");
  } catch (err) {
    loading.classList.replace("d-flex", "d-none");
    audio_container.classList.replace("d-flex", "d-none");
    result_err.classList.replace("d-none", "d-flex");
  }
});
