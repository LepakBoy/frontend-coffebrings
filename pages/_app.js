import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store, persistor } from "stores/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>Coffee Brings</title>

            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="../assets/images/coffee 1.png" />
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
