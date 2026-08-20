export interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
    guard_name: string;
    module: string;
}