import { IUserBalance, IUser } from "@/shared/interfaces/user-interface";

export type UserState = {
  //User states
  userBalance: IUserBalance | null;
  userInfo: IUser | null;

  // IUser Set
  setUserBalance: (balance: IUserBalance | null) => void;
  setUserInfo: (userInfo: IUser | null) => void;

  // Actions
  updateUserBalance: (balance: IUserBalance) => void;
};

export const createUserSlice = (
  set: (partial: Partial<UserState>) => void,
  get: () => UserState
) => ({
  // state definition
  userBalance: null as IUserBalance | null,
  userInfo: null as IUser | null,

  // set function
  setUserBalance: (balance: IUserBalance | null) => {
    set({ userBalance: balance });
  },
  setUserInfo: (userInfo: IUser | null) => {
    set({ userInfo: userInfo });
  },

  // Actions implement
  updateUserBalance: (balance: IUserBalance) => {
    const currentBalance = get().userBalance;
    if (currentBalance) {
      if (currentBalance.userId === balance.userId) {
        set({
          userBalance: {
            ...currentBalance,
            balance: balance.balance,
          },
        });
      }
    }
  },
});
