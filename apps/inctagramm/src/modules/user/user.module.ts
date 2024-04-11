import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserUseCase } from "./use-cases/create/create-user.use-case";
import { UserRepository } from "./repository/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        CreateUserUseCase,
        UserRepository
    ],
    exports: [
        CreateUserUseCase,
        UserRepository
    ]
})
export class UserModule { }