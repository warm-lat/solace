export interface Commands {
    categories: string[];
    commands: Command[];
}

export interface Command {
    name: string;
    description: string;
    aliases: string[];
    parameters: Parameters[] | null;
    category: string;
    permissions: string[];
    donator: boolean;
}

export interface Parameters {
    name: string;
    type: string;
    default?: string;
    flags?: string;
    optional: boolean;
}