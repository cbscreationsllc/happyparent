import { create } from "zustand";

const useMainStore = create((set, get) => ({
  user: null,
  bodyBackground: "#fff",
  currentScreen: 1,
  onboardScreen: 1,
  mainScreen: 1,
  settingsScreen: 1,
  subscriptionScreen: 1,
  affiliateModalOpen: false,
  subscriptionModalOpen: false,
  settingsModalOpen: false,
  sidebarOpen: false,
  title: "",
  showLearnMore: false,
  showEmailModal: false,
  code: "",
  setCurrentScreen: (currentScreen) => {
    set({ currentScreen });
  },
  setOnboardScreen: (onboardScreen) => {
    set({ onboardScreen });
  },
  setBodyBackground: (bodyBackground) => {
    set({ bodyBackground });
  },
  setAffiliateModalOpen: (affiliateModalOpen) => {
    set({ affiliateModalOpen });
  },
  setSubscriptionModalOpen: (subscriptionModalOpen) => {
    set({ subscriptionModalOpen });
  },
  setSettingsModalOpen: (settingsModalOpen) => {
    set({ settingsModalOpen });
  },
  setUser: (user) => {
    set({ user });
  },
  setSubscriptionScreen: (subscriptionScreen) => {
    set({ subscriptionScreen });
  },
  setMainScreen: (mainScreen) => {
    set({ mainScreen });
  },
  setSettingsScreen: (settingsScreen) => {
    set({ settingsScreen });
  },
  setSidebarOpen: (sidebarOpen) => {
    set({ sidebarOpen });
  },
  setTitle: (title) => {
    set({ title });
  },
  setShowLearnMore: (showLearnMore) => {
    set({ showLearnMore });
  },
  setShowEmailModal: (showEmailModal) => {
    set({ showEmailModal });
  },
  setCode: (code) => {
    set({ code });
  },
  resetVals: () => {
    set({
      user: null,
      currentScreen: 1,
      onboardScreen: 1,
      mainScreen: 1,
      settingsScreen: 1,
      subscriptionScreen: 1,
      affiliateModalOpen: false,
      subscriptionModalOpen: false,
      settingsModalOpen: false,
      sidebarOpen: false,
      showLearnMore: false,
      code: "",
    });
  },
}));

export default useMainStore;
