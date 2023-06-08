import SessionHelper from "./SessionHelper";

let authorizationLookup = {};
const user = SessionHelper.getUser();

authorizationLookup.application = {
  Admin: { view: true },
  Student: { view: true },
  Head: { view: false },
};

authorizationLookup.vote = {
  Admin: { view: true },
  Student: { view: true },
  Head: { view: false },
};

authorizationLookup.electionSchedule = {
  Admin: { view: true },
  Student: { view: false },
  Head: { view: false },
};

authorizationLookup.resultApprovement = {
  Admin: { view: true },
  Student: { view: false },
  Head: { view: false },
};

authorizationLookup.applicationApprovement = {
  Admin: { view: true },
  Student: { view: false },
  Head: { view: true },
};

authorizationLookup.candidateStatus = {
  Admin: { view: true },
  Student: { view: false },
  Head: { view: false },
};

export function getLookup() {
  return authorizationLookup;
}

export function getViewAuthorizationForAll(roles) {
  let authorization = {};
  for (let i = 0; i < roles?.length; i++) {
    for (let page in authorizationLookup) {
      if (page !== "dashboard") {
        authorization[page] = authorization[page]
          ? true
          : authorizationLookup[page][roles[i]].view;
      }
    }
  }
  return authorization;
}

// export function getAuthorizationForPage(roles, page) {
//   let authorization = {};
//   for (let i = 0; i < roles?.length; i++) {
//     for (let prop in authorizationLookup[page][roles[i]]) {
//       authorization[prop] = authorization[prop]
//         ? true
//         : authorizationLookup[page][roles[i]][prop];
//     }
//   }
//   return authorization;
// }
