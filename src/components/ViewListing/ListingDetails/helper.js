export function formattingTime(time) {
  let amPM, updatedTime;
  if (!isNaN(time)) {
    if (time < 11 || time > 23) {
      amPM = "AM";
    } else {
      amPM = "PM";
    }
    if (time < 12) {
      return time + amPM;
    } else {
      if (time > 24) {
        updatedTime = Number(time) - 24;
      } else {
        updatedTime = Number(time) - 12;
      }
      return updatedTime + amPM;
    }
  }
};


export function checkIn(checkInStart, checkInEnd) {
  let checkIn;
  if (checkInStart === "Flexible") {
    checkIn = "Flexible";
  } else {
    if (checkInEnd === "Flexible") {
      checkIn = "From " + formattingTime(checkInStart);
    } else {
      if (checkInStart != null && checkInEnd != null) {
        checkIn = generateTime(checkInStart) + " - " + generateTime(checkInEnd);
      }
    }
  }

  return checkIn;
};

export function checkValue(value, defaultValue) {
  return value !== null ? value : defaultValue;
};

export function generateTime(time) {
  let TimeLabel;
  switch (time) {
    case '8':
      TimeLabel = '8AM';
      break;
    case '9':
      TimeLabel = '9AM';
      break;
    case '10':
      TimeLabel = '10AM';
      break;
    case '11':
      TimeLabel = '11AM';
      break;
    case '12':
      TimeLabel = '12PM';
      break;
    case '13':
      TimeLabel = '1PM';
      break;
    case '14':
      TimeLabel = '2PM';
      break;
    case '15':
      TimeLabel = '3PM';
      break;
    case '16':
      TimeLabel = '4PM';
      break;
    case '17':
      TimeLabel = '5PM';
      break;
    case '18':
      TimeLabel = '6PM';
      break;
    case '19':
      TimeLabel = '7PM';
      break;
    case '20':
      TimeLabel = '8PM';
      break;
    case '21':
      TimeLabel = '9PM';
      break;
    case '22':
      TimeLabel = '10PM';
      break;
    case '23':
      TimeLabel = '11PM';
      break;
    case '24':
      TimeLabel = '12AM';
      break;
    case '25':
      TimeLabel = '1AM';
      break;
  }
  return TimeLabel;
}