import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      {
        title: 'Filbert Christian Winch | Full-Stack Engineer & ML Researcher',
      },
      {
        name: 'description',
        content:
          'Portfolio of Filbert Christian Winch: full-stack engineer and ML researcher. Go, TypeScript, NestJS, Spring Boot, Python, DevOps. 3+ commercial projects shipped.',
      },
      {
        name: 'author',
        content: 'Filbert Christian Winch',
      },
      {
        property: 'og:title',
        content: 'Filbert Christian Winch | Full-Stack Engineer & ML Researcher',
      },
      {
        property: 'og:description',
        content:
          'Full-stack engineer and ML researcher. 3+ commercial projects shipped.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'theme-color',
        content: '#F6F1E4',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23161614%22/><text x=%2250%22 y=%2268%22 font-size=%2250%22 font-weight=%22800%22 text-anchor=%22middle%22 fill=%22%23FAF8F2%22 font-family=%22monospace%22>FW</text></svg>',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+JP:wght@500;600&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return <Outlet />
}
