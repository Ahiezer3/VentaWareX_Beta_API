export interface EntityService <T>{
    entityExists(id:number): Promise<T>;
}