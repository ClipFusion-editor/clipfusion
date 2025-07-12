import ThumbnailsDB from "../../types/ThumbnailsDB";

export const thumbnailsDB = new ThumbnailsDB();

export function addThumbnail(uuid: string, data: Blob) {
    thumbnailsDB.thumbnails.add({
        uuid: uuid,
        data: data
    });
}