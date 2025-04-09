export type CabinType = {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
}; 

export type CabinsType = Array<CabinType>;