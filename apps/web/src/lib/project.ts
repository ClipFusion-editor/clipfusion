import { getUUID } from "./uuid";

export class Project {
    name: string;
    uuid: string;

    constructor() {
        this.name = "New ClipFusion Project";
        this.uuid = getUUID();
    }
};