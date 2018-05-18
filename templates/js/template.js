$(document).ready(function(){
	
	var navDown=true;
	
if (!!window.ActiveXObject || "ActiveXObject" in window){$('html').addClass("ie")}
	
if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        alert("您的浏览器版本过低，请下载IE10及以上版本");
    }
	wind_w=$(window).width();
	wind_h=$(window).height();
	animated();
	about.slide();
	common.inputed();
	ind.banner();
	about.row2();
	contact.row1();
	about.row3();
	energy.row();
	epc.slideImg();
	epc.downBox();
	
	$('.return').on('click',function(){
		var num=getQueryVariable('next');
		history.go(-num);
	});
	(function(){
		var nowp = $('.prev').attr('href'),
			nown = $('.next').attr('href'),
			num = parseInt(getQueryVariable('next'));
		console.log($('.prev'));
		if(nowp!=undefined){
			$('.prev').attr('href',nowp+'?next='+(num+1));
		}
		if(nown!=undefined){
			$('.next').attr('href',nown+'?next='+(num+1));
		}
	})()
	$('.picShow .mask').on('click',function(){
		$('.picShow').hide();
	});
	$('.close').on('click',function(){
		$(this).parent().hide();
	});
	$('.switchList').on('click',function(){
		var src=$(this).children('img').attr('src');
		$('.picShow').find('.photo').css('background-image',"url("+src+")");
		$('.picShow').css('display','table');
	});
	
	$(document).on('click','.mobShow',function(e){
		var _this=$(this);
		if(navDown){
			_this.parents('.mobMenu').find('.mobDown').stop().animate({opacity:1},300).show().removeClass('fadeOut').addClass('fadeInUp');
			navDown=false;
		}else if(!navDown){
			_this.parents('.mobMenu').find('.mobDown').removeClass('fadeInUp').addClass('fadeOut').stop().animate({opacity:0},500,
					function(){_this.parents('.mobMenu').find('.mobDown').hide();}
				);
			navDown=true;
		}
	});
	$('body').on('click',function(e){
		var _this = $('.mobShow');
		if(!navDown){
			_this.parents('.mobMenu').find('.mobDown').removeClass('fadeInUp').addClass('fadeOut').stop().animate({opacity:0},500,
					function(){_this.parents('.mobMenu').find('.mobDown').hide();}
				);
			navDown=true;
		}
	});
	$(window).scroll(function(){
		if($(this).scrollTop()>wind_h){
			$('.toTop').fadeIn();
		}else{
			$('.toTop').fadeOut();
		}
	});
	$(".toTop").click(function(){
		$('html,body').animate({scrollTop:'0'},500);
	});
	
	$("input,textarea").keydown(function(){
 		$('#respond_feedback').html('');
	});
	
	function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
		
})
var common={
	inputed:function(){
		$('.input_txt').each(function(){
			var _value=$(this).val();
			$(this).focus(function(){
				_txt=$(this).val();
				if(_txt==_value){
					$(this).val(' ');
				}
				$('#respond').remove();
			});
			$(this).blur(function(){
				_txt=$(this).val();
				console.log(1)
				if(_txt==' '){
					$(this).val(_value);
				}
			})
		})	
	}
}
var ind={
	banner:function(){
		$('.ind_box .banner li,.ind_box .banner').height(wind_h);
		var _size=$('.ind_box .banner li').size();
		$('.ind_box .banner .numwrap .total').html('0'+_size+' '+'/');
		for(i=1;i<_size+1;i++){
			$('<span class="poa">0'+i+'</span>').appendTo('.ind_box .banner .numwrap .num');
		}
		for(i=1;i<_size+1;i++){
			$('<span class="poa"></span>').appendTo('.ind_box .banner .stopcirlce');
		}
		for(i=1;i<_size+1;i++){
			$('<span class="poa"><i></i></span>').appendTo('.ind_box .banner .movecirlces');
		}
		$('.common_num').each(function(){
			$(this).find('span').each(function(i){
				i+=1;
				$(this).addClass('num'+i);
			})
		})
		$('.ind_box .banner .itemwrap').each(function(){
			$(this).find('a').each(function(i){
				i+=1;
				$(this).addClass('item'+i);
			})
		})

		$bxslider=$('.ind_box .bxslider');
		$('.bxslider').bxSlider({
			  // infiniteLoop:true,
			  auto:true,
			  mode: 'fade',
			  speed:1500,
			  pause:6500,
			  controls:false,
			  onSliderLoad:function(c){
			  		 _data_src=$bxslider.find("li:not('.bx-clone')").eq(c).attr('data-src');
			  		$('.ind_box .banner .data_src').attr('href',_data_src);
				 	$bxslider.find("li:not('.bx-clone')").eq(c).addClass('active',_data_src);
				 	$('.banner .itemwrap .item a').eq(c).addClass('active');
				 	$('.banner .circle span').eq(c).addClass('active');
				 	$('.banner .movecircle .circle span').eq(c).addClass('active');
				 	$('.ind_box .banner .numwrap .num span').eq(c).addClass('active');
					if($('.banner .movecircle .circle span.num1').hasClass('active')){
						movecircle1();
					}else{
						clearInterval(movecircle1())
					}
					if($('.ind_box .banner .numwrap .num span.num1').hasClass('active')){
						moveNum1();
					}else{
						clearInterval(moveNum1())
					}
			 },
			 onSlideAfter:function(e,o,n){
			 	ind=$('.banner .bxslider li').index();
			 	$bxslider.find("li:not('.bx-clone')").eq(n).addClass('active').siblings('li').removeClass('active');
				$('.banner .itemwrap .item a').eq(n).addClass('active').siblings('a').removeClass('active');
				 _data_src=$bxslider.find("li:not('.bx-clone')").eq(n).attr('data-src');
				 $('.ind_box .banner .data_src').attr('href',_data_src);
			 },
			 onSlideBefore:function(e,o,n){
			 	$('.banner .movecircle .circle span').eq(n).addClass('active').siblings('span').removeClass('active');
			 	$('.ind_box .banner .numwrap .num span').eq(n).addClass('active').siblings('span').removeClass('active');
			 	if($('.banner .movecircle .circle span.num1').hasClass('active')){
					movecircle1();
				}else{
					clearInterval(movecircle1())
				};
			 	if($('.banner .movecircle .circle span.num2').hasClass('active')){
					movecircle2();
				}else{
					clearInterval(movecircle2())
				};
				if($('.banner .movecircle .circle span.num3').hasClass('active')){
					movecircle3();
				}else{
					clearInterval(movecircle3())
				};
				if($('.ind_box .banner .numwrap .num span.num1').hasClass('active')){
					moveNum1();
				}else{
					clearInterval(moveNum1())
				};
				if($('.ind_box .banner .numwrap .num span.num2').hasClass('active')){
					moveNum2();
				}else{
					clearInterval(moveNum2())
				};
				if($('.ind_box .banner .numwrap .num span.num3').hasClass('active')){
					moveNum3();
				}else{
					clearInterval(moveNum3())
				}
			 }

		});
		// $('.banner .circle span').on('click',function(){
		// 	$eq=$(this).index();
		// 	$('.bx-wrapper .bx-pager .bx-pager-item:eq('+$eq+') a').click();
		// 	$(this).addClass('active').siblings('span').removeClass('active');
		// 	$bxslider.find("li:not('.bx-clone')").eq($eq).addClass('active').siblings('span').removeClass('active');
		// 	$('.banner .itemwrap a').eq($eq).addClass('active').siblings('a').removeClass('active');
		// 	$(' .banner .numwrap .num span').eq($eq).removeClass('leave back').addClass('active').siblings('span').removeClass('active');
		// 	$(' .banner .numwrap .num span').eq($eq).prev('span').addClass('leave');
		// 	$(' .banner .numwrap .num span').eq($eq).next('span').addClass('back');
		// 	$(this).css('overflow','initial').siblings().css('overflow','hidden')
		// })
		
	}

}
function movecircle1(){
	// var _this=$('.ind_box .banner .movecircle .circle span.num1.active i');
	// _this.stop().animate({
	// 	opacity:0,
	// 	width:"2000px",
	// 	height:"2000px"
	// },5800,function(){
	// 	_this.animate({
	// 		opacity:1,
	// 		width:"300px",
	// 		height:"300px"
	// 	},600,function(){
	// 		_this.animate({
	// 			opacity:1,
	// 			width:"300px",
	// 			height:"300px"
	// 		},200,function(){
	// 			_this.parent('span').animate({
	// 				left:'69.95%',
	// 				top:'51.22%'
	// 			},400,function(){
	// 				_this.parent('span').animate({
	// 					left:'69.95%',
	// 				      top:'51.22%'
	// 				},200,function(){
	// 					_this.animate({
	// 						opacity:0,
	// 						width:"2000px",
	// 						height:"2000px"
	// 					},600,function(){
	// 						_this.parent('span').animate({
	// 							left:'49.06%',
	// 						     top:'44.81%'
	// 						})
	// 					})
	// 				})
	// 			})	
	// 		})
	// 	})
	// })

}
function movecircle2(){
	var _this=$('.ind_box .banner .movecircle .circle span.num2.active i');
	_this.stop().animate({
		opacity:0,
		width:"2000px",
		height:"2000px"
	},-1000,function(){
		_this.animate({
			opacity:1,
			width:"300px",
			height:"300px"
		},600,function(){
			_this.animate({
				opacity:1,
				width:"300px",
				height:"300px"
			},200,function(){
				_this.parent('span').animate({
				    left: "69.95%",
			          top: "51.22%"
				},400,function(){
					_this.parent('span').animate({
						left: "69.95%",
			          		top: "51.22%"
					},200,function(){
						_this.animate({
							opacity:0,
							width:"2000px",
							height:"2000px"
						},600,function(){
							_this.parent('span').animate({
								left:'49.06%',
						          top:'44.81%'
						     })
						})
					})
				})	
			})
		})
	})
}
function movecircle3(){
	var _this=$('.ind_box .banner .movecircle .circle span.num3.active i');
	_this.stop().animate({
		opacity:0,
		width:"2000px",
		height:"2000px"
	},-1000,function(){
		_this.animate({
			opacity:1,
			width:"300px",
			height:"300px"
		},600,function(){
			_this.animate({
				opacity:1,
				width:"300px",
				height:"300px"
			},200,function(){
				_this.parent('span').animate({
					left: "89.79%",
			           top: "41.4%"
				},400,function(){
					_this.parent('span').animate({
						left: "89.79%",
			                top: "41.4%"
					},200,function(){
						_this.animate({
							opacity:0,
							width:"2000px",
							height:"2000px"
						},600,function(){
							_this.parent('span').animate({
								left: "69.95%",
			          				top: "51.22%"
						     })
						})
					})
				})	
			})
		})
	})
}
function moveNum1(){
	var _this=$('.ind_box .banner .numwrap .num span.num1.active');
	_this.animate({
		opacity:'1',
		right:'0'
	},500,function(){
		_this.animate({
			opacity:'1',
		      right:'0'
		},6000,function(){
			_this.animate({
				opacity:'0',
				right:'-130%'
			},500,function(){
				_this.animate({
					opacity:'0',
					right:'100%'
				})
			})
		})
	})
}
function moveNum2(){
	var _this=$('.ind_box .banner .numwrap .num span.num2.active');
	_this.animate({
		opacity:'1',
		right:'0'
	},500,function(){
		_this.animate({
			opacity:'1',
			right:'0'
		},6000,function(){
			_this.animate({
				opacity:'0',
				right:'-130%'
			},500,function(){
				_this.animate({
					opacity:'0',
					right:'100%'
				})
			})	
		})
	})
}
function moveNum3(){
	var _this=$('.ind_box .banner .numwrap .num span.num3.active');
	_this.animate({
		opacity:'1',
		right:'0'
	},500,function(){
		_this.animate({
			opacity:'1',
			right:'0'
		},6000,function(){
			_this.animate({
				opacity:'0',
				right:'-130%'
			},500,function(){
				_this.animate({
					opacity:'0',
					right:'100%'
				})
			})	
		})
	})
}
var about={
	row2:function(){
	    swiper = new Swiper('.about_box .row2 .swiper', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        slidesPerView: 4,
	        spaceBetween: 50,
	       paginationBulletRender: function (swiper, index, className) {
		      return '<span class="' + className + '">' +0+ (index + 1) + '</span>';
		  },
	        breakpoints: {
	            1440: {
	                slidesPerView: 4,
	                spaceBetween: 30
	            },
	            640: {
	                slidesPerView: 1,
	                spaceBetween: 10
	            }
	         }
	    });
	},
	slide:function(){
		$(".slide_box").children('li').eq(0).children('a').addClass('active');
		$(".slide_box").children('li').eq(0).children('.slide_p').children('p').addClass('active');
		$('.Timsg').find('span').text($(".slide_box").children('li').find('.active').next('.slide_p').children('p').text());
		
		var ie=$(".ie");
		
		if(ie.length>0){
			$(".ie .slide_box").click(function(e){
				var wid=$(this).width()*0.2;
				var num=(e.clientX-$(this).offset().left)/wid;
				num=Math.floor(num);
				if(num==-1){
					num=0;
				}
				$(this).children('li').children('a').removeClass('active');
				$(this).children('li').children('.slide_p').children('p').removeClass('active');
				$('.Timsg').find('span').text($(this).children('li').eq(num).children('.slide_p').children('p').children('p').text());
				$(this).children('li').eq(num).children('a').addClass('active');
				$(this).children('li').eq(num).children('.slide_p').children('p').addClass('active');
				$(this).children('.slide').css({
					marginLeft:wid*num+'px'
				});
			});
		}
		else{
			console.log(2);
			$(".slide_box").on('mousemove',function(e){
				var wid=$(this).width()*0.2;
				var num=(e.clientX-$(this).offset().left)/wid;
				num=Math.floor(num);
				if(num==-1){
					num=0;
				}
				$(this).children('li').children('a').removeClass('active');
				$(this).children('li').children('.slide_p').children('p').removeClass('active');
				$('.Timsg').find('span').text($(this).children('li').eq(num).children('.slide_p').children('p').text());
				$(this).children('li').eq(num).children('a').addClass('active');
				$(this).children('li').eq(num).children('.slide_p').children('p').addClass('active');
				$(this).children('.slide').css({
					transform:'translate('+wid*num+'px)',
					'-ms-transform':'translate('+wid*num+'px)'
				});
			});
		}
	},
	row3:function(){
		$('.about_box .row3 .hd .sel').on('click','.sel_txt',function(e){
			e.stopPropagation();
			if($(this).parent().hasClass('active')){
				$(this).parent().removeClass('active');
				$(this).find('i').html('');
				$(this).parent().find('.sel_down').slideUp();
			}else{
				$(this).parent().addClass('active');
				$(this).find('i').html('');
				$(this).parent().find('.sel_down').slideDown();
				$(this).parent().siblings().removeClass('active');
				$(this).parent().siblings().find('i').html('');
				$(this).parent().siblings().find('.sel_down').slideUp();
			}
		});
		$('#select_year li').click(function(e){ 
			e.stopPropagation();
			$(this).parent('ul').siblings('.sel_txt').find('span').html($(this).text());
			$(this).parent('ul').siblings('.sel_txt').find('i').html('');
			$(this).parents('.sel').removeClass('active')
			var select_year = $(this).attr("data-value");
			//var select_month = $('#current_month').attr("data-value");
			var select_month = $('#current_month').text();
			
			$.post('about.php',{"year":select_year,"month":select_month},function(result) {
				$data = eval('('+result+')');
				// console.log(data.title);
				// console.log(data.description);
				$('.about_box .row3 .bd').empty();
				$.each($data,function(k,obj){
					_html='<a href="'+obj.url+'"  class="item ani">'+
						'<div class="wrap">'+
							'<div class="time ani">'+'<i class="iconfont ani"></i>'+'<div class="tb"><div class="tb_c"><span>'+obj.day+'</span>'+obj.year_month+'</div></div>'+'</div>'+
							'<div class="name ani">'+obj.title+'</div>'+
							'<div class="txt nowrap">'+obj.description+'</div>'
						+'</div>'
					+'</a>';
					$('.about_box .row3 .bd').append(_html);
				});
			});
			$(this).parent('ul').slideUp();
		});
		
		$('#select_month li').click(function(e){ 
			e.stopPropagation();
			$(this).parent('ul').siblings('.sel_txt').find('span').html($(this).text());
			$(this).parent('ul').siblings('.sel_txt').find('i').html('');
			$(this).parents('.sel').removeClass('active')
			var select_year = $('#current_year').text();
			var select_month = $(this).attr("data-value");
			$.post('about.php',{"year":select_year,"month":select_month},function(result) {
				data = eval('('+result+')');
				$('.about_box .row3 .bd').empty();
				$.each(data,function(k,item){
					_html='<a href="'+item.url+'"  class="item ani">'+
						'<div class="wrap">'+
							'<div class="time ani">'+'<i class="iconfont ani"></i>'+'<div class="tb"><div class="tb_c"><span>'+item.day+'</span>'+item.year_month+'</div></div>'+'</div>'+
							'<div class="name ani">'+item.title+'</div>'+
							'<div class="txt nowrap">'+item.description+'</div>'
						+'</div>'
					+'</a>';
					$('.about_box .row3 .bd').append(_html);
				})
			});
			$(this).parent('ul').slideUp();
		});

		// $('.about_box .row3 .hd .sel_down').on('click','li',function(e){
		// 	e.stopPropagation();
		// 	$(this).parent('ul').siblings('.sel_txt').find('span').html($(this).text());
		// 	$(this).parent('ul').siblings('.sel_txt').find('i').html('');
		// 	$.post('about.php',function(){})
		// 	$(this).parent('ul').slideUp();
		// });
		$('.about_box .row3 .hd .sel').on('click',function(e){
			e.stopPropagation();
		});
		$(window).on('click',function(e){
			e.stopPropagation();
			if($('.about_box .row3 .hd .sel').hasClass('active')){
				$('.about_box .row3 .hd .sel_down').slideUp();
				$('.about_box .row3 .hd .sel').removeClass('active');
				$('.about_box .row3 .hd .sel').find('i').html('');
			}
		})

		new Particleground.wave('.about_box .row3 .bg', {
			num: 3,
			lineColor: ['rgba(255,255,255, .2)','rgba(255,255,255,.3)', 'rgba(255,255,255,.4)'],
			lineWidth: [.3,.5, .7, 1.5],
			offsetLeft: [parseInt(Math.random()*15+2),parseInt(Math.random()*15+2),parseInt(Math.random()*15+2),parseInt(Math.random()*15+2)],
			offsetTop: .5,
			crestHeight: [parseInt(Math.random()*30+30),parseInt(Math.random()*30+30), parseInt(Math.random()*30+30), parseInt(Math.random()*30+30)],
			rippleNum: 1.5,
			speed: .1/3,
			fill: false,
			stroke: true
		});
	}
}
var energy={
	row:function(){
		var ie=$(".ie");
		var win_wid=window.innerWidth;
		if(ie.length>0||win_wid<800){}
		else{
			$('.sildemove').on('mousemove',function(e){
				if(e.clientX<(wind_w/2)){
					$(this).children('.energy_apply').eq(0).addClass('onmouse').siblings().removeClass('onmouse');
					$(this).prev().removeClass('color');
				}else{
					$(this).children('.energy_apply').eq(1).addClass('onmouse').siblings().removeClass('onmouse');
					$(this).prev().addClass('color');
				}

			});
		}
		
	}
}


