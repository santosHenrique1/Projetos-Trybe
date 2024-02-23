type ErrorResponse = {
  status: 'UNAUTHORIZED' | 'NOT_FOUND' | 'BAD_REQUEST',
  data: { message: string },
    
};
  
type SuccessResponse<T> = {
  status: 'SUCCEFULL',
  data: T,
    
};
  
export type ServiceResponse<T> = ErrorResponse | SuccessResponse<T>;