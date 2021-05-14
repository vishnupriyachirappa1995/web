//import {environment} from '../../../assets/environments/environment';

export class Util {
  static IS_MOBILE_VIEW = true;
  static Month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  static uniqueId = 0;
  public static NON_ALPHA_NUMARIC = /[^\w\s]/g;
  static Init() {}

  public static UniqueCode(): string {
    var time: number = new Date().getTime();
    if (this.uniqueId == time) {
      while (new Date().getTime() < 1 + time) {}
      time = new Date().getTime();
    }
    this.uniqueId = time;
    return time.toString(36).toUpperCase();
  }

  public static UniqueNumber(): number {
    var time: number = new Date().getTime();
    if (this.uniqueId == time) {
      while (new Date().getTime() < 1 + time) {}
      time = new Date().getTime();
    }
    this.uniqueId = time;
    return time;
  }

  public static UniqueID(name: string, type: string): string {
    var str: string = "";

    if (type) {
      str = type + "_" + name;
    } else {
      str = name + "_" + Util.UniqueCode();
    }
    str = str.replace(Util.NON_ALPHA_NUMARIC, "_");
    str = str.replace(/\s/g, "_");
    str = str.substr(0, 128);
    return str.toUpperCase();
  }

  static GetParamString(data: JSON) {
    let returnValue = "";
    if (data) {
      for (let key of Object.keys(data)) {
        if (data[key] && data[key] != null && data[key] != "") {
          returnValue = returnValue == "" ? "?" : returnValue + "&";
          returnValue = returnValue + key + "=" + data[key];
        }
      }
    }
    return returnValue;
  }

  static ISODate(val: any) {
    let returnDate = "";
    val = this.UTC(val);
    if (val != null) {
      returnDate = val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
    }
    return returnDate;
  }
  static UTC(val: any): Date {
    if (val && val != null && val != "" && val != "null") {
      let parts = val.match(/\d+/g);
      let isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
      val = new Date(isoTime);
    } else {
      val = null;
    }
    return val;
  }
  static DateFormate(val: any) {
    let returnDate = "";
    console.log(val);
    val = this.UTC(val);
    console.log(val);
    if (val != null) {
      returnDate = val.getDate() + "-" + this.Month[val.getMonth()] + "-" + val.getFullYear();
    }
    return returnDate;
  }

  static DateTimeFormate(val: any) {
    let returnDate = "";
    val = this.UTC(val);
    if (val != null) {
      let minutes = "" + val.getMinutes();
      returnDate =
        val.getDate() +
        "-" +
        this.Month[val.getMonth()] +
        "-" +
        val.getFullYear() +
        " " +
        val.getHours() +
        ":" +
        (minutes.length == 1 ? "0" + minutes : minutes);
    }
    return returnDate;
  }
  static CurrentISODate() {
    let d: Date = new Date();
    return (
      "" +
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2) +
      "T" +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2) +
      ":" +
      ("0" + d.getSeconds()).slice(-2) +
      ".000Z"
    );
  }
  static DecodeURI(val: string) {
    if (!val || val == "") {
      val = "";
    } else {
      val = decodeURIComponent(val.replace(/\+/g, " "));
    }
    return val;
  }

  static IsEmpty(val: any) {
    let returnVal = true;
    if (typeof val === "number") {
      val = val.toString();
      if (val == "NaN") {
        val = "";
      }
    }
    if (val) {
      val = val.toString();
      returnVal = val.trim() == "" ? true : false;
    } else {
      console.log("is Empty else place");
    }
    return returnVal;
  }

  static GetNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  static encode(data: string) {
    if (data) {
      return btoa(data);
    } else {
      return null;
    }
  }

  static DaysDiff(d1: Date, d2: Date): number {
    var t2: number = d2.getTime();
    var t1: number = d1.getTime();
    let diff: any = (t2 - t1) / (24 * 3600 * 1000);
    return parseInt(diff);
  }
}
