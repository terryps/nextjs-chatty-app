const dateToEpoch = (dateTime) => {
    const dateAndTime = dateTime.split(/[\TZ]/);
    const yMD = dateAndTime[0].split("-").map(el => parseInt(el));
    const hMS = dateAndTime[1].split(":").map(el => parseInt(el));
    yMD[1] -= 1;
    return new Date(...yMD, ...hMS).getTime() / 1000;
}
  
export const getTimeLapsed = (createdDate) => {
    // sec, min, hour, day, week
    const createdEpoch = dateToEpoch(createdDate);
    const currentEpoch = parseInt(new Date().getTime() / 1000);
    const KR_TIME_DIFF = 9 * 60 * 60;
    const timelapsed = currentEpoch - createdEpoch - KR_TIME_DIFF;
  
    if(timelapsed > 604800) {
      // week
      return parseInt(timelapsed / 604800) + "w";
    } else if(timelapsed > 86400) {
      // day
      return parseInt(timelapsed / 86400) + "d";
    } else if(timelapsed > 3600) {
      // hour
      return parseInt(timelapsed / 3600) + "h";
    } else if(timelapsed > 60) {
      // min
      return parseInt(timelapsed / 60) + "m";
    } else {
      // sec
      return parseInt(timelapsed) + "s";
    }
};