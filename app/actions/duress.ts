import type { AppGroup, AppPersona } from '../types.js'
import type { DuressScope } from 'canary-kit/beacon'
import { findById } from '../persona-tree.js'

/**
 * Get target groups for a duress alert based on scope.
 * Pure function — testable independently.
 *
 * Groups whose persona is archived are always excluded from fan-out,
 * even if they would otherwise match the scope.
 */
export function getTargetGroups(
  groups: Record<string, AppGroup>,
  originGroupId: string,
  scope: DuressScope,
  personas: Record<string, AppPersona> = {},
): AppGroup[] {
  const origin = groups[originGroupId]
  if (!origin) return []

  let targets: AppGroup[]

  switch (scope) {
    case 'group':
      targets = [origin]
      break
    case 'persona':
      targets = Object.values(groups).filter(g => g.personaId === origin.personaId)
      break
    case 'master':
      targets = Object.values(groups)
      break
  }

  return targets.filter(g => {
    if (!g.personaId) return true
    const found = findById(personas, g.personaId)
    return !found?.persona.archived
  })
}
