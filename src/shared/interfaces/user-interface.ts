export interface IUserBalance {
  userId: number;
  balance: number;
  currency: string;
  totalIncome: number;
  totalExpense: number;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IAuthValidationResponse {
  isValid: boolean;
  user: IUser;
}

export interface IUser {
  userId: number;
  registrationDate: string; // ISO string format
  lastAccessed: string;
  isActive: boolean;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fullName: string;
  email: string;
  profilePicture: string;
}

export interface IUserProfile extends IUser {
  total_points?: number | null;
  lives?: number | null;
  completedLessons?: number | null;
  totalLessons?: number | null;
}
