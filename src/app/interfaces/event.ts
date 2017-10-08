export interface Event {
    $key?: string,
    name: string,
    description: string,
    date?: Date,
    startDate?: Date,
    endDate?: Date,
    comment?: string,
    location?: string
}
