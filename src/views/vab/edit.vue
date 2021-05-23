<template>
	<el-main>
		<el-card shadow="never">
			<sc-edit v-model="html"></sc-edit>
		</el-card>
	</el-main>
</template>

<script>
	import scEdit from '@/components/scEdit';
	export default {
		name: "edit",
		components: {
			scEdit
		},
		data(){
			return {
				html: '<h2 style="text-align:center;"><span style="font-family:Georgia, serif;">The Flavorful Tuscany Meetup</span></h2><h3 style="text-align:center;"><span style="font-family:Georgia, serif;">Welcome letter</span></h3><p><span class="text-big">Dear Guest,</span></p><p><span class="text-big">We are delighted to welcome you to the annual Flavorful Tuscany Meetup and hope you will enjoy the programme as well as your stay at the Bilancino Hotel.</span></p><p><span class="text-big">Please find attached the full schedule of the event.</span></p><p>&nbsp;</p><figure class="table" style="width:100%;"><table><tbody><tr><td style="background-color:hsl(0, 0%, 60%);height:40px;text-align:center;" colspan="2"><span class="text-big">Saturday, July 14</span></td></tr><tr><td style="background-color:hsl(0, 0%, 90%);height:40px;padding:15px;width:180px;">9:30 AM - 11:30 AM</td><td style="padding:15px;"><p><span class="text-big">Americano vs. Brewed - “know your coffee” with:</span></p><p>&nbsp;</p><p>Giulia Bianchi<br>Stefano Garau<br>Giuseppe Russo</p></td></tr><tr><td style="background-color:hsl(0, 0%, 90%);padding:15px;">1:00 PM - 3:00 PM</td><td style="padding:15px;"><p><span class="text-big">Pappardelle al pomodoro - live cooking</span></p><p>&nbsp;</p><p>Incorporate the freshest ingredients&nbsp;<br>with Rita Fresco</p></td></tr></tbody></table></figure>'
			}
		}
	}
</script>

<style>
</style>
