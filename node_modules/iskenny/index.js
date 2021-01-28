module.exports = function isKenny(input) {
  if (typeof input !== 'string') {
    return false;
  }
  return input.toLowerCase() === 'kenny' ? true : false;
}
