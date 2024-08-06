import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
El uso principal del LocalAuthGuard es en el proceso de inicio de sesión, 
donde necesitas validar las credenciales del usuario. Proteges la ruta de login 
con este guard para asegurarte de que solo los usuarios con credenciales válidas 
puedan autenticarse.
*/

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
