export interface Message{
    id: number;
    sender?: object;
    senderId: string;
    reciever: object;
    recieverId: string;
    message: string;
    date: Date;
}