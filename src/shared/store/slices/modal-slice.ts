export type ModalState = {
  isRegisterModalVisible: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
};

export const createModalSlice = (
  set: (partial: Partial<ModalState>) => void
): ModalState => ({
  isRegisterModalVisible: false,

  openRegisterModal: () => set({ isRegisterModalVisible: true }),
  closeRegisterModal: () => set({ isRegisterModalVisible: false }),
});
