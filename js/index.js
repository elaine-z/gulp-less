window.onload = function() {
	function slideImage(imgWrapper, btnObj, pointObj, speed) {
		var speed = parseInt(speed);
		var wrapperWidth = parseInt($(imgWrapper).parent().width());
		var i = 0;
		var timer = null;

		// 创建圆点并给第一个加样式
		for (var j = 0; j < $(imgWrapper).find('li').length; j++) {
			$(pointObj).append('<li></li>')
		}
		$(pointObj).find('li').first().addClass('active');

		// 复制第一张照片并设置ul宽度
		var firstImg = $(imgWrapper).find('li').first().clone();
		$(imgWrapper).append(firstImg).width($(imgWrapper).find('li').length * ($(imgWrapper).find('img').width()));

		// 下一个按钮
		$(btnObj).find('#next').click(function() {
			i++;
			if (i == $(imgWrapper).find('li').length) {
				i = 1;
				$(imgWrapper).css({
					left: 0
				}); 
			};

			$(imgWrapper).stop().animate({
				left: -i * wrapperWidth
			}, 300);
			if (i == $(imgWrapper).find('li').length - 1) { //设置小圆点指示
				$(pointObj).find('li').eq(0).addClass('active').siblings().removeClass('active');
			} else {
				$(pointObj).find('li').eq(i).addClass('active').siblings().removeClass('active');
			}

		})

		// 上一个按钮
		$(btnObj).find('#prev').click(function() {
			i--;
			if (i == -1) {
				i = $(imgWrapper).find('li').length - 2;
				$(imgWrapper).css({
					left: -($(imgWrapper).find('li').length - 1) * wrapperWidth
				});
			}
			$(imgWrapper).stop().animate({
				left: -i * wrapperWidth
			}, 300);
			$(pointObj).find('li').eq(i).addClass('active').siblings().removeClass('active');
		})

		//设置按钮的显示和隐藏
		$(imgWrapper).parent().hover(function() {
			$(btnObj).show();
		}, function() {
			$(btnObj).hide();
		})

		//鼠标划入圆点
		$(pointObj).find('li').mouseover(function() {
			var index = $(this).index();
			$(imgWrapper).stop().animate({
				left: -index * wrapperWidth
			}, 100);
			$(pointObj).find('li').eq(index).addClass('active').siblings().removeClass('active');
			i = index;
		})

		//定时器自动播放
		this.timer = setInterval(function() {
			i++;
			if (i == $(imgWrapper).find('li').length) {
				i = 1;
				$(imgWrapper).css({
					left: 0
				});
			};
			$(imgWrapper).stop().animate({
				left: -i * wrapperWidth
			}, 300);
			if (i == $(imgWrapper).find('li').length - 1) {
				$(pointObj).find('li').eq(0).addClass('active').siblings().removeClass('active');
			} else {
				$(pointObj).find('li').eq(i).addClass('active').siblings().removeClass('active');
			}
		}, speed)

		//鼠标移入，暂停自动播放，移出，开始自动播放
		$(imgWrapper).parent().hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				i++;
				if (i == $(imgWrapper).find('li').length) {
					i = 1;
					$(imgWrapper).css({
						left: 0
					});
				};

				$(imgWrapper).stop().animate({
					left: -i * wrapperWidth
				}, 300);
				if (i == $(imgWrapper).find('li').length - 1) {
					$(pointObj).find('li').eq(0).addClass('active').siblings().removeClass('active');
				} else {
					$(pointObj).find('li').eq(i).addClass('active').siblings().removeClass('active');
				}
			}, speed)
		})
	}
	slideImage('#img', '#btn', '#img-index', 3000);
}