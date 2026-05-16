import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repository-Name hier eintragen, dann liegt die App unter:
// https://<user>.github.io/<REPO_NAME>/
// Falls die Seite unter einer eigenen Domain liegt, base auf '/' setzen.
const REPO_NAME = 'glocke-mittwelt'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
}))
