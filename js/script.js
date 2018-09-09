$(document).ready(function () {
	PopUpHide();
	var count = 0,
		i = 0,
		countRead = 0,
		SliderCount = 1,
		moreCount = 0,
		sliderLength = $('.BoardsItems .ItmBoard'),
		backgrounds = ['main2.jpeg', 'main.jpg', 'main3.jpg'];
	var countSl = 0;
	var blogImg = [],
		blogName = [],
		blogText = [],
		boardsList = [];




	$(document).on('click', function (e) {
		e.preventDefault;
		var _this = e.target;

		if (_this.matches('.menuText') && count == 0) {
			$('.menuitems').animate({
				top: -15
			}, 100);
			count++;

		} else {
			$('.menuitems').animate({
				top: -100
			}, 100);
			count = 0;

		}
		if (_this.matches('.playbutton')) {
			if (i < 3) {
				$(".menuzone").css("backgroundImage", 'url(../img/' + backgrounds[i] + ')');
				i++;
			} else {
				i = 0;
			}
		}

		if (_this.matches('.readmoreclass') && countRead == 0) {
			$('.infotextItem').animate({
				height: 200 + 'px'
			}, 300);
			$('.readmoreclass').html("Hide");
			countRead++;
		} else {
			if (countRead == 1) {
				$('.infotextItem').animate({
					height: 90 + 'px'
				}, 300);
				$('.readmoreclass').html("Read More");
				countRead = 0;
			}
		}

	});
	$('.nextBoard').on('click', function () {
		if (SliderCount <= sliderLength.length - 3) {
			console.log(SliderCount);
			$('.ItmBoard').animate({
				right: 340 * SliderCount
			}, 300);
			SliderCount++;
		}
	});
	$('.prevBoard').on('click', function () {
		if ((SliderCount <= sliderLength.length - 2) && (SliderCount > 1)) {
			SliderCount--;
			console.log(SliderCount);
			$('.ItmBoard').animate({
				right: 340 * SliderCount - 340
			}, 300);
		}
	});


	/*******************************SLIDER********************************************************/

	var slider = $('.BoardsItems');
	$.ajax({
		url: 'slide.php',
		type: 'POST',
		data: {
			flag: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				var ItmBoard = document.createElement('div'),
					ImageBoard = document.createElement('div'),
					discrBoard = document.createElement('div'),
					imgB = document.createElement('img'),
					discrBoardpar = document.createElement('h3'),
					discrBoardlink = document.createElement('p');
				imgB.setAttribute('src', data[i]["image"]);
				imgB.setAttribute('alt', 'surfboard');
				discrBoardlink.setAttribute('data-target', data[i]["target"]);
				discrBoardlink.textContent = data[i]["name"];
				discrBoardpar.textContent = data[i]["firm"];
				ItmBoard.classList.add('ItmBoard');
				ItmBoard.classList.add('DisplayOff');
				ImageBoard.classList.add('ImageBoard');
				discrBoard.classList.add('discrBoard');
				discrBoardlink.classList.add('boardOpenInfo');
				ImageBoard.appendChild(imgB);
				discrBoard.appendChild(discrBoardpar);
				discrBoard.appendChild(discrBoardlink);
				ItmBoard.appendChild(ImageBoard);
				ItmBoard.appendChild(discrBoard);
				slider.append(ItmBoard);
				imgB.width = 200;
			}
		}

	});
	$.ajax({
		url: 'boards.php',
		type: 'POST',
		data: {
			flag: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				boardsList.push(data[i]);
			}
		}

	});

	/*******************************SLIDER********************************************************/


	$('.showAllB').on('click', function () {
		$('.ItmBoard').css("right", '0');
		SliderCount = 1;
		if (moreCount == 0) {
			$('.nextBoard').fadeOut();
			$('.prevBoard').fadeOut();
			$('.showAllB').html("Hide All");
			$(".BoardsItems").css({
				"display": "flex",
				"justify-content": "space-around",
				"align-items": "flex-start",
				"width": "100%",
				"padding": "20px",
				"height": "auto",
				"flex-wrap": "wrap"
			});
			moreCount++;
			$('.DisplayOff').fadeIn();

		} else {
			$('.nextBoard').fadeIn();
			$('.prevBoard').fadeIn();
			$('.showAllB').html("Show All");
			$('.DisplayOff').fadeOut();
			$(".BoardsItems").css({
				"display": "flex",
				"justify-content": "flex-start",
				"align-items": "flex-end",
				"width": "100%",
				"padding": "20px",
				"height": "120%",
				"flex-wrap": "nowrap",
				"overflow": "hidden"
			});
			moreCount--;

		}
	});


	$('.ScrollClass').on('click', function () {
		var scrollToSection = $(this).attr('href');
		if ($(scrollToSection).length != 0) {
			$('html, body').animate({
				scrollTop: $(scrollToSection).offset().top
			}, 1000);
		}
		return false;
	});
	document.addEventListener('click', function (e) {
		e = e || event;
		var _this = e.target;

		if (_this.matches('.boardOpenInfo')) {

			PopUpShow($(_this).attr("data-target"), boardsList);
		}
		if (_this.matches('.closePop')) {
			PopUpHide();
		}
	});
	$('.boardPrice').on('click', function () {
		PopUpHide();
	});

	/************************BLOG*********************************/
	var blogger = $('.blogPosts');
	$.ajax({
		url: 'blog.php',
		type: 'POST',
		data: {
			flag: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				blogImg.push(data[i]["image"]);
				blogName.push(data[i]["name"]);
				blogText.push(data[i]["text"]);
			}
		}

	});


	$('.next').on('click', function () {
		$('.blogPost').animate({
			opacity: 0,
			display: "none"
		}, 200);
		countSl++;
		if (countSl < 5) {
			setTimeout(function () {
				blogsFillOut(blogImg, blogName, blogText, countSl, '.blogPost');
				$('.blogPost').animate({
					opacity: 1,
					display: "flex"
				}, 200);
			}, 500);
		} else {
			countSl = 4;
			blogsFillOut(blogImg, blogName, blogText, countSl, '.blogPost');
			$('.blogPost').animate({
				opacity: 1,
				display: "flex"
			}, 200);
		}
	});


	$('.prev').on('click', function () {
		$('.blogPost').animate({
			opacity: 0,
			display: "none"
		}, 200);
		countSl--;
		if (countSl >= 0) {
			setTimeout(function () {
				blogsFillOut(blogImg, blogName, blogText, countSl, '.blogPost');
				$('.blogPost').animate({
					opacity: 1,
					display: "flex"
				}, 200);
			}, 500);
		} else {
			countSl = 0;
			blogsFillOut(blogImg, blogName, blogText, countSl, '.blogPost');
			$('.blogPost').animate({
				opacity: 1,
				display: "flex"
			}, 200);
		}
	});

});




function blogsFillOut(blogImg, blogName, blogText, countSl, blogBlock) {
	$(blogBlock + ' .blogImg').attr('src', blogImg[countSl]);
	$(blogBlock + ' .discrPost').html(blogText[countSl]);
	$(blogBlock + ' h2').html(blogName[countSl]);
}





// PopUp
function PopUpShow(d_target, boardsList) {
	for (var i = 0; i < boardsList.length; i++) {
		if (boardsList[i].target == d_target) {

			$('.popUpWin img').attr('src', boardsList[i].image);
			$('.popUpWin h3').html(boardsList[i].firm);
			$('.boardname').html(boardsList[i].name);
			$('.boardDesc').html(boardsList[i].text)
			$('.boardPrice').html("BUY " + boardsList[i].price);
			$("#popupBoard").css('display', 'flex');
			$("#popupBoard").show();
			return
		}
	}
}


//Функция скрытия PopUp
function PopUpHide() {
	$("#popupBoard").css('display', 'none');
	$("#popupBoard").hide();
}