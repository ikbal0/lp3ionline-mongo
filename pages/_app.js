import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from "next-auth/react"
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if(Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </LayoutProvider>
    )
  } else {
    return (
      <SessionProvider session={session}>
        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
      </SessionProvider>
    );
  }
}

export default MyApp