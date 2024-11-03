export interface User {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string;
}
export interface UsersInfo {
	data: User[];
	page:number;
	per_page:number;
	total:number;
	total_pages:number
}