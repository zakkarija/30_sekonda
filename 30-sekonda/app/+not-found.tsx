import WelcomeScreen from '../src/screens/WelcomeScreen';

/**
 * Any unknown URL shows the welcome screen instead of a developer error page.
 * On web this covers mistyped links and hosts that serve the app from a
 * sub-path; on native it is a safe landing spot for stale deep links.
 */
export default WelcomeScreen;
