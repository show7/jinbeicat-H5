<template>
	<div class="bank-set">
		<header class="u-header"> <a class="back" href="javascript:history.back(-1);"><img src="../../../assets/img/left.png"></a>实名绑卡</header>
		<div class="input">
			<label>所属省份</label>
			<select id="province-box" name="province" v-model="prov" >
                <option  v-for="option in arr" :value="option.name" ref="provice">{{ option.name }}</option>
                <!-- <option v-for="cardinfo.provice"></option> -->
          	</select>
		</div>
		<div class="input">
			<label>所属城市</label>
			<select id="city-box" name="city" v-model="city" ref="city">
            	<option v-for="option in cityArr" :value="option.name" ref='citys'>{{ option.name }}</option>
          	</select>
		</div>
		<div class="input">
			<label>所属银行</label>
			<select id="form-control" name="bankcode" v-model="bank" ref="bank">
				<option>请选择</option>
            	<option  v-for="option in bankArr" :value="option" ref="banks">{{ option.name }}</option>
          	</select>
		</div>
		<div class="input">
			<label>银行卡号</label>
			<input type="text" placeholder="输入银行卡号" @blur="checkcard" ref="card">
		</div>
		<!-- <div class="input">
			<label>开户支行</label>
			<input type="text" placeholder="输入银行支行名称">
		</div> -->
		<div class="input">
			<label>真实姓名</label>
			<input type="text" placeholder="输入姓名" ref="name" @blur="checkname">
		</div>
		<div class="input">
			<label>身份证号</label>
			<input type="text" placeholder="输入身份证号" @blur="checkId" ref="idcard">
		</div>
		<div class="input">
			<label>预留手机号</label>
			<input type="text" placeholder="输入预留手机号" @blur="checkphone" ref='mobile'>
		</div>
		<div class="input submit-input">
			<button type="submit" class="btn btn-submit btn-avail" @click="cardsubmit">完成</button>
			<p class="u-font-text">以上信息仅限于银行验证使用</p>
		</div>
	</div>
</template>

