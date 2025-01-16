export interface News {
    title: string;
    description: string;
    url: string;
    source:{
        name:string
    }
    urlToImage: string | undefined;
    publishedAt:string;
}