export function getUserDisplayName(user: any) {
  return user.firstName ? user.name : user.email;
}
