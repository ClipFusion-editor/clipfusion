import { getUUID } from "@/lib/uuid";

export default class Project {
    name: string;
    uuid: string;
    creationDate?: number;
    lastEditDate?: number;

    constructor(init?: Partial<Project>) {
        this.name = "New ClipFusion Project";
        this.uuid = getUUID();
        Object.assign(this, init);
    }

};