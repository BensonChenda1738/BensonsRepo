export declare class SecurityService {
    private redis;
    constructor();
    generateToken(payload: any): Promise<string>;
    verifyToken(token: string): Promise<boolean>;
}
