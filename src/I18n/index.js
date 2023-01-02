import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

const translationGetters = {
  en: () => require('./en.json'),
  fr: () => require('./fr.json'),
};
export const translate = memoize((key, config) => i18n.t(key, config));
const en =
{
  home:"Home",
  login:"Login",
  IdentifyToContinue:"Identify yourself to continue",
  email:"email",
  password:"password",
  signin:"Sign in",
  orContinueWith:"Or Continue with",
  forgotYourPassword:"forgot your password ?",
  notRegisterYet:"Not register on khinbo yet?",
  signup:"Sign up",
  male:"Male",
  female:"Female",
  nonBinary:"Non-binary",
  nameTitle:"what's your name",
  emailTitle:"what's your e-mail",
  passwordTitle:"create a password",
  confirmPasswordTitle:"confirm your password",
  passwordValidation:"Minimum length 8 and Must Contain one special Character and number",
  passwordConfirmValidation:"Please confirm your password",
  passwordMustMatched:"Passwords must match",
  createAccount:"create account",
  registerToContinue:"Register to continue",
  country:"Country",
  dob:"date of birth",
  genderTitle:"what's your gender",
  byClickingOnOfTheButtons:"By clicking on one of the buttons above, you agree to",
  terms:"KHINBO's terms and conditions of use.",
  pleaseRead:"Please read",
  privacyPilicy:"KHINBO privacy policy",
  toKnowWeUseData:"to know how KHINBO uses your personal data",
  alreadyHaveAccount:"Alredy have an account?",
  completeProfile:"Complete Your Profile",
  submit:"Submit",
  genresTitle:"GENRE",
  noRecordFound:"No Record Found..",
  recentlyWatched:"Recently Watched",
  justForYou:"Just For You",
  popularVideosIn:"Popular Videos in",
  contentsYouMightBeInterested : "Contents You Might Be Interested",
  onDemand:"ON DEMAND",
  recording: "RECORDING",
  profile:"Profile",
  availablePlans : "Available plans",
  changePassword : "Change password",
  notifications: "Notifications",
  invoices: "Invoices",
  privacy: "Privacy",
  signOut : "Sign out"
}

const fr =
{
  home:"Maison",
  login:"Connexion",
  IdentifyToContinue:"Identifiez-vous pour continuer",
  email:"e-mail",
  password:"le mot de passe",
  signin:"S'identifier",
  orContinueWith:"Ou Continuez avec",
  forgotYourPassword:"Mot de passe oublié ?",
  notRegisterYet:"Pas encore inscrit sur khinbo?",
  signup:"S'inscrire",
  male:"homme",
  female:"Femme",
  nonBinary:"Non binaire",
  nameTitle:"comment tu t'appelles",
  emailTitle:"Quel est ton e-mail",
  passwordTitle:"Créer un mot de passe",
  confirmPasswordTitle:"confirmer votre mot de passe",
  passwordValidation:"Longueur minimale 8 et doit contenir un caractère spécial et un chiffre",
  passwordConfirmValidation:"Veuillez confirmer votre mot de passe",
  passwordMustMatched:"Les mots de passe doivent correspondre",
  createAccount:"créer un compte",
  registerToContinue:"Inscrivez-vous pour continuer",
  country:"Pays",
  dob:"date de naissance",
  genderTitle:"Quel est ton genre",
  byClickingOnOfTheButtons:"En cliquant sur l'un des boutons ci-dessus, vous acceptez",
  terms:"Conditions d'utilisation de KHINBO.",
  pleaseRead:"Lisez s'il vous plaît",
  privacyPilicy:"Politique de confidentialité de KHINBO",
  toKnowWeUseData:"savoir comment KHINBO utilise vos données personnelles",
  alreadyHaveAccount:"Déjà un compte?",
  completeProfile:"Complète ton profil",
  submit:"Soumettre",
  genresTitle:"GENRE",
  noRecordFound:"Aucun Enregistrement Trouvé..",
  recentlyWatched:"Regardé récemment",
  justForYou:"Juste pour toi",
  popularVideosIn:"Vidéos populaires dans",
  contentsYouMightBeInterested : "Contenu qui pourrait vous intéresser",
  onDemand:"À LA DEMANDE",
  recording: "ENREGISTREMENT",
  profile:"Profil",
  availablePlans : "Forfaits disponibles",
  changePassword : "Changer le mot de passe",
  notifications: "Avis",
  invoices: "Factures",
  privacy: "Intimité",
  signOut : "Déconnexion"
}


i18n.translations = {en, fr};
i18n.fallbacks = true

export function lang(key) {
  return i18n.t(key)
}
export function tVal(obj) {
  if (i18n.locale === 'fr') 
    return obj.fr
    return obj.en
}
 export function setLanguage(l) {
  i18n.locale = l;
 }

export const setI18nConfig = lang => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  // clear translation cache
  translate.cache.clear();

  if (lang) {
    i18n.translations = {[lang]: translationGetters[lang]()};
    i18n.locale = lang;
  } else {
    i18n.translations = {['en']: translationGetters.en()};
    i18n.locale = 'en';
  }
};

export const changeLanguage = async lang => {
  setLanguage(lang);
};

export const isRTL = () => {
  return translate('lang') === 'ar' ? true : false;
};
