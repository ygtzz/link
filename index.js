//Stage
class Stage{
    constructor(canvas){
        if(typeof canvas == 'string') canvas = document.getElementById(canvas);
        this.cvs = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.getAttribute('width');
        this.height = canvas.getAttribute('height');
    }
}

//Scene
class Scene{
    constructor(stage){
        this.stage = stage;
        this.nodes = [];
    }
    add(node){
        node._scene = this;
        this.nodes.push(node);
        this.draw();
    }
    remove(node){
        this.nodes = this.nodes.filter(item => item != node);
        this.draw();
    }
    draw(){
        this.clean();

        let ctx = this.stage.ctx;
        this.nodes.forEach(item => {
            ctx.font = item.font;
            ctx.fillText(item.text ,item.x ,item.y); //设置文本内容
        })
    }
    clean(){
        let ctx = this.stage.ctx;
        ctx.clearRect(0,0,this.stage.width,this.stage.height);
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



