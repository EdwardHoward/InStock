(function(){
	var currentTab;
	chrome.tabs.getSelected(function(tab){
		currentTab = tab;
		chrome.tabs.sendMessage(tab.id, {action: 'getStock'});
	})
	chrome.runtime.onMessage.addListener(function(req){
		if(req.action == 'newInfo'){
			let request = new XMLHttpRequest();
			request.open('GET', 'http://www.edwardhoward.io/items/'+req.info);
			request.onload = function(){
				chrome.tabs.sendMessage(currentTab.id, {action: 'appendStocks', response: request.response});
			}
			request.send();
		}
	})
})();
