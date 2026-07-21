/**
 * Returns the correct profile path for a given user.
 * Own account always uses the main /profile page.
 * Other users use /profile/:userId (public community profile).
 */
export function getProfilePath(targetUserId: string | undefined | null, currentUserId?: string | null): string {
  if (!targetUserId) return '/profile'
  if (currentUserId && String(targetUserId) === String(currentUserId)) {
    return '/profile'
  }
  return `/profile/${targetUserId}`
}

/**
 * Checks if a profile userId refers to the currently logged-in account.
 */
export function isOwnProfile(targetUserId: string | undefined | null, currentUserId?: string | null): boolean {
  if (!targetUserId || !currentUserId) return false
  return String(targetUserId) === String(currentUserId)
}
