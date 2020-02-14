import { TOP_50 } from "constants/PlaylistIds";

const countries = [];
for (let country in TOP_50) {
  countries.push({
    name: transformCountryName(country),
  });
}

function transformCountryName(string) {
  let splitStr = string.split("_");
  let res = [];
  for (let i of splitStr) {
    res.push(i.charAt(0).toUpperCase() + i.slice(1));
  }
  return res.join(" ");
}

export default countries;