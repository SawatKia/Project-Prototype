export interface Log{
    timestamp: string;
    method: string;
    path: string;
    request?: string;
    Responsestatus: number;// fail or success
}
