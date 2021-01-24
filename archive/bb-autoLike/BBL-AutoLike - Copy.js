// <span class="icon icon--size-stretch" role="presentation" data-qa-role="icon" data-qa-icon-name="floating-action-yes">

 function autoLike() {
	console.log('like');
	var btn = document.querySelectorAll('span.icon--size-stretch[data-qa-icon-name="floating-action-yes"]');
	btn[0].click();

	var rand = Math.random();
  setTimeout(autoLike, rand * 1000);

}
autoLike();

