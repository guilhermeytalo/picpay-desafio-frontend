export interface Task {
    id?: number
    name: string;
    title: string;
    username: string;
    date: Date;
    value: number;
    image: string;
    isPayed: boolean;
}