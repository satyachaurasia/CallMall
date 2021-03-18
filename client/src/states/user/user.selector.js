import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectFetching = createSelector(
  [selectUser],
  (user) => user.fetching
);

export const selectPhoneBooks = createSelector(
  [selectUser],
  (user) => user.phoneBooks
);

export const selectContacts = createSelector(
  [selectUser],
  (user) => user.contacts
);

export const selectAutoDialer = createSelector(
  [selectUser],
  (user) => user.autoDialer
);

export const selectCallRecord = createSelector(
  [selectUser],
  (user) => user.callRecord
);
