import { Command, Positional } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { buildJsonCreateUserAdmin } from '../builders/user.build';

@Injectable()
export class UsersCommand {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Command({
    command: 'create:super_admin <email> <password>',
    describe: 'Crear un usuario admin.',
  })
  async create(
    @Positional({
      name: 'email',
      describe: 'correo de la cuenta',
      type: 'string',
    })
    email: string,
    @Positional({
      name: 'password',
      describe: 'contraseña de la cuenta',
      type: 'string',
    })
    password: string,
  ) {
    if (!email || !password)
      throw new Error('los campos email y password son requeridos');
    const userAdmin = await buildJsonCreateUserAdmin(email, password);
    await this.usersService.createUser(userAdmin);
    this.logger.log('USUARIO SUPER ADMIN CREADO CON EXITO!!!!!!!!!!');
  }
}
