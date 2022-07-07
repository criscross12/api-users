import { Command } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import ROLE_JSON from 'src/apps/shared/static/roles.json';
import { RolesService } from '../services/roles.service';
import { RolesServiceApp } from '../apps/roles.service';

@Injectable()
export class RolesCommand {
  constructor(
    private readonly rolesServiceApp: RolesServiceApp,
    private readonly rolesService: RolesService,
    private readonly logger: Logger,
  ) {}

  @Command({
    command: 'create:roles',
    describe: 'Crear roles.',
  })
  async create() {
    const roles = ROLE_JSON.Roles;
    await this.rolesService.destroyRole();
    for (let i = 0; i < roles.length; i++) {
      await this.rolesServiceApp.createRole(roles[i]);
    }
    this.logger.log('ROLES INSERTADOS EXITOSAMENTE!!!!!!!!!!');
  }
}
