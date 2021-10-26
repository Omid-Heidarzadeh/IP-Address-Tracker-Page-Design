import {
  isIp,
  getQueryString,
  getRequestedInfo,
  showResults
} from "./uitilites.js";
import { updateMap } from "./map.js";
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const placeHolders = {
  resultIp: document.querySelector("#ip"),
  resultLocation: document.querySelector("#location"),
  resultTimezone: document.querySelector("#timezone"),
  resultIsp: document.querySelector("#isp")
};

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const request = searchInput.value;
  const requestObject = isIp(request) ? { ip: request } : { domain: request };
  const queryString = getQueryString(requestObject);
  const ipInfo = await getRequestedInfo(queryString);
  showResults(ipInfo, placeHolders, updateMap);
});

window.addEventListener(
  "load",
  getRequestedInfo(getQueryString(null)).then((ipInfo) => {
    searchInput.value = ipInfo.ip;
    showResults(ipInfo, placeHolders, updateMap);
  })
);