var epc={
	slideImg:function(){
		var win_wid = window.innerWidth,
			num=5;
		if(win_wid<800){
			num=2;
		}
		$('.slide_wrap').bxSlider({
    		slideWidth: 500,
    		minSlides: 2,
    		maxSlides: 2,
			auto: true,
    		slideMargin: 20,
			pagerCustom: '#bx-pager'
		});
		$('.epc_slide_wrap').bxSlider({
    		slideWidth: 500,
			auto: true,
			minSlides: num,
    		maxSlides: num,
    		moveSlides: 1,
    		slideMargin: 0,
			pagerCustom: '#bx-pager',
		});
	},
	downBox:function(){
		$('.downTxt').on('click',function(){
			$(this).next('.downItem').show();
		});
		$(document).on('click','.downList',function(){
			var text=$(this).text();
			$(this).parents('.down_box').find('span').text(text);
			$(this).parents('.downItem').hide();
			
		});
		
		
	
		$(document).on('mouseleave','#sheng,.shi',function(){
			$(this).find('.downItem').hide();
		});
	}
}
var contact={
	row1:function(){
		$('.contact_box .row1 .bd .more').on('click',function(e){
			e.stopPropagation();
			$(this).parents('.box').find('.txt').slideToggle();
		});
		$('.contact_box .row1 .bd .file').on('click',function(e){
			$('#responds').html('请上传3M以内word文件');
			$("#jobid").val(this.id);
			e.stopPropagation();
			$('.pop .cv').slideDown();
		});
		$('.contact_box .row1 .bd .box').on('click',function(e){
			e.stopPropagation();
		});
		$('.pop .cv .box').on('click',function(e){
			e.stopPropagation();
		})
		$(window).on('click',function(){
			if($('.contact_box .row1 .bd .txt').css('display')=='block'){
				$('.contact_box .row1 .bd .txt').slideUp();
			}
			$('.pop .cv').slideUp();
		});
		$('.pop .cv .close').on('click',function(){
			$(this).parents('.cv').slideUp();
		});
	}
}
// 动画插件
function animated() {
	$('[firstactive]').each(function() {
		$tar = $(this).attr('firstactive');
		$(this).find($($tar)).eq(0).addClass('on');
	});
	$('[lastchild]').each(function(){
		$tar = $(this).attr('lastchild');
		$(this).find($($tar)).last().addClass('none');
	});
	$('[prefix]').each(function() {
		$prefix = $(this).attr('prefix');
		if($(this).attr('child')) {
			$child = $(this).attr('child');
			$(this).find($child).each(function(_i) {
				_i+=1;
				$(this).addClass($prefix).addClass($prefix+_i);
			});
		}else{
			$(this).each(function(_i) {
				_i+=1;
				$(this).addClass($prefix).addClass($prefix+_i);
			});
		}
	});
	$('[split]').each(function() {
		_temp = [];
		_html = '';
		$tar = $(this).attr('split');
		$text = $(this).text();
		for(i=0;i<$text.length;i++) {
			_temp.push($text.substring(i,i+1));
		}
		for(i=0;i<_temp.length;i++) {
			if(_temp[i]=="#") {
				_html += '<br />';
			}else {
				_html += '<'+$tar+'>'+_temp[i]+'</'+$tar+'>';
			}
		}
		$(this).html(_html);
	});
	$('[goto]').each(function() {
		$(this).on('click',function() {
			$tar = $(this).attr('goto');
			$("html,body").animate({scrollTop:$($tar).offset().top},1000);
		});
	});
	$('[vcenter]').each(function() {
		tar = $(this).attr('vcenter');
		_html = $(this).find(tar).prop('outerHTML');
		$(this).html('<table width="100%" height="100%"></table>');
		$(this).find('table').append('<td valign="middle">'+_html+'</td>');
	});
	$('[absovcenter]').each(function() {
		$target = $(this).attr('absovcenter');
		$position = $(this).css('position');
		if($position!='absolute'&&$position!='relative'&&$position!='fixed') {
			$(this).css({
				position: 'relative'
			});
		}
		$targetHeight = $(this).find($target).outerHeight();
		$(this).find($target).css({
			position: 'absolute',
			top: '50%',
			marginTop: -$targetHeight / 2
		});
	});
	$('[imgvcenter]').each(function() {
		tar = $(this).attr('imgvcenter');
		outheight =$(this).height();
		$(this).find(tar).load(function() {
			inheight = $(this).outerHeight();
			$(this).css({
				'margin-top': (outheight-inheight)/2
			});
		});
	});
	$('[eachdelay]').each(function() {
		delaytarget=$(this).attr('eachdelay');
		delaytime=$(this).attr('delaytime')/1000;
		if(typeof($(this).attr('delaystart'))!='undefined') {
			delay =  parseInt($(this).attr('delaystart')) / 1000;
		}else{
			delay = 0;
		}
		$(this).find(delaytarget).each(function() {
			$(this).css({
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
				'-o-animation-delay': delay + 's',
				'-moz-animation-delay': delay + 's'
			});
			delay+=delaytime;
		});
	});
	$('[hover]').each(function() {
		$(this).mouseenter(function() {
			animate = $(this).attr('hover');
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).addClass(animate+" animated");
			}else{
				$(this).addClass(animate+" animated");
			}
		});
		$(this).mouseleave(function() {
			animate = $(this).attr('hover');
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).removeClass(animate+" animated");
			}else{
				$(this).removeClass(animate+" animated");
			}
		});
	});
	$('[animate]').each(function() {
		animate = $(this).attr('animate');
		if(animate.indexOf(',')>=0){
			arr = animate.split(',');
		}else{
			arr = ["fadeIn","zoomIn","fadeInUp","fadeInRight","fadeInDown","fadeInLeft"];
		}
		$(this).attr('animateClass') ? animateClass = $(this).attr('animateClass') : animateClass= '';
		if($(this).attr('effect')){
			if(animate=="random"||animate.indexOf(',')>=0) {
				$(this).find($(this).attr('effect')).each(function() {
					random = Math.floor(Math.random()*(arr.length));
					random = arr[random];
					$(this).addClass(random+' animated '+animateClass);
				});
			}else{
				$(this).find($(this).attr('effect')).addClass(animate+' animated '+animateClass);
			}
		}else{
			$(this).addClass(animate+' animated '+animateClass);
		}
	});
	$('[reach]').each(function() {
		if($(document).scrollTop()+$(window).height()>=$(this).offset().top){
			animate = $(this).attr('reach');
			$(this).attr('animateClass') ? animateClass = $(this).attr('animateClass'): animateClass = '';
			if(animate.indexOf(',')>=0){
				arr = animate.split(',');
			}else{
				arr = ["fadeIn","zoomIn","fadeInUp","fadeInRight","fadeInDown","fadeInLeft"];
			}
			if($(this).attr("effect")){
				effectchild = $(this).attr("effect");
				$(this).find(effectchild).each(function() {
					if(animate=="random"||animate.indexOf(',')>=0) {
						random = Math.floor(Math.random()*(arr.length));
						random = arr[random];
						$(this).addClass(random+" animated "+animateClass);
					}else{
						$(this).addClass(animate+" animated "+animateClass);
					}
				});
				$(this).find(effectchild).css({
					'visibility': 'visible'
				});
			}else{
				$(this).addClass(animate+" animated "+animateClass);
				$(this).css({
					'visibility': 'visible'
				});
			}
			// $(this).removeAttr('reach');
		}
	});
	$(window).scroll(function() {
		topval = $(document).scrollTop();
		$('[reach]').each(function() {
			if(topval>$(this).offset().top-$(window).height()){
				animate = $(this).attr('reach');
				if($(this).attr("effect")){
					effectchild = $(this).attr("effect");
					$(this).find(effectchild).addClass(animate+" animated");
					$(this).find(effectchild).css({
						'visibility': 'visible'
					});
				}else{
					$(this).addClass(animate+" animated");
					$(this).css({
						'visibility': 'visible'
					});
				}
			}else{
				animate = $(this).attr('reach');
				if($(this).attr("effect")){
					effectchild = $(this).attr("effect");
					$(this).find(effectchild).removeClass(animate+" animated");
					$(this).find(effectchild).css({
						'visibility': 'hidden'
					});
				}else{
					$(this).removeClass(animate+" animated");
					$(this).css({
						'visibility': 'hidden'
					});
				}
			}
		});
	});
}
// eachdelay( $('.brand_row4') , '.item_li' , 300 );
// eachdelay(父级，子级，延迟毫秒)；
function eachdelay(obj,child,dltime) {
    i = 0;
    dl = dltime/ 1000;
    obj.find(child).each(function() {
        i+=dl;
        $(this).css({
            "animation-delay": i + 's',
            "-webkit-animation-delay": i + 's',
            "-mos-animation-delay": i + 's',
            "-ms-animation-delay": i + 's',
            "-o-animation-delay": i + 's'
        })
    });
}
// 分割插件
$.fn.forslide = function(_option) {
	_temp = ''; _html = '';
	var _setting = {
		item : '.item',
		step : 4,
		tagName: 'li',
		tagClass: '',
		clear: false,
		attr: '',
		callback: function() {}
	}
	$.extend(_setting,_option);
	o = this;
	_size = o.find(_setting.item).size();
	if(_setting.clear){ _clear='<div class="cl"></div>'; }else{ _clear=''; }
	if(_size>_setting.step){
		if(_size % _setting.step == 0){
			for(_i=0;_i<_size;_i++){
				_temp += o.find( _setting.item+':eq('+_i+')').prop('outerHTML');
				if((_i+1)% _setting.step == 0) {
					_html += '<'+_setting.tagName+' '+_setting.attr+' class="'+_setting.tagClass+'">' + _temp + _clear +  '</'+_setting.tagName+'>' ;
					_temp = '';
				}
			}
		}else{
			_page = Math.floor(_size/_setting.step);
			for(_i=0; _i<_size; _i++ ){
				_temp += o.find( _setting.item+':eq('+_i+')').prop('outerHTML');
				if((_i+1)%_setting.step==0&&_i+1<=_page*_setting.step){
					_html += '<'+_setting.tagName+' '+_setting.attr+' class="'+_setting.tagClass+'">' + _temp + _clear +  '</'+_setting.tagName+'>' ;
					_temp = '';
				}
			}
			_html += '<'+_setting.tagName+' '+_setting.attr+' class="'+_setting.tagClass+'">' + _temp  + _clear +  '</'+_setting.tagName+'>' ;
		}
	}else{
		_html += '<'+_setting.tagName+' '+_setting.attr+' class="'+_setting.tagClass+'">' + o.html() +  '</'+_setting.tagName+'>' ;
	}
	o.empty().append(_html);
	_setting.callback();
}
// 分割插件使用
// $('.row').forslide({
// 	item: '.item',
// 	step: 4,
// 	tagName: 'li',
// 	tagClass: 'animate fadeInUp',
// 	attr: ' eachdelay=".item" delaytime="100" animate="fadeInUp" effect=".item" ',
// 	callback: function() {
// 		alert($('.row li').size());
// 	}
// });




