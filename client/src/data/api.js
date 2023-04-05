const BackEnd = process.env.REACT_APP_BackEndHostLocal;
export const categories_list = [
  "doctor",
  "health care assistant",
  "nurse",
  "pharmacist",
  "pharmacist technician",
  "social care worker",
];
export const counties = [
  "Antrim",
  "Armagh",
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Derry",
  "Donegal",
  "Down",
  "Dublin",
  "Fermangh",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Tyrone",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow",
];

export const user = {
  //returns the list of non admin users
  showUsers: `${BackEnd}/users/get_users`,
  editUser: `${BackEnd}/users/edit_user`,
};
export const approval = {
  //returns the list of non admin users
  showUsers: `${BackEnd}/users/get_users`,
};
export const job = {
  //returns the list of non admin users
  showJobs: `${BackEnd}/jobs/get_jobs`,
  editJob: `${BackEnd}/jobs/edit_job`,
  addJob: `${BackEnd}/jobs/add_job`,
  graphData: `${BackEnd}/jobs/graph_data`,
  groupedData: `${BackEnd}/jobs/grouped_data`,
};
export const branch = {
  //returns the list of non admin users
  showBranches: `${BackEnd}/branches/get_branches`,
  showAllBranches: `${BackEnd}/branches/get_branches`,
  addBranch: `${BackEnd}/branches/add_branch`,
  editBranch: `${BackEnd}/branches/edit_branch`,
};

export const changes = {
  //data : store
  // {
  // 	"store":"Hanis Store"
  // }
  showChanges: `${BackEnd}/change/show_changes`,
};

export const authenticate = {
  //takes in token as http cookie
  //data : [verifyToken]
  verifyAcct: `${BackEnd}/users/verifyAccount/`,

  //takes in password + token as http cookie
  //data : [verifyToken]
  passwordReset: `${BackEnd}/users/passwordReset/`,

  //takes http cookie token and checks if a user is logged in
  //data : requires token to be set - user login
  loggedIn: `${BackEnd}/users/loggedIn`,

  //sends a reset link to specified user email
  //data : email
  forgotPassword: `${BackEnd}/users/forgotPassword`,

  //destroys cookie
  logout: `${BackEnd}/users/logout`,

  //destroys cookie
  addUser: `${BackEnd}/users/add_user`,

  //give logged in user data
  getUserData: `${BackEnd}/users/get_user`,

  //---------
  login: `${BackEnd}/users/login`,
};
