import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { currentUser } from 'src/modules/decorators/current-user.decorator';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new UnauthorizedException();
            }
            try {
                const payload = await this.jwt.verifyAsync(
                    token,
                    {
                        secret: 'key'
                    }
                );
                const user = (await this.userService.findOne(payload.id)).user
                request.currentUser = user
            } catch {
                throw new UnauthorizedException();
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}