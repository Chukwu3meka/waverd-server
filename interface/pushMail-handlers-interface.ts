export interface PushMail {
  subject: string;
  address: string;
  data?: object;
  account: "noreply" | "accounts" | "contactus" | "founder";
  template: "welcome" | "failedLogin" | "lockNotice" | "reVerifyEmail" | "successfulLogin" | "initiatePasswordReset" | "confirmPasswordReset" | "dataDeletion";
}
