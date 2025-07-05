import { Entity } from "dexie";
import ThumbnailsDB from "./ThumbnailsDB";

export default class Thumbnail extends Entity<ThumbnailsDB> {
    uuid!: string;
    data!: Blob;
}