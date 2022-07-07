import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UtilUser } from '../utils/index.util';

@Injectable()
export class PasswordEncryptCommand {
  @Command({
    command: 'password:encrypt <password>',
    describe: 'Encriptar una contraseña.',
  })
  async create(
    @Positional({
      name: 'password',
      describe: 'contraseña de la cuenta',
      type: 'string',
    })
    password: string,
  ) {
    const passwordEncrypt = await new UtilUser().getPasswordEncript(password);
    console.log({ password, passwordEncrypt });
  }
}
