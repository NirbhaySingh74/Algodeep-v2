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
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png",
  },
  {
    id: "adobe",
    name: "Adobe",
    logo: "data:image/jpeg;base64,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",
  },
  {
    id: "uber",
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
  },
  {
    id: "twitter",
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png",
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmITD-lgTwN7sjF4EoXeKMF_1NrLhZBcilag&s",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png",
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
