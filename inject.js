chrome.runtime.onMessage.addListener(function(req){
	if(req.action == 'getStock'){
		var stocks = document.getElementsByClassName('stock_info');
		if(stocks.length > 0) return;

		var elems = document.getElementsByClassName('olpOffer');
		var str = '';
		for(var i = 0; i < elems.length; i++){
			elems[i].id = "olpOffer_"+i;
			var input = elems[i].querySelector('input[name="offeringID.1"]');
			str += input.value + (i == elems.length - 1 ? '' : ';');
		}

		chrome.runtime.sendMessage({
			action: 'newInfo',
			info: str
		})
	}

	if(req.action == 'appendStocks'){
		let res = JSON.parse(req.response);
		for(var i = 0; i < res.length; i++){
			let newElem = document.createElement("div");
			newElem.innerHTML = res[i] + " in stock";
			newElem.classList += "stock_info";
			let elem = document.getElementById('olpOffer_' + i);
			elem.getElementsByClassName('olpShippingInfo')[0].insertBefore(newElem, null)
		}
	}
})
