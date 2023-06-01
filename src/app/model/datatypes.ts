import { SafeUrl } from "@angular/platform-browser";

export interface login {
  email: string;
  password: string;
}
export interface doctorFilter {
  name: string;
  options: string[];
  defaultValue: string;
}
export interface doctor {
  userName: string;
  specialization: string;
  level: string;
  superFactor: number;
  phoneNumber: number;
  isVerified: boolean;
  referedBy: string;
  createdAt: string;
}

export interface fileHandle{
  file:File,
  url:SafeUrl
}
