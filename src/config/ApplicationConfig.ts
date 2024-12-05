import { LooseObject } from "@utils/LooseObject";

export type MorganConfig = {
    format: string;
    logFileLocation: string;
    options?: LooseObject;
};

export type ApplicationOptions = {
    morganConfig: MorganConfig;
};
