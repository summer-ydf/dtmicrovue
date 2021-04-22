import tool from '@/utils/tool';

let permission = (data) => {
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
export default permission;