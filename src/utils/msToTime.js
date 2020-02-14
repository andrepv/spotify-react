export default function msToTime(seconds) {
  let ms = seconds % 1000;
  let s = (seconds - ms) / 1000;
  let secs = s % 60;
  secs = (secs < 10) ? `0${secs}` : secs;
  s = (s - secs) / 60;
  let mins = s % 60;
  return mins + ":" + secs;
}