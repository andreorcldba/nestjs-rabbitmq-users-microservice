export function formatHttpResponse(statusCode: number, message: string[], response: any) {
  return {
    statusCode,
    message,
    response
  };
}

export function removeJsonKey(json: any) {
  
}