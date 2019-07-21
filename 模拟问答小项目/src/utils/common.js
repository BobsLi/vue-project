function countDown(sec, curretCb, completeCb) {
	sec = Number.parseInt(sec);
	function actionFunc() {
		if(curretCb){
			curretCb(sec);
		}
		sec--;
		if (sec < 0) {
			if(completeCb){
				completeCb();
			}
			return;
		}
		setTimeout(actionFunc, 1000);
	}
	actionFunc();
}

export {
	countDown,
};
