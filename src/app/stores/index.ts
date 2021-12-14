import AuthStore from './Auth/auth.store';

const authStore = new AuthStore();

export const useStore = () => {
  return { authStore };
};
