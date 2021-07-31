import tool from '@/utils/tool';

export function permission(data) {
	let userInfo = tool.data.get("user");
	if(!userInfo){
		return false;
	}
	let permissions = userInfo.permissions;
	if(!permissions){
		return false;
	}
	let isHave = permissions.includes(data);
	return isHave;
}

export function rolePermission(data) {
	let userInfo = tool.data.get("user");
	if(!userInfo){
		return false;
	}
	let role = userInfo.userInfo.role;
	if(!role){
		return false;
	}
	let isHave = role.includes(data);
	return isHave;
}
