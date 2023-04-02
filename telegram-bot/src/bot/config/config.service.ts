import { config, DotenvParseOutput } from 'dotenv';
import { Config } from './config.interface';

export class ConfigService implements Config {
    private config: DotenvParseOutput;

    constructor() {
        const { error, parsed } = config();

        if (error) {
            throw new Error('.env not found');
        }

        if (!parsed) {
            throw new Error('.env is empty');
        }

        this.config = parsed;
    }

    get(key: string): string | undefined {
        return this.config[key];
    }
}
