exports.install = function(Vue, options) {
	Vue.prototype.queryAjax = function(rqpath, rqtype, param,accessToken) {
		var url = "http://apione.jinbeicat.com/ruqing-query/"+rqpath+"?accessToken="+accessToken;
		var result;
		 $.ajax(url,{					
			type:rqtype ,
			dataType: "json",
			data:param || {},
			async : false,
			headers : {'tnapikey':'ff5ad7b4-90c0-47b0-8469-cdebf635f6a5','channel':'h5'},
			success: function (data) {
				result = data;
			}
		});
		return result;
	};
	Vue.prototype.serviceAjax = function(rqpath, rqtype, param,accessToken) {
		var url = "http://apione.jinbeicat.com/ruqing-server/"+rqpath+"?accessToken="+accessToken;
		var result;
		$.ajax(url,{					
			type:rqtype ,
			dataType: "json",
			data:param || {},
			async : false,
			headers : {'tnapikey':'ff5ad7b4-90c0-47b0-8469-cdebf635f6a5','channel':'h5'},
			success: function (data) {
				result = data;
			}
		});
		return result;
	};
	Vue.prototype.queryAjax2 = function(rqpath, rqtype, param,accessToken) {
		var url = "http://www.jinbeicat.com/"+rqpath;
		var result;
		 $.ajax(url,{					
			type:rqtype ,
			dataType: "json",
			data:param || {},
			async : false,
			headers : {'tnapikey':'ff5ad7b4-90c0-47b0-8469-cdebf635f6a5','channel':'h5'},
			success: function (data) {
				result = data;
			}
		});
		return result;
	};
	Vue.prototype.queryAjax3 = function(rqpath, rqtype, param,accessToken) {
		var url = "http://www.jinbeicat.com/"+rqpath+"?accessToken="+accessToken;
		var result;
		 $.ajax(url,{					
			type:rqtype ,
			dataType: "json",
			data:param || {},
			async : false,
			headers : {'tnapikey':'ff5ad7b4-90c0-47b0-8469-cdebf635f6a5','channel':'h5'},
			success: function (data) {
				result = data;
			}
		});
		return result;
	};
	//积分页面的接口
	Vue.prototype.queryAjax4 = function(rqpath, rqtype, param,accessToken) {
		var url = "http://apione.jinbeicat.com"+"/ruqing-integral/"+rqpath+"?accessToken="+accessToken;
		var result;
		 $.ajax(url,{					
			type:rqtype ,
			dataType: "json",
			data:param || {},
			async : false,
			headers : {'rqapikey':'ff5ad7b4-90c0-47b0-8469-cdebf635f6a5','channel':'h5'},
			success: function (data) {
				result = data;
			}
		});
		return result;
	};
	Vue.prototype.Const ='http://www.jinbeicat.com/'
	Vue.prototype.Const1 ='http://m.jinbeicat.com'

};