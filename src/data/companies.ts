export interface Company {
  id: string;
  name: string;
  logo: string;
}

export interface CompanyProblem {
  companyId: string;
  problemId: number;
  frequency: "Low" | "Medium" | "High";
}

export const companies = [
  {
    id: "adobe",
    name: "Adobe",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGi3bGlZIlF6Xb68v1zu6gWQCanQIJlIZGj5HDbC7nA7A0-YVcH3sS2pPWr3Is8s3p0qA&usqp=CAU",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png",
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmITD-lgTwN7sjF4EoXeKMF_1NrLhZBcilag&s",
  },
  {
    id: "google",
    name: "Google",
    logo: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
  },
  {
    id: "facebook",
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
  },

  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
  },

  {
    id: "twitter",
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
  },

  {
    id: "uber",
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
  },
];

export const companyProblems: CompanyProblem[] = [
  // Google
  { companyId: "google", problemId: 1, frequency: "Medium" },
  { companyId: "google", problemId: 4, frequency: "High" },
  { companyId: "google", problemId: 12, frequency: "High" },
  { companyId: "google", problemId: 17, frequency: "Medium" },
  { companyId: "google", problemId: 29, frequency: "Medium" },
  { companyId: "google", problemId: 42, frequency: "High" },
  { companyId: "google", problemId: 53, frequency: "Medium" },
  { companyId: "google", problemId: 71, frequency: "Medium" },
  { companyId: "google", problemId: 80, frequency: "High" },
  { companyId: "google", problemId: 95, frequency: "Medium" },

  // Meta
  { companyId: "meta", problemId: 3, frequency: "High" },
  { companyId: "meta", problemId: 12, frequency: "High" },
  { companyId: "meta", problemId: 16, frequency: "High" },
  { companyId: "meta", problemId: 19, frequency: "Medium" },
  { companyId: "meta", problemId: 37, frequency: "Medium" },
  { companyId: "meta", problemId: 52, frequency: "Medium" },
  { companyId: "meta", problemId: 73, frequency: "Medium" },
  { companyId: "meta", problemId: 80, frequency: "High" },
  { companyId: "meta", problemId: 87, frequency: "Medium" },
  { companyId: "meta", problemId: 98, frequency: "Medium" },

  // Amazon
  { companyId: "amazon", problemId: 2, frequency: "Medium" },
  { companyId: "amazon", problemId: 13, frequency: "High" },
  { companyId: "amazon", problemId: 21, frequency: "Medium" },
  { companyId: "amazon", problemId: 35, frequency: "Medium" },
  { companyId: "amazon", problemId: 43, frequency: "High" },
  { companyId: "amazon", problemId: 46, frequency: "Medium" },
  { companyId: "amazon", problemId: 68, frequency: "High" },
  { companyId: "amazon", problemId: 80, frequency: "High" },
  { companyId: "amazon", problemId: 93, frequency: "Medium" },
  { companyId: "amazon", problemId: 98, frequency: "High" },

  // Microsoft
  { companyId: "microsoft", problemId: 3, frequency: "High" },
  { companyId: "microsoft", problemId: 11, frequency: "Medium" },
  { companyId: "microsoft", problemId: 21, frequency: "Medium" },
  { companyId: "microsoft", problemId: 36, frequency: "Medium" },
  { companyId: "microsoft", problemId: 46, frequency: "Medium" },
  { companyId: "microsoft", problemId: 53, frequency: "Medium" },
  { companyId: "microsoft", problemId: 59, frequency: "Medium" },
  { companyId: "microsoft", problemId: 80, frequency: "High" },
  { companyId: "microsoft", problemId: 87, frequency: "Medium" },
  { companyId: "microsoft", problemId: 93, frequency: "Medium" },

  // Apple
  { companyId: "apple", problemId: 1, frequency: "Medium" },
  { companyId: "apple", problemId: 12, frequency: "Medium" },
  { companyId: "apple", problemId: 15, frequency: "High" },
  { companyId: "apple", problemId: 21, frequency: "Medium" },
  { companyId: "apple", problemId: 32, frequency: "Medium" },
  { companyId: "apple", problemId: 46, frequency: "Medium" },
  { companyId: "apple", problemId: 53, frequency: "Medium" },
  { companyId: "apple", problemId: 71, frequency: "Medium" },
  { companyId: "apple", problemId: 80, frequency: "Medium" },
  { companyId: "apple", problemId: 93, frequency: "Medium" },

  // Netflix
  { companyId: "netflix", problemId: 4, frequency: "Medium" },
  { companyId: "netflix", problemId: 16, frequency: "High" },
  { companyId: "netflix", problemId: 32, frequency: "Medium" },
  { companyId: "netflix", problemId: 42, frequency: "Medium" },
  { companyId: "netflix", problemId: 53, frequency: "Medium" },
  { companyId: "netflix", problemId: 68, frequency: "High" },
  { companyId: "netflix", problemId: 80, frequency: "Medium" },
  { companyId: "netflix", problemId: 87, frequency: "Medium" },
  { companyId: "netflix", problemId: 93, frequency: "Medium" },
  { companyId: "netflix", problemId: 98, frequency: "Medium" },

  // Uber
  { companyId: "uber", problemId: 3, frequency: "High" },
  { companyId: "uber", problemId: 13, frequency: "Medium" },
  { companyId: "uber", problemId: 29, frequency: "Medium" },
  { companyId: "uber", problemId: 42, frequency: "Medium" },
  { companyId: "uber", problemId: 53, frequency: "Medium" },
  { companyId: "uber", problemId: 66, frequency: "High" },
  { companyId: "uber", problemId: 80, frequency: "Medium" },
  { companyId: "uber", problemId: 85, frequency: "High" },
  { companyId: "uber", problemId: 93, frequency: "Medium" },
  { companyId: "uber", problemId: 98, frequency: "Medium" },

  // Twitter
  { companyId: "twitter", problemId: 4, frequency: "Medium" },
  { companyId: "twitter", problemId: 16, frequency: "Medium" },
  { companyId: "twitter", problemId: 21, frequency: "Medium" },
  { companyId: "twitter", problemId: 35, frequency: "Medium" },
  { companyId: "twitter", problemId: 53, frequency: "Medium" },
  { companyId: "twitter", problemId: 71, frequency: "Medium" },
  { companyId: "twitter", problemId: 80, frequency: "Medium" },
  { companyId: "twitter", problemId: 87, frequency: "Medium" },
  { companyId: "twitter", problemId: 93, frequency: "Medium" },
  { companyId: "twitter", problemId: 98, frequency: "Medium" },

  // Airbnb
  { companyId: "airbnb", problemId: 3, frequency: "High" },
  { companyId: "airbnb", problemId: 12, frequency: "Medium" },
  { companyId: "airbnb", problemId: 21, frequency: "Medium" },
  { companyId: "airbnb", problemId: 42, frequency: "Medium" },
  { companyId: "airbnb", problemId: 53, frequency: "Medium" },
  { companyId: "airbnb", problemId: 66, frequency: "Medium" },
  { companyId: "airbnb", problemId: 71, frequency: "High" },
  { companyId: "airbnb", problemId: 80, frequency: "Medium" },
  { companyId: "airbnb", problemId: 93, frequency: "Medium" },
  { companyId: "airbnb", problemId: 98, frequency: "Medium" },

  // LinkedIn
  { companyId: "linkedin", problemId: 2, frequency: "Medium" },
  { companyId: "linkedin", problemId: 12, frequency: "Medium" },
  { companyId: "linkedin", problemId: 21, frequency: "Medium" },
  { companyId: "linkedin", problemId: 35, frequency: "Medium" },
  { companyId: "linkedin", problemId: 46, frequency: "Medium" },
  { companyId: "linkedin", problemId: 53, frequency: "High" },
  { companyId: "linkedin", problemId: 71, frequency: "Medium" },
  { companyId: "linkedin", problemId: 80, frequency: "Medium" },
  { companyId: "linkedin", problemId: 87, frequency: "High" },
  { companyId: "linkedin", problemId: 98, frequency: "Medium" },
];

// Function to get problems by company
export function getProblemsByCompany(companyId: string): CompanyProblem[] {
  return companyProblems.filter((cp) => cp.companyId === companyId);
}
