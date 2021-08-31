export default data;
declare let data: {
    id: number;
    parent_id: number;
    name: string;
    children: {
        id: number;
        parent_id: number;
        name: string;
        children: {
            id: number;
            parent_id: number;
            name: string;
            children: any[];
        }[];
    }[];
}[];
