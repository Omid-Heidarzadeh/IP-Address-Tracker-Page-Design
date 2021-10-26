import { apiKey, endPoint } from "./ipApi.js";

export function isIp(str) {
  const parts = str.split(".");
  for (let part of parts) if (!Number.isInteger(parseInt(part))) return false;
  return true;
}

export async function getRequestedInfo(query) {
  return await fetch(query).then((response) => response.json());
}

export function getQueryString(request) {
  let ip,
    domain = "";
  if (request) {
    ip = request.ip;
    domain = request.domain;
  }
  const ipQuery = ip ? "&ipAddress=" + ip : "";
  const domainQuery = domain ? "&domain=" + domain : "";
  return `${endPoint}?apiKey=${apiKey}${ipQuery}${domainQuery}`;
}

export function showResults(ipInfo, placeHolders, updateMap) {
  const { location } = ipInfo;
  const { lat, lng } = location;
  let zoom = 13;
  updatePlaceholdersValues(ipInfo, placeHolders);
  updateMap(lat, lng, zoom);
}

export function updatePlaceholdersValues(ipInfo, placeHolders) {
  const { ip, location, isp } = ipInfo;
  const { region, city, postalCode, timezone } = location;
  const { resultIp, resultLocation, resultTimezone, resultIsp } = placeHolders;
  resultIp.textContent = ip;
  resultLocation.textContent = `${region}, ${city} ${postalCode}`;
  resultTimezone.textContent = `UTC ${timezone}`;
  resultIsp.textContent = isp;
}
