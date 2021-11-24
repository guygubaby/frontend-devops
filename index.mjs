import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import appRoot from 'app-root-path'

const tryMkdirSync = (dir) => {
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir, { recursive: true })
}

const tryCopyFile = (src, dest) => {
  const existed = fs.existsSync(dest)
  if(existed) return
  fs.copyFileSync(src, dest)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TargetFolders = ['devops', 'scripts']

const FilenameToPath = {
  'Dockerfile': 'devops/Dockerfile',
  'nginx.conf': 'devops/nginx.conf',
  'pre-build.mjs': 'scripts/pre-build.mjs',
  'dockerignore': '.dockerignore',
}

const bootstrap = () => {
  const appPath = appRoot.path
  const appname = path.basename(appPath)

  if(appname==='frontend-devops') return // in current project folder, skip

  for (const folder of TargetFolders) { 
    tryMkdirSync(path.resolve(appPath, folder))
  }

  const rawPath = path.resolve(__dirname, './raw')

  for(const file of fs.readdirSync(rawPath)) {
    const srcFile = path.resolve(rawPath, file)
    const targetPath = path.resolve(appPath, FilenameToPath[file])
    tryCopyFile(srcFile, targetPath)
  }

  console.log('frontend-devops preflight finished ~');
}

try {
  bootstrap()
}
catch (error) {
  console.log('devops util error: ', error)
  process.exit(-1)
}
