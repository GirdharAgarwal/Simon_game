var colors=["red","blue","green","yellow"];
let userptn=new Array;
let ptn=new Array;
var level=0;
function playSound(clr)
{
    var audio=new Audio("sounds/"+clr+".mp3");
    audio.play();
}
function nextSequence()
{
    level++;
    $("#level-title").text("Level "+level);
    clr=colors[Math.floor((Math.random())*4)];
    playSound(clr);
    $("#"+clr).animate({opacity:0.5},'fast');
    setTimeout(function(){
        $("#"+clr).animate({opacity:1});
    },'fast');
    ptn.push(clr);
}
function gameover(){
    playSound("wrong");
    $("#level-title").html("Game Over<br>Press below to restart");
    if(level>=1)
    $("#result").text("Your Score - "+(level-1));
    else
    $("#result").text("Your Score - 0");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
}
$("#start").click(function(){
    level=0;
    nextSequence();
    $("#result").text("");
});
$("#end").click(function(){
    gameover();
    ptn.length=0;
    userptn.length=0;
    level=0;
});
$(".btn").click(function(){
    var userclr=this.id;
    $("#"+userclr).addClass("pressed");
    setTimeout(function(){
        $("#"+userclr).removeClass("pressed");
    },100);
    playSound(userclr);
    var j=userptn.length;
    userptn.push(userclr);
    if(userptn.length<=ptn.length)
    {
        var f=0;
        for(var i=j;i<userptn.length;i++)
        {
            if(userptn[i]!=ptn[i])
            {
                f=1;
                gameover();
                ptn.length=0;
                level=0;
                break;
            }
        }
        if(f==0)
        {
            if(userptn.length==ptn.length)
            {
                userptn.length=0;
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            userptn.length=0;
        }
    }
});