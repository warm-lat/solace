export interface Status {
    shards: Shards[];
    total_guilds: number;
    total_users: number;
    total_shards: number;
    avg_ping: number;
    uptime: number;
}

export interface Shards {
    id: number;
    guilds: number;
    users: number;
    ping: number;
    status: string;
}