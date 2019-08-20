const hostname = window.location.hostname;
const HOST = {
   PRO: 'https://wxapi.csair.com/',
   TEST: 'https://twx.csair.com/',
   DEV: 'http://198.162.1.80:8181/'
}
let ENV = "DEV";

if (hostname.indexof(HOST.PRO) > -1) {
   ENV = "PRO";
} else if(hostname.indexof(HOST.TEST) > -1) {
   ENV = "TEST";
} else {
   ENV = "DEV"
}

export default {
   HOST,
   ENV
}

