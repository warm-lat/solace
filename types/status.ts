export interface Status {
    shards: Shards[];
    totalGuilds: number;
    totalUsers: number;
    totalShards: number;
    avgPing: number;
    uptime: number;
}

export interface Shards {
    id: number;
    guilds: number;
    users: number;
    ping: number;
    status: string;
}