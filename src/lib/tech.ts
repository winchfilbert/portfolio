/** Brand logos live in public/tech/<file>.svg (from the open-source Devicon set). */
const ALIASES: Record<string, string> = {
  go: 'go', golang: 'go',
  typescript: 'typescript', typescriptjavascript: 'typescript', javascript: 'javascript', js: 'javascript', ts: 'typescript',
  react: 'react', reactjs: 'react',
  nestjs: 'nestjs', nest: 'nestjs',
  springboot: 'spring', spring: 'spring',
  python: 'python',
  postgresql: 'postgresql', postgres: 'postgresql',
  docker: 'docker', dockercompose: 'docker',
  terraform: 'terraform',
  googlecloud: 'googlecloud', gcp: 'googlecloud', googlecloudplatform: 'googlecloud',
  aws: 'amazonwebservices', amazonwebservices: 'amazonwebservices',
  azure: 'azure', microsoftazure: 'azure',
  java: 'java', rust: 'rust', csharp: 'csharp', kotlin: 'kotlin', svelte: 'svelte',
  tailwindcss: 'tailwindcss', tailwind: 'tailwindcss',
  tauri: 'tauri', express: 'express', expressjs: 'express',
  redis: 'redis', rabbitmq: 'rabbitmq', prisma: 'prisma',
  linux: 'linux', linuxserver: 'linux', nginx: 'nginx', ansible: 'ansible',
  prometheus: 'prometheus', grafana: 'grafana',
  tensorflow: 'tensorflow', pytorch: 'pytorch',
  github: 'github', githubactions: 'githubactions',
  kubernetes: 'kubernetes', k8s: 'kubernetes',
  nodejs: 'nodejs', node: 'nodejs', mysql: 'mysql', mongodb: 'mongodb', git: 'git',
  cplusplus: 'cplusplus', cpp: 'cplusplus', c: 'c',
}

/** Logo file name (without extension) for a skill label, or undefined if we have none. */
export function techLogo(label: string): string | undefined {
  const key = label.toLowerCase().replace(/#/g, 'sharp').replace(/\+\+/g, 'plusplus').replace(/\+/g, 'plus').replace(/[^a-z0-9]/g, '')
  return ALIASES[key]
}
