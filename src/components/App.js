import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import deepForceUpdate from 'react-deep-force-update';

// Constants
import { googleMapAPI } from '../config';
// Helpers
import { loadScriptAsync } from '../helpers/loadAsyncScripts';
import { StripeProvider } from 'react-stripe-elements';
import { payment } from '../config';
// Actions
import { setLocaleByIP } from '../actions/setLocaleByIP';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.any.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    getState: PropTypes.any.isRequired,
  }).isRequired,
  // Apollo Client
  client: PropTypes.object.isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      stripe: null
    }

  }

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  componentWillMount() {
  if (typeof window === 'undefined') {
    return;
  }

  const googleMaps = (window.google) && (window.google.maps);
  if (!googleMaps) {
    const getGoogleMapsAPIUrl = key => `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`
    const initGoogleMapsAPI = () => loadScriptAsync(getGoogleMapsAPIUrl(googleMapAPI));
    return;
  }
  }

  componentDidMount() {

    const store = this.props.context && this.props.context.store;

    if (store) {
      
      // -- Check if language is already defined in cookies
      console.log("Got default lang: ", document.cookie, !/lang=([a-zA-Z\-]*)/.test(document.cookie));
      if (!/lang=([a-zA-Z\-]*)/.test(document.cookie)) {
        store.dispatch(setLocaleByIP());
      }

      this.unsubscribe = store.subscribe(() => {
        const state = store.getState();
        const newIntl = state.intl;
        if (this.intl !== newIntl) {
          this.intl = newIntl;
          if (__DEV__) {
            // eslint-disable-next-line no-console
            //console.log('Intl changed — Force rendering');
          }

          deepForceUpdate(this);
        }
      });
    }

    var el = document.getElementById('load');

    // Stripe
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(payment.stripe.publishableKey) });
    } else {
      if(el) {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({ stripe: window.Stripe(payment.stripe.publishableKey) });
        });
      }     
    }

    this.setState({
      load: true
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    const store = this.props.context && this.props.context.store;
    const state = store && store.getState();
    this.intl = (state && state.intl) || {};
    const { initialNow, locale, messages } = this.intl;
    const localeMessages = (messages && messages[locale]) || {};
    const { load } = this.state;

    if (load) {
      return (
        <StripeProvider stripe={this.state.stripe}>
          <IntlProvider
            initialNow={initialNow}
            locale={locale}
            messages={localeMessages}
            defaultLocale="en-US"
          >
            {Children.only(this.props.children)}
          </IntlProvider>
        </StripeProvider>
      );
    } else {
      return (
        <StripeProvider stripe={this.state.stripe}>
          <IntlProvider
            initialNow={initialNow}
            locale={locale}
            messages={localeMessages}
            defaultLocale="en-US"
          >
            {Children.only(this.props.children)}
          </IntlProvider>
        </StripeProvider>
      );
    }
  }

}

export default App;
