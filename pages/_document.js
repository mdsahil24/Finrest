import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Favicon */}
          <link rel="icon" href="/logo.png" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
