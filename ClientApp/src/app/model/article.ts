export interface Article{
    id: number,
    userId: string,
    thumbnail: string,
    title: string,
    content: string,
    published: boolean,
    publishDate: Date,
    lastEdited: Date
};