const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const resultIp = document.querySelector("#ip");
const resultLocation = document.querySelector("#location");
const resultTimezone = document.querySelector("#timezone");
const resultIsp = document.querySelector("#isp");

const apiKey = "at_9tjssmveWYV77YMa0KjA2Dm5qcJ0I";
const endPoint = "https://geo.ipify.org/api/v2/country,city";

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  let ipInfo;
  if (isIp(query))
    ipInfo = await getIpOrDomainInfo(getQueryString({ ip: query }));
  else ipInfo = await getIpOrDomainInfo(getQueryString({ domain: query }));
  showResults(ipInfo);
});

function isIp(str) {
  let result = true;
  const parts = str.split(".");
  parts.forEach((part) => (result = Number.isInteger(parseInt(part))));
  return result;
}

function getIpOrDomainInfo(query) {
  return fetch(query).then((response) => response.json());
}

function getQueryString({ ip, domain }) {
  const ipQuery = ip ? "&ipAddress=" + ip : "";
  const domainQuery = domain ? "&domain=" + domain : "";
  return `${endPoint}?apiKey=${apiKey}${ipQuery}${domainQuery}`;
}

window.addEventListener(
  "load",
  getIpOrDomainInfo(getQueryString({})).then((result) => {
    searchInput.value = result.ip;
    showResults(result);
  })
);

function showResults({ ip, location, isp }) {
  const { region, city, postalCode, timezone } = location;

  resultIp.textContent = ip;
  resultLocation.textContent = `${region}, ${city} ${postalCode}`;
  resultTimezone.textContent = `UTC ${timezone}`;
  resultIsp.textContent = isp;
}

// let sampleResult = {
//   ip: "79.110.54.124",
//   location: {
//     country: "US",
//     region: "Nevada",
//     city: "Las Vegas",
//     lat: 36.17497,
//     lng: -115.13722,
//     postalCode: "89101",
//     timezone: "-07:00",
//     geonameId: 5506956
//   },
//   as: {
//     asn: 9009,
//     name: "M247",
//     route: "79.110.54.0/24",
//     domain: "http://www.m247.com",
//     type: "NSP"
//   },
//   isp: "M247 Ltd."
// };
