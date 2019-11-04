export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.addEventListener("message", e => {
    if (!e) return;
    console.log(e);
    postMessage("World");
  });
};