function feedback(){
    var name = $("#name").val();
    var company = $("#company").val();
    var tel = $("#tel").val();
    var email = $("#email").val();
    var message = $("#message").val();

	$.post('contact.php', {name: name,company: company,tel:tel,email:email,message:message}, function(data, textStatus){
		if(textStatus == "success"){
			
			
			data = eval('('+data+')');
			if(data.error){
				
				if(data.error.success){
					$('#tel').val('您的电话 :');
					//$('#email').val('您的邮箱 :');
					$('#email').text('您的邮箱 :');
					$("#message").html('留言内容 :').show(500);
					$('#respond_feedback').html('提交成功');
					$(':input').not(':hidden,:button').val('');
					$("#name").removeClass('no');
					$("#tel").removeClass('no');
					$("#email").removeClass('no');
					$("#message").removeClass('no');
					
					return false;
				}
				
				$("#respond").html('红框部分请重新输入').show(500);
				if(data.error.name){
					$("#name").addClass('no');
				}
				else{
					$("#name").html('').removeClass('no');
				}
				
				if(data.error.tel){
					$("#tel").addClass('no');
				}
				else{
					$("#tel").html('').removeClass('no');
				}
				
				if(data.error.email){
					$("#email").addClass('no');
				}
				else{
					$("#email").html('').removeClass('no');
				}
				
				if(data.error.message){
					$("#message").addClass('no');
				}
				else{
					$("#message").html('').removeClass('no');
				}
			}
			else{
				$("#respond").html('留言提交成功').show(500);
				
			}
			
			
		}
	});

    return false;
}





function feedback_service(){
    var project_title = $("#project_title").val();
    var name = $("#name").val();
    var tel = $("#tel").val();
    var message = $("#message").val();

	$.post('service.php', {name: name,project_title: project_title,tel:tel,message:message}, function(data, textStatus){
		if(textStatus == "success"){
			
			
			data = eval('('+data+')');
			if(data.error){
				
				if(data.error.success){
					$('#respond_feedback').html('提交成功');
					$(':input').not(':hidden,:button').val('');
					$("#name").removeClass('no');
					$("#tel").removeClass('no');
					$("#message").removeClass('no');
					return false;
				}
				
				$("#respond_feedback").html('红框部分请重新输入').show(500);
				if(data.error.name){
					$("#name").addClass('no');
				}
				else{
					$("#name").html('').removeClass('no');
				}
				
				if(data.error.tel){
					$("#tel").addClass('no');
				}
				else{
					$("#tel").html('').removeClass('no');
				}
	
				
				if(data.error.message){
					$("#message").addClass('no');
				}
				else{
					$("#message").html('存在问题').removeClass('no');
				}
			}
			else{
				$("#respond").html('留言提交成功').show(500);
				
			}
			
			
		}
	});

    return false;
}