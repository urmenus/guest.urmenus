import { projects as _projects } from '@/.temp/PROJECT'
import type { Project } from '@/types'

export default defineEventHandler(async (ev) => {
  const slug = getRouterParam(ev, 'slug') ?? ''

  const projects: Project[] = _projects

  const project = projects.find(({ slug: s }) => s === slug.toLowerCase())

  // const q = new Promise((r) => setTimeout(r, Math.floor(Math.random() * (3000 - 500 + 1)) + 500))
  // await q

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: `Project "${slug}" - Not found` })
  }
  return project

  // if (!Object.hasOwn(projects, title)) {
  // throw createError({ statusCode: 404, statusMessage: `Project "${title}" - Not found` })
  // }
  // return projects[title]
})
