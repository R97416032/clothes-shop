<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '0'
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onLoad() {
		
	}
};
</script>

<style lang="scss">
	@import "cl-uni/index.scss";
/*每个页面公共css */ 
</style>
