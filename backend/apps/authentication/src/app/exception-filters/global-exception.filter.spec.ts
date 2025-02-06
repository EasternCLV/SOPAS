import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './global-exception.filter';

describe('GlobalExceptionFilter', () => {
  it('should be defined', () => {
    expect(new GlobalExceptionFilter()).toBeDefined();
  });
});
