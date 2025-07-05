import Dexie, { EntityTable } from "dexie";
import Thumbnail from "./Thumbnail";

export default class ThumbnailsDB extends Dexie {
    thumbnails!: EntityTable<Thumbnail, 'uuid'>;

    constructor() {
        super('thumbnails-db');
        this.version(1).stores({
            thumbnails: 'uuid, data'
        });
        this.thumbnails.mapToClass(Thumbnail);
    }
}