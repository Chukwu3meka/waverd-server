export interface MitigateProfileBruteForce {
  profile: any;
  password: string | false;
}

export interface RequestHasBody {
  required: string[];
  sendError?: boolean;
  body: { [key: string]: any };
}
