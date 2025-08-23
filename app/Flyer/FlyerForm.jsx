// import { getItemFromLocalStorage } from "../../utils/localStorageUtils";


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


  // ✅ method to set template
  setCurrFlyer(template) {
    this.currFlyer = template;
  }

  // ✅ method to set input image url
  setInputImage(url) {
    this.inputImageUrl = url;
  }

  // ✅ method to set output image url
  setOutputImage(url) {
    this.outputImageUrl = url;
  }

  // ✅ method to update user info
  setUserInfo({ username, mobile, website, logoUrl }) {
    this.userInfo = {
      username: username || this.userInfo.username,
      mobile: mobile || this.userInfo.mobile,
      website: website || this.userInfo.website,
      logoUrl: logoUrl || this.userInfo.logoUrl,
    };
  }
}




  // constructor() {
  //   // let user = getItemFromLocalStorage("user") || null;
  //   if (user) {
  //     let additionalInfo = user.additionalInfo;
  //     if (additionalInfo) {
  //       this.userInfo.username = user.username || "";
  //       this.userInfo.mobile = additionalInfo.mobile || null;
  //       this.userInfo.website = additionalInfo.website || "";
  //       this.userInfo.logoUrl = additionalInfo.logoUrl || "";
  //     }
  //   }
  // }

