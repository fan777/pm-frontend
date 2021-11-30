const readableTime = (datetime) => {
  let date = new Date(datetime);
  return date.toLocaleString();
}

export { readableTime }