<script>
	export default {
		// props:['name'],
		data(){
			return{
				cardinfo:[],
				arr: arrAll,
				prov: '选择省份',
				city: '请选择',
				cityArr: [],
				bank:'请选择',
				bankArr:[
					{abbreviation:'ICBC',name:'中国工商银行'},
					{abbreviation:'ABC',name:'中国农业银行'},
					{abbreviation:'BOC',name:'中国银行'},
					{abbreviation:'CCB',name:'中国建设银行'},
					{abbreviation:'PSBC',name:'中国邮政储蓄银行'},
					{abbreviation:'GDB',name:'广发银行'},
					{abbreviation:'CEB',name:'中国光大银行'},
					{abbreviation:'CITIC',name:'中信银行'},
					{abbreviation:'CIB',name:'兴业银行'},
					{abbreviation:'BCOM',name:'中国交通银行'},
					{abbreviation:'SPDB',name:'浦发银行'},
					{abbreviation:'PAB',name:'平安银行'},
					{abbreviation:'CMBC',name:'中国民生银行'},
					{abbreviation:'HXB',name:'华夏银行'},
					{abbreviation:'CMB',name:'招商银行'}
				]
				
			}
		},
		// mounted:function(){
		// 	if(sessionStorage.getItem('state2')*1=="1"&&sessionStorage.getItem('state3')*1=="1"){
		// 		var error=JSON.parse(sessionStorage.obj);
		// 		console.log(error)
		// 		this.prov=error.province;
		// 		console.log(error.bankName)
		// 		// this.bank=error.bankName
		// 		// console.log(this)
		// 		// this.city=error.city
		// 		// this.data.bank=error.bankName
		// 		this.$refs.idcard.value=error.idCardNo;
		// 		this.$refs.mobile.value=error.bindMobile;
		// 		this.$refs.name.value=error.realName;
		// 		this.$refs.card.value=error.bankCardNo;
		// 	}
			
		// },
		methods: {
			updateCity: function () {
				for (var i in this.arr) {
					var obj = this.arr[i];
					if (obj.name == this.prov) {
						this.cityArr = obj.sub;
						break;
					}
				}
				this.city = this.cityArr[0].name
				// this.city = '请选择';（会报错name）
			},
			checkname(){
				var name=this.$refs.name.value
				if(name){

				}else{
					this.$dialog.notify({
		        	mes:'姓名不能为空',
		        	timeout: 3000,});
				}
			},
			//判断银行卡号
			checkcard(){
				var card=this.$refs.card.value
				if(card){

				}else{
					this.$dialog.notify({
		        	mes:'银行卡号不能为空',
		        	timeout: 3000,});
				}
			},
			//判断身份证号
			checkId(){
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
				var idcard=this.$refs.idcard.value
			  	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			   	if(reg.test(idcard) === false) {  
			   		this.$dialog.notify({
		        	mes:'身份证输入不合法',
		        	timeout: 3000,});
			   	}  
			},
			//判断手机号
			checkphone(){
				var mobile=this.$refs.mobile.value
				var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
				if(mobile){
					if (mobile.match(preg)) {
		              this.ismobile=true;
		            }else{
		               this.$dialog.notify({
		        		mes:'手机号格式是不正确的',
		        		timeout: 3000,});
		            }
				}
			},
			//点击判断
			cardsubmit(){
				var name=this.$refs.name.value
				var card=this.$refs.card.value
				var idcard=this.$refs.idcard.value
				var mobile=this.$refs.mobile.value
				if(this.prov=='选择省份'){
					this.$dialog.notify({
		        	mes:'请选择省份',
		        	timeout: 3000,});
				}else{
					if(this.city=="请选择"){
						this.$dialog.notify({
			        	mes:'请选择市区',
			        	timeout: 3000,});
					}else{
						if(this.bank=="请选择"){
							this.$dialog.notify({
				        	mes:'请选择所属银行',
				        	timeout: 3000,});
						}else{
							if(card==''){
								this.$dialog.notify({
					        	mes:'请填写银行卡号',
					        	timeout: 3000,});
					        	//银行卡号大于10位
					        }else{
					        	if(card.length<=10){
					        		this.$dialog.notify({
					        		mes:'银行卡号必须大于10位',
					        		timeout: 3000,});
					        	}else{
									if(name==''){
										this.$dialog.notify({
							        	mes:'请填写姓名',
							        	timeout: 3000,});
									}else{
										if(idcard==''){
											this.$dialog.notify({
								        	mes:'请填写身份证号',
								        	timeout: 3000,});
										}else{
											if(mobile==''){
												this.$dialog.notify({
									        	mes:'请填写预留手机号',
									        	timeout: 3000,});
											}else{
												var provice=this.prov
												var city=this.city
												var bankname=this.bank.name;
												var bankcode=this.bank.abbreviation;
												var token = sessionStorage.getItem('userAccessToken')
												var cardinfo= this.serviceAjax('/api/user/bind/bankcard.do','post',{province:provice,city:city,bankCode:bankcode,bankName:bankname,bankCardNo:card,realName:name,idCardNo:idcard,bindMobile:mobile,bankBranch:'支行信息'},token)
												if(cardinfo.head.code=="0000"){
													 this.$router.push({ path: '/Account'}) 
												}else{
													this.$dialog.notify({
									        		mes:cardinfo.head.memo,
									        		timeout: 3000,});
												}
											}
										}
									}
								}
					        }
							
						}
					}
				}

			}
		},
		beforeMount: function () {
			this.updateCity();
		},
		watch: {
			prov: function () {
				this.updateCity();
			}
		
		}
	}
</script>
<style scoped>
	.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
	.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
	.bank-set .input{background: #fff;padding: 0 .4rem;position: relative;border-top: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;clear: both;}
	.bank-set .input.submit-input{background:none;}
	.bank-set .input .u-font-text {color: #cccccc;font-size: 0.217rem;margin-bottom: 0.3rem;padding-top: 2%; text-align: center;}
	.bank-set .input label {width: 2.5rem;position: absolute;display: block;top: 0;left: .4rem;z-index: 999;line-height: 1.2rem;color: #333;font-size: 0.314rem;}
	.bank-set .input select {margin-left: 2rem;width: 60%;padding: .4rem 0;-webkit-appearance: none;appearance: none;border: none; font-size: .314rem;display: block;-webkit-box-sizing: border-box;box-sizing: border-box;background-color: #FFFFFF;color: #ccc;border-radius: 4px;}
	.bank-set .input  input {margin-left: 1.8rem;width: 60%;font-size: .314rem;line-height: normal;padding: .4rem 0;border: 0;background: none;color: #ccc;box-sizing: border-box;}
	.bank-set .input .btn-avail {display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem;margin: 1rem auto 0 auto;font-size: 0.314rem;border: 1px solid #ecc346; border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
</style>