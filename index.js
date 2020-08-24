//Stage
class Stage{
    constructor(canvas){
        if(typeof canvas == 'string') canvas = document.getElementById(canvas);
        this.cvs = canvas;
        this.ctx = canvas.getContext('2d');
    }
}

//Scene
class Scene{
    constructor(stage){
        this.stage = stage;
        this.nodes = [];
    }
    add(node){
        this.nodes.push(node);
        this.draw();
    }
    draw(){
        let ctx = this.stage.ctx;

        
        this.nodes.forEach(item => {
            ctx.font = item.font;
            ctx.fillText(item.text ,item.x ,item.y); //设置文本内容
        })
    }
}

//NodeBase
class Shape{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    setLoc(x,y){
        this.x = x;
        this.y = y;
    }
    getLoc(){
        return [this.x,this.y];
    }
}

//Node
class Node extends Shape{
    constructor(text){
        super();
        this.text = text;
        this.font = '';
        this.fontColor = '';
    }
}

//Link
class Link extends Shape{
    constructor(){

    }
}

//Text
class Text extends Shape{
    constructor(txt,font){
        this.txt = text;
        this.font = font;
    }
}

//Group

//Animate



