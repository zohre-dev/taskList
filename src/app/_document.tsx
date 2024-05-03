import { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React, { Fragment } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // componentDidMount(): void {
  //   ;(window as any).RAYCHAT_TOKEN = '456053a8-bae0-4e79-b1a6-f01346b68421'
  // }

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <Fragment key={initialProps.html.length}>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="fa-IR">
        <Head>
          <meta charSet="utf-8" className="next-head"></meta>
          {/* <meta name="enamad" content="427084" /> */}
          {/* <meta name="theme-color" content="#fff" /> */}
          <link rel="shortcut icon" href="/assets/images/common/LogoCompany.svg" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
