import { DEVELOPMENT_CONFIG } from "./profiles/development-config";
import { PRODUCTION_CONFIG } from "./profiles/production-config";

export interface AppConfig {
    weightSymbol: string;
}

const enum EnvType {
    development = 'development',
    production = 'production',
}
const ConfigMap = {
    development: DEVELOPMENT_CONFIG,
    production: PRODUCTION_CONFIG,
}

export function getConfiguration(): AppConfig{
    const a = process.env.REACT_APP_NODE_MODE as EnvType;
    return ConfigMap[a];
}