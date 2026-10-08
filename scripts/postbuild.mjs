// GitHub Pages is static: serve the SPA shell for / and for any unknown path (deep links like /portfolio/admin).
import { copyFile } from 'node:fs/promises'

await copyFile('dist/client/_shell.html', 'dist/client/index.html')
await copyFile('dist/client/_shell.html', 'dist/client/404.html')
