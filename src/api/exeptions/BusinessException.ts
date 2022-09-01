import HttpException from './HttpException';

export default class BusinessException extends HttpException {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
