chrome.runtime.onMessage.addListener(function(req){
	if(req.action == 'getStock'){
		if(document.getElementsByClassName('stock_info').length > 0) return;

		let elems = document.getElementsByClassName('olpOffer'),
			str = '';
		for(let i = 0; i < elems.length; i++){
			elems[i].id = "olpOffer_"+i;
			let input = elems[i].querySelector('input[name="offeringID.1"]');
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
			let total = Math.ceil(res[i]),
				newElem = document.createElement("div");
			newElem.innerHTML = (total > 998 ? total+'+' : total) + " in stock";
			newElem.classList += "stock_info";
			let elem = document.getElementById('olpOffer_' + i);
			elem.getElementsByClassName('olpShippingInfo')[0].insertBefore(newElem, null)
		}
	}
})
