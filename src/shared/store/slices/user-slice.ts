import { IUserBalance } from "@/shared/interfaces/user-interface";

export type UserState = {
  userBalance: IUserBalance | null;
  setUserBalance: (balance: IUserBalance | null) => void;
  updateUserBalance: (balance: IUserBalance) => void;
};

export const createUserSlice = (
  set: (partial: Partial<UserState>) => void,
  get: () => UserState,
) => ({
  // state definition
  userBalance: null as IUserBalance | null,

  // set function 
  setUserBalance: (balance: IUserBalance | null) => {
    set({ userBalance: balance });
  },

  updateUserBalance: (balance: IUserBalance) => {
    const currentBalance = get().userBalance;
    if (currentBalance) {
      if (currentBalance.userId === balance.userId) {
        set({
          userBalance: {
            ...currentBalance,
            balance: balance.balance,
          }
        });
      }

    }
  }
});