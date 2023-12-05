export function isLocalhost() {
  const currentDomian = window.location.hostname;
  if (currentDomian === "localhost") {
    return `http://${currentDomian}:8081/api`;
  } else {
    return `https://${currentDomian}/api`;
  }
}
