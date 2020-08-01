import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as crypto from 'crypto';

const USERNAME_ALREADY_EXITS = '23505'

const cryptoConfig = {
    algorithm: 'aes-192-cbc',
    passwordCrypto: 'Password used to generate key',
    salt: 'nestjs-project',
    keyLength: 24,
    inputEncode: 'utf8',
    binaryEncode: 'hex',

}

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password} = authCredentialsDto;
        
        const user = new User();
        user.username = username;
        user.password = this.hashPassword(password);
        
        try {
            await user.save();
        }catch (error) {
            if(error.code == USERNAME_ALREADY_EXITS){ 
                throw new ConflictException('Username already exists')
            }
            throw new InternalServerErrorException();
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username, password: this.hashPassword(password) });
        if (!user) { throw new UnauthorizedException('Inválid credentials') } 
        return username;
    }

    private hashPassword(password: string): string {
        const { algorithm, passwordCrypto, salt, keyLength } = cryptoConfig;

        const key = crypto.scryptSync(passwordCrypto, salt, keyLength);
        const iv = Buffer.alloc(16, 0); // Initialization vector.
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
}