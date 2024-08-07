export interface User {
    name: string;
    email: string;
    id: string;
    authenticated: boolean;
    forcedReset?: boolean;
}