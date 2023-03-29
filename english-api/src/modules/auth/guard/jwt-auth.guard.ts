import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(
    error: Error,
    user: any,
    info: string,
    context: ExecutionContext,
  ): any {
    if (!user) {
      throw new HttpException(
        'Authentication token is missing.',
        HttpStatus.FORBIDDEN,
      );
    }

    const className = context.getClass().name;
    const method = context.switchToHttp().getRequest<Request>().method;

    const userAfterCheckPermission = user.role.permissions.find(
      (permission) =>
        permission.descriptor === className && permission.method === method,
    );

    if (!userAfterCheckPermission) {
      throw new HttpException('Not enough permissions.', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
