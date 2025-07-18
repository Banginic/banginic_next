import bcrypt from 'bcrypt';


export async function  hashPassword(password: string): Promise<string>{
    return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, DB_password: string): Promise<boolean>{
    return bcrypt.compare(password, DB_password)
}