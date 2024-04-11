import { BaseEntity } from "../../../../../../libs/infra/entities/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { DeviceEntity } from "../../device/entities/device.entity";


@Entity()
export class UserEntity extends BaseEntity {
    @Column()
    username: string

    @Column()
    email: string

    @Column({ default: false })
    emailConfirmed: boolean

    @Column({ nullable: true })
    confirmationCode: string | null

    @Column({ nullable: true })
    passwordRecoveryCode: string | null

    @Column()
    passwordSalt: string

    @Column()
    passwordHash: string

    @OneToMany(() => DeviceEntity, device => device.user)
    devices: DeviceEntity[]
}