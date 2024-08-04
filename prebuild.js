import { execSync } from 'child_process'

const platform = process.platform

try {
  if (platform === 'win32') {
    execSync(
      'powershell -Command "(Get-Content .\\node_modules\\.pnpm\\node_modules\\@iconify\\utils\\package.json) | Where-Object {$_ -notmatch \'"\\\\./\\\\*": "\\\\./\\\\*",\' } | Set-Content .\\node_modules\\.pnpm\\node_modules\\@iconify\\utils\\package.json"',
      { stdio: 'inherit' }
    )
  } else {
    execSync('sed -i \'/"\\.\\/\\*": "\\.\\/\\*",/d\' ./node_modules/.pnpm/node_modules/@iconify/utils/package.json', {
      stdio: 'inherit',
    })
  }

  execSync('nuxt build', { stdio: 'inherit' })
} catch (error) {
  console.error('An error occurred:', error)
  process.exit(1)
}
