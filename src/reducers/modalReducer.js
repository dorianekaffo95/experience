import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_LANGUAGE_SWITCHER_MODAL,
  CLOSE_LANGUAGE_SWITCHER_MODAL,
  OPEN_CURRENCY_SWITCHER_MODAL,
  CLOSE_CURRENCY_SWITCHER_MODAL,
  OPEN_WISH_LIST_GROUP_MODAL,
  CLOSE_WISH_LIST_GROUP_MODAL,
  OPEN_WISH_LIST_MODAL,
  CLOSE_WISH_LIST_MODAL,
  OPEN_REPORT_USER_MODAL,
  CLOSE_REPORT_USER_MODAL,
  OPEN_THANK_YOU_MODAL,
  CLOSE_THANK_YOU_MODAL,
  OPEN_SMS_VERIFICATION_MODAL,
  CLOSE_SMS_VERIFICATION_MODAL,
  OPEN_BOOKING_MODAL,
  CLOSE_BOOKING_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL,
} from "../constants";

export default function modalStatus(state = {}, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen,
        isSignupModalOpen: action.isSignupModalOpen,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
      };

    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isSignupModalOpen: action.isSignupModalOpen,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case CLOSE_SIGNUP_MODAL:
      return {
        ...state,
        isSignupModalOpen: action.isSignupModalOpen,
      };

    case OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
      };

    case OPEN_LANGUAGE_SWITCHER_MODAL:
      return {
        ...state,
        isLanguageSwitcherModalOpen: true,
      };

    case CLOSE_LANGUAGE_SWITCHER_MODAL:
      return {
        ...state,
        isLanguageSwitcherModalOpen: false,
      };

    case OPEN_CURRENCY_SWITCHER_MODAL:
      return {
        ...state,
        isCurrencySwitcherModalOpen: true,
      };

    case CLOSE_CURRENCY_SWITCHER_MODAL:
      return {
        ...state,
        isCurrencySwitcherModalOpen: false,
      };

    case OPEN_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: true,
      };

    case CLOSE_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: false,
      };

    case OPEN_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: action.payload.wishListModalOpen,
        listId: action.payload.listId,
      };

    case CLOSE_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: false,
      };
    case OPEN_REPORT_USER_MODAL:
      return {
        ...state,
        isReportUserModalOpen: action.payload.isReportUserModalOpen,
      };
    case CLOSE_REPORT_USER_MODAL:
      return {
        ...state,
        isReportUserModalOpen: action.payload.isReportUserModalOpen,
      };
    case OPEN_THANK_YOU_MODAL:
      return {
        ...state,
        isThankYouModalOpen: action.payload.isThankYouModalOpen,
      };
    case CLOSE_THANK_YOU_MODAL:
      return {
        ...state,
        isThankYouModalOpen: action.payload.isThankYouModalOpen,
      };

    case OPEN_SMS_VERIFICATION_MODAL:
      return {
        ...state,
        smsVerificationModalOpen: action.payload.smsVerificationModalOpen,
        formType: action.payload.formType,
      };

    case CLOSE_SMS_VERIFICATION_MODAL:
      return {
        ...state,
        smsVerificationModalOpen: false,
        formType: undefined,
      };

    case OPEN_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: true,
      };

    case CLOSE_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: false,
      };

    case OPEN_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModal: action.payload.isSocialShareModal,
      };
    case CLOSE_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModal: action.payload.isSocialShareModal,
      };

    default:
      return {
        ...state,
      };
  }
}
