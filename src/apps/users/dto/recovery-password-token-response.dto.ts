import { ApiProperty } from '@nestjs/swagger';
import { MessageResponseDto } from 'src/apps/shared/dtos/message-response.dto';

export class GetTokenForRecoveryPasswordTokenResponseDto extends MessageResponseDto {
  @ApiProperty()
  recovery_password_token: string;
}
