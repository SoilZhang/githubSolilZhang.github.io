$(function(){
    //����������
    var typeArr = [];
    //console.log(typeArr);
    $.ajax({
        url:'http://127.0.0.1:9900/api/nav',
        dataType:'json',
        success: function (data) {
            //console.log(data);
            $("<ul></ul>").appendTo(".th-nav");
            for(var i = 0 ; i < data.length; i++){
                if(i<data.length-2){
                    $("<li><a href='javascript:void(0)'>"+data[i].name+"</a></li>").appendTo($(".th-nav ul"));
                    //$("<li><a href='javascript:void(0)'>"+data[i].name+"</a></li>").appendTo($(".th-nav ul"));
                    //$("li").attr("index",i);
                }else{
                    $("<li><a target='_blank' href='"+data[i].sourceUrl+"'>"+data[i].name+"</a></li>").appendTo($(".th-nav ul"));
                }
                if(data[i].type != ""){
                    typeArr[i] = data[i].type;
                }
            }
        }
    })

    //��������Ʒ����
    $(".th-nav").on("mouseenter","li", function () {
        var $this = $(this);
        $.ajax({
            url:'http://127.0.0.1:9900/api/nav',
            dataType:"json",
            data:{
                type:typeArr[$this.index()]
            },
            success: function (data) {
                if(typeArr[$this.index()] != undefined){
                    $(".th-products").html(template("th-template",data));
                    $(".th-products").css({
                        "height":"230px",
                        "transition":"all 0.3s",
                        "opacity":1
                    });
                }else{
                    $(".th-products").css({
                        "height":"0px",
                        "transition":"all 0.3s",
                        "opacity":0
                    });
                }
            }
        })
    })
    $(".th-nav").on("mouseleave", function () {
        $(".th-products").css({
            "height":"0px",
            "transition":"all 0.3s",
            "opacity":0
        });
    })
    //����Ʒ�б����������¼�
    $(".th-products").on("mouseenter", function () {
        $(".th-products").css({
            "height":"230px",
            "transition":"all 0.3s",
            "opacity":1
        });
    })
    //����Ʒ�б����������¼�
    $(".th-products").on("mouseleave", function () {
        $(".th-products").css({
            "height":"0px",
            "transition":"all 0.3s",
            "opacity":0
        });
    })
    //�������ȡ�����¼�
    $(".th-search input").focus(function () {
        $(".th-search ul").fadeOut(500);
        $(".th-search input").css("border","1px solid orange");
        $(".th-search input").css("border-right","0");
        $(".th-search button").css("border","1px solid orange");
    })
    //������ʧȥ�����¼�
    $(".th-search input").blur(function () {
        if($(".th-search input").val() == ""){
            $(".th-search ul").fadeIn(500);
        }
        $(".th-search input").css("border","1px solid #ccc");
        $(".th-search input").css("border-right","0");
        $(".th-search button").css("border","1px solid #ccc");
    })

    $(".th-search button").mouseenter(function () {
        $(".th-search input").css("border","1px solid #666");
        $(".th-search input").css("border-right","0");
    })
    $(".th-search button").mouseleave(function () {
        $(".th-search input").css("border","1px solid #ccc");
        $(".th-search input").css("border-right","0");
    })
    //�ֲ���������
    //��¼ͼƬid
    var bannerId = [];
    $.ajax({
        url:'http://127.0.0.1:9900/api/lunbo',
        dataType:"json",
        success: function (data) {
            //console.log(data);
            for(var i = 0 ; i < data.length; i++){
                $(".tb-banner").append($('<div><a href='+data[i].sourceUrl+'><img src="'+data[i].imgUrl+'" alt=""/></a></div>'));
                bannerId[i]=data[i].id;
            }
            $(".tb-banner img").css("opacity",0);
            $(".tb-banner img").eq(0).css("opacity",1);
        }
    })

    //�ֲ���һ��ͼƬ����
    var imgIndex = 0;
    function nextImg() {
        if(imgIndex == 4){
            imgIndex = $(".tb-banner img").length-($(".tb-banner img").length+1);
        }
        imgIndex++;
        $(".tb-banner img").animate({
            "opacity":0
        },200);
        $(".tb-banner img").eq(imgIndex).animate({
            "opacity":1
        },200);
    }

    //�Ҽ�ͷ����¼�
    $(".arrow-r").on("click", function () {
        nextImg();
    })

    //���ͷ����¼�
    $(".arrow-l").on("click", function () {
        if(imgIndex == 0){
            imgIndex = $(".tb-banner img").length;
        }
        imgIndex--;
        $(".tb-banner img").animate({
            "opacity":0
        },200);
        $(".tb-banner img").eq(imgIndex).animate({
            "opacity":1
        },200);
    })
    //�Զ��ֲ�
    var timerId = setInterval(nextImg,3000);

    //��������¼�
    $(".tb-banner").mouseover(function () {
        clearInterval(timerId);
    })
    //����Ƴ��¼�
    $(".tb-banner").mouseout(function () {
        timerId = setInterval(nextImg,3000);
    })

    //Ŀ¼�б���������
    var categoryType = [];
    //console.log(categoryType);
    $.ajax({
        url:'http://127.0.0.1:9900/api/items',
        dataType:"json",
        success: function (data) {
            //console.log(data);
            $(".tb-category").append(template("tb-category-template",data));
            for(var i = 0 ; i < data.length; i++){
                categoryType[i] = data[i].type;
            }
        }
    })

    //Ŀ¼�����¼�����Ŀ¼�б��Ӧ��Ʒ
    $(".tb-category").on("mouseenter","li", function () {
        $(".tb-category-content").css("display","block");
        var $this = $(this);
        $.ajax({
            url:'http://127.0.0.1:9900/api/items',
            dataType:"json",
            data:{
                type:categoryType[$this.index()]
            },
            success: function (data) {
                $(".tb-category-content").html(template("cate-content-template",data))
                var num = Math.ceil(data.length/6);
                $(".tb-category-content").css("width",(235*num)+"px");
            }
        })
    })

    $(".tb-category").on("mouseleave", function () {
        $(".tb-category-content").css("display","none");
    })
    $(".tb-category-content").on("mouseenter", function () {
        $(".tb-category-content").css("display","block");
    })
    $(".tb-category-content").on("mouseleave", function () {
        $(".tb-category-content").css("display","none");
    })
    //����Ӳ��
    $.ajax({
        url:'http://127.0.0.1:9900/api/hardware',
        dataType:"json",
        success: function (data) {
            //console.log(data);
            $(".sh-content-right").append(template("sh-template",data));
            for(var i = 0 ; i < data.length; i++){
                if(data[i].discount != ""){
                    $(".sh-content-right li").eq(i).append('<span class="'+data[i].discountType+'">'+data[i].discount+'</span>')
                }
            }
        }
    })
    //����
    $.ajax({
        url:'http://127.0.0.1:9900/api/product',
        dataType:'json',
        data:{
            toptitle:"match"
        },
        success:function(data){
            //console.log(data);
            $('<h3>'+data.topTitleName+'</h3>').appendTo($(".accessories .ac-top"));
            $('<ul class=ac-sub></ul>').appendTo($(".accessories .ac-top"));
            for(var i = 0 ; i < data.subs.length; i++){
                $('<li>'+data.subs[i].name+'</li>').appendTo($(".accessories .ac-top ul"))
            }
            //����һ��li������ɫ
            $(".ac-sub li").eq(0).addClass("active");
            //��������¼���������ɫ�л�
            $(".ac-top li").mouseover(function () {
                $(".ac-sub li").removeClass("active");
                $(this).addClass("active");
            })

            //���Ĳ�ƷͼƬ
            for(var i = 0 ; i < data.leftGoods.length; i++){
                $('<li><a href="'+data.leftGoods[i].sourceUrl+'"><img src="'+data.leftGoods[i].imgUrl+'" alt=""/></a></li>').appendTo($(".ac-left-img"));
            }
            //�Ҳ�Ĳ�ƷͼƬ
            $(".ac-right").html(template("ac-template",data.hotgoods));

            //�ϲ�������key
            var arrKey = [];
            for(var i = 0 ; i < data.subs.length; i++){
                arrKey[i] = data.subs[i].key;
            }
            $(".ac-sub").on("mouseenter","li", function () {
                var $this = $(this);
                $.ajax({
                    url:'http://127.0.0.1:9900/api/product',
                    dataType:'json',
                    data:{
                        key:data.subs[$this.index()].key
                    },
                    success: function (data) {
                        console.log(data);
                        $(".ac-right").html(template("ac-template",data.datas));
                    }
                })
            })
        }
    })

    //���
    $.ajax({
        url:'http://127.0.0.1:9900/api/product',
        dataType:'json',
        data:{
            toptitle:"accessories"
        },
        success:function(data){
            //console.log(data);
            $('<h3>'+data.topTitleName+'</h3>').appendTo($(".match .ma-top"));
            $('<ul class=ma-sub></ul>').appendTo($(".match .ma-top"));
            for(var i = 0 ; i < data.subs.length; i++){
                $('<li>'+data.subs[i].name+'</li>').appendTo($(".match .ma-top ul"))
            }
            //����һ��li������ɫ
            $(".ma-sub li").eq(0).addClass("active");
            //��������¼���������ɫ�л�
            $(".ma-top li").mouseover(function () {
                $(".ma-sub li").removeClass("active");
                $(this).addClass("active");
            })

            //���Ĳ�ƷͼƬ
            for(var i = 0 ; i < data.leftGoods.length; i++){
                $('<li><a href="'+data.leftGoods[i].sourceUrl+'"><img src="'+data.leftGoods[i].imgUrl+'" alt=""/></a></li>').appendTo($(".ma-left-img"));
            }
            //�Ҳ�Ĳ�ƷͼƬ
            $(".ma-right").html(template("ac-template",data.hot));

            //�ϲ�������key
            var arrKey = [];
            for(var i = 0 ; i < data.subs.length; i++){
                arrKey[i] = data.subs[i].key;
            }
            $(".ma-sub").on("mouseenter","li", function () {
                var $this = $(this);
                $.ajax({
                    url:'http://127.0.0.1:9900/api/product',
                    dataType:'json',
                    data:{
                        key:data.subs[$this.index()].key
                    },
                    success: function (data) {
                        console.log(data);
                        $(".ma-right").html(template("ac-template",data.datas));
                    }
                })
            })
        }
    })

    //�ܱ�
    $.ajax({
        url:'http://127.0.0.1:9900/api/product',
        dataType:'json',
        data:{
            toptitle:"around"
        },
        success:function(data){
            //console.log(data);
            $('<h3>'+data.topTitleName+'</h3>').appendTo($(".hobby .ho-top"));
            $('<ul class=ho-sub></ul>').appendTo($(".hobby .ho-top"));
            for(var i = 0 ; i < data.subs.length; i++){
                $('<li>'+data.subs[i].name+'</li>').appendTo($(".hobby .ho-top ul"))
            }
            //����һ��li������ɫ
            $(".ho-sub li").eq(0).addClass("active");
            //��������¼���������ɫ�л�
            $(".ho-top li").mouseover(function () {
                $(".ho-sub li").removeClass("active");
                $(this).addClass("active");
            })

            //���Ĳ�ƷͼƬ
            for(var i = 0 ; i < data.leftGoods.length; i++){
                $('<li><a href="'+data.leftGoods[i].sourceUrl+'"><img src="'+data.leftGoods[i].imgUrl+'" alt=""/></a></li>').appendTo($(".ho-left-img"));
            }
            //�Ҳ�Ĳ�ƷͼƬ
            $(".ho-right").html(template("ac-template",data.hotcloths));

            //�ϲ�������key
            var arrKey = [];
            for(var i = 0 ; i < data.subs.length; i++){
                arrKey[i] = data.subs[i].key;
            }
            $(".ho-sub").on("mouseenter","li", function () {
                var $this = $(this);
                $.ajax({
                    url:'http://127.0.0.1:9900/api/product',
                    dataType:'json',
                    data:{
                        key:data.subs[$this.index()].key
                    },
                    success: function (data) {
                        console.log(data);
                        $(".ho-right").html(template("ac-template",data.datas));
                    }
                })
            })
        }
    })

    //Ϊ���Ƽ�
    for(var i = 0 ; i < 4; i++){
        $.ajax({
            url:'http://127.0.0.1:9900/api/recommend',
            dataType:"json",
            data:{
                page:i
            },
            success: function (data) {
                //console.log(data);
                $(".rec-content .container").append(template("rec-template",data));
            }
        })
    }

    //���Ҽ�ͷע�����¼�
    var indexUl = 0;
    $(".recommendation .arrow-right").on("click", function () {
        //console.log("����");
        if(indexUl == 3){
            return;
        }
        indexUl++;
        //console.log(indexUl);
        if(indexUl == 3){
            $(".recommendation .arrow-right").css("color","#ccc");
            //$(".recommendation .arrow-right").attr("class","disabled");
        }else{
            $(".recommendation .arrow-right").css("color","#666");
            $(".recommendation .arrow-left").css("color","#666");
        }
        var offsetX = -indexUl * $(".w").width();
        $(".container").animate({
            "left":offsetX
        },1000)
    })
    //�����ͷע�����¼�
    $(".recommendation .arrow-left").on("click", function () {
        //console.log("����");
        if(indexUl == 0){
            return;
        }
        indexUl--;
        if(indexUl == 0){
            $(".recommendation .arrow-left").css("color","#ccc");
        }else{
            $(".recommendation .arrow-right").css("color","#666");
            $(".recommendation .arrow-left").css("color","#666");
        }
        var offsetX = -indexUl * $(".w").width();
        $(".container").animate({
            "left":offsetX
        },1000)
        //console.log(indexUl);
    })

    //������Ʒ
    $.ajax({
        url:'http://127.0.0.1:9900/api/hotcomment',
        dataType:'json',
        success: function (data) {
            //console.log(data);
            $('<h3 class="hrt-title">'+data[0].title+'</h3>').appendTo($(".hot-reviews-top"));
            $(".hot-reviews-content").append(template("hr-template",data))
        }
    })

    //����
    $.ajax({
        url:'http://127.0.0.1:9900/api/content',
        dataType:"json",
        success: function (data) {
            $('<h3>'+data.title+'</h3>').appendTo($(".bc-top"));
            for(var i = 0 ; i < data.contents.length; i++){
                $('<div class="'+data.contents[i].type+'"><div class="title"><h4>'+data.contents[i].title+'</h4></div></div>').appendTo($(".bc-content"));
                $("."+data.contents[i].type).append(template("bc-template",data.contents[i]))
            }

            //��ʾ���Ҽ�ͷ
            $(".bc-content div").on("mouseenter", function () {
                $(this).find(".arrow i").css({
                    "opacity" : 1,
                    "transition":"all 0.6s"
                });
            })

            //�������Ҽ�ͷ
            $(".bc-content div").on("mouseleave", function () {
                $(this).find(".arrow i").css({
                    "opacity" : 0,
                    "transition":"all 0.6s"
                });
            })

            function changeImg(ele,index){
                //�Ҽ�ͷ����¼�-book
                var index = 0 
                $(".bc-content "+ele+" .arrow-right").on("click", function () {
                    if(index == 3){
                        return;
                    }

                    index++;
                    var moveWidth = -index * $(".bc-content li").width();
                    $(".bc-content "+ele+" ul").css({
                        "transform":"translateX("+moveWidth+"px)",
                        "transition":"all 0.5s"
                    })
                    $(".bc-content "+ele+" span").removeClass("active");
                    $(".bc-content "+ele+" span").eq(index).addClass("active");
                })

                //���ͷ����¼�-book
                $(".bc-content "+ele+" .arrow-left").on("click", function () {
                    if(index == 0){
                        return;
                    }
                    index--;
                    var moveWidth = -index * $(".bc-content li").width();
                    $(".bc-content "+ele+" ul").css({
                        "transform":"translateX("+moveWidth+"px)",
                        "transition":"all 0.5s"
                    })
                    $(".bc-content "+ele+" span").removeClass("active");
                    $(".bc-content "+ele+" span").eq(index).addClass("active");
                })

                //СԲ��
                var $lis = $(".bc-content "+ele+" li")
                for(var i = 0 ; i < $lis.length; i++){
                    $("<span></span>").appendTo($(ele+" .round-indicator"));
                }
                $(".bc-content .book span").eq(0).addClass("active");
                $(".bc-content .theme span").eq(0).addClass("active");
                $(".bc-content .game span").eq(0).addClass("active");
                $(".bc-content .app span").eq(0).addClass("active");
                $(".bc-content "+ele+" .round-indicator").on("click", "span", function () {
                    console.log(111);
                    $(".bc-content "+ele+" span").removeClass("active");
                    $(this).addClass("active");
                    var moveWidth = -$(this).index() * $(".bc-content li").width()
                    $(".bc-content "+ele+" ul").css({
                        "transform":"translateX("+moveWidth+"px)",
                        "transition":"all 0.5s"
                    })
                    index = $(this).index();
                })
            }   
            changeImg(".book","index_b");
            changeImg(".theme","index_t");
            changeImg(".game","index_g");
            changeImg(".app","index_a");
        }
    })

    //��Ƶ
    $.ajax({
        url:'http://127.0.0.1:9900/api/video',
        dataType:'json',
        success: function (data) {
            //console.log(data);
            $(".vi-content").append(template("vi-template",data));
        }
    })
})