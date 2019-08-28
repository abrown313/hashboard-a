import request from 'superagent'

const config = require('./secret.config.json');
const CALENDAR_ID = config.cal_id;
const API_KEY = config.api_key;

let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

function parseStart(time) {
  let t = time.substring(0,11);
  t += "00:00:00.00Z";
  return t;
}

function parseEnd(time) {
  let t = time.substring(0,11);
  t += "23:59:00.00Z";
  return t;
}

export function getOnDuty (callback) {
  const now = new Date().toISOString();
  let params = {
    singleEvents: true,
    timeMin: parseStart(now),
    timeMax: parseEnd(now),
  }
  request.get(url, params).end((err, resp) => {
    if (!err) {
      const tasOnDuty = [];
      JSON.parse(resp.text).items.map((event) => {
        const startTime = new Date(event.start.dateTime).toISOString();
        const endTime = new Date(event.end.dateTime).toISOString();
        if (now >= startTime && now < endTime) {
          tasOnDuty.push({
            name: event.summary,
          })
        } 
      })
      callback(tasOnDuty);
    }
  });
}