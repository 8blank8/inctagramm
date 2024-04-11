import { Test } from "@nestjs/testing"
import { TypeOrmModule } from "@nestjs/typeorm"
import { primaryPostgresConnectionOptions } from "../infra/postgres-ormconfig"
import { UserEntity } from "../../apps/inctagramm/src/modules/user/entities/user.entity"
import { CreateUserUseCase } from "../../apps/inctagramm/src/modules/user/use-cases/create/create-user.use-case"
import { RegistrationUserUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/registration/registration-user.use-case"
import { UserRepository } from "../../apps/inctagramm/src/modules/user/repository/user.repository"
import { MailService } from "../mailer/mailer.service"
import { AuthContoller } from "../../apps/inctagramm/src/modules/auth/contoller/auth.controller"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { CustomResultInterceptor } from "../interceptor/custom-result.interceptor"
import { ResendConfirmationCodeUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/confirmation/resend-confirmation-code.use-case"
import { DeviceRepository } from "../../apps/inctagramm/src/modules/device/repository/device.repository"
import { DeviceEntity } from "../../apps/inctagramm/src/modules/device/entities/device.entity"
import { LoginUserUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/login/login.use-case"
import { JwtService } from "@nestjs/jwt"
import { CreateDeviceUseCase } from "../../apps/inctagramm/src/modules/device/use-cases/create/create-device.use-case"
import { ConfirmationUserUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/confirmation/confirmation-user.use-case"
import { SendRecoveryPasswordCodeUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/recovery-password/send-recovery-password-code.use-case"
import { ResetUserPasswordUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/recovery-password/reset-user-password.use-case"
import { LogoutUserUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/logout/logout-user.use-case"
import { RefreshTokenUseCase } from "../../apps/inctagramm/src/modules/auth/use-cases/refresh-token/refresh-token.use-case"

export class MailServiceMock {
    async sendEmailConfirmationMessage(email: string, query: string): Promise<void> {
        console.log(email, query)
        return Promise.resolve();
    }

    async sendEmailPassRecovery(email: string, query: string): Promise<void> {
        console.log(email, query)
        return Promise.resolve();
    }
}

export const CreateTestModule = () => {
    return Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot(primaryPostgresConnectionOptions),
            TypeOrmModule.forFeature([
                UserEntity,
                DeviceEntity
            ])
        ],
        controllers: [
            AuthContoller
        ],
        providers: [
            CreateUserUseCase,
            RegistrationUserUseCase,
            ResendConfirmationCodeUseCase,
            ConfirmationUserUseCase,
            SendRecoveryPasswordCodeUseCase,
            LoginUserUseCase,
            CreateDeviceUseCase,
            ResetUserPasswordUseCase,
            LogoutUserUseCase,
            RefreshTokenUseCase,
            {
                provide: MailService,
                useClass: MailServiceMock,
            },
            {
                provide: APP_INTERCEPTOR,
                useClass: CustomResultInterceptor
            },
            UserRepository,
            DeviceRepository,
            JwtService,
        ]
    })
}