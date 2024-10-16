export let formatTime = (isoString) =>{
    const date = new Date(isoString);
    return `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function pad(num, size = 2) {
    let s = num.toString();
    while (s.length < size) s = '0' + s;
    return s;
  }