export const errorHelperMessage = (codeErrorHttp: string): string => {
  const message = {
    userNotFound: 'message.user_not_found'
  }[codeErrorHttp];
  return message;
};
