export default function changeNumFormat(num) {
  if ( num > 999999) {
    return (num / 1000000).toFixed(1).replace( /\.0$/, "" ) + "m";
  } else if (num > 999) {
    return (num / 1000).toFixed(1).replace( /\.0$/, "" ) + "k";
  }
  return num;
}