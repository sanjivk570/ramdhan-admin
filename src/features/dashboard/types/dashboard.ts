export interface DashboardOverview {
    total_users: number;
    active_users: number;
    inactive_users: number;
    total_roles: number;
    total_permissions: number;
}

export interface DashboardUserStatistics {
    new_users: number;
}

export interface UserGrowthItem {
    date: string;
    total: number;
}

export interface DashboardUser {
    uuid: string;
    first_name: string;
    last_name: string | null;
    full_name: string;
    email: string;
    mobile: string | null;
    status: boolean;
    created_at: string;
}

export interface DashboardData {
    overview: DashboardOverview;
    user_statistics: DashboardUserStatistics;
    user_growth: UserGrowthItem[];
    recent_users: DashboardUser[];
}