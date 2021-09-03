export const formValidation = (body: any) => {
  for (const [, value] of Object.entries(body)) {
    if (!value) {
      return false;
    }
  }
  return true;
};
