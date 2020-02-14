export default function getCoords(el) {
  const elCoords = el.getBoundingClientRect();
  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const clientTop = docEl.clientTop || body.clientTop || 0;

  return {
    left: elCoords.left - clientLeft,
    bottom: elCoords.bottom + scrollTop - clientTop,
  };
}