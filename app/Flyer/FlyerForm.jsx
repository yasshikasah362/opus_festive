// utils/FlyerForm.js
import { getItemFromLocalStorage } from "../../utils/localStorageUtils"; // your existing util

export class FlyerForm {
  currFlyer = null;
  inputImageUrl = "";
  outputImageUrl = "";

  userInfo = {
    username: "",
    mobile: null,
    website: "",
    logoUrl: "",
  };

  constructor() {
    let user = getItemFromLocalStorage("user") || null;
    if (user) {
      let additionalInfo = user.additionalInfo;
      if (additionalInfo) {
        this.userInfo.username = user.username;
        this.userInfo.mobile = additionalInfo.mobile;
        this.userInfo.website = additionalInfo.website;
        this.userInfo.logoUrl = additionalInfo.logoUrl;
      }
    }
  }
}
