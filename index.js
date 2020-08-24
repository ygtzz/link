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
            ctx.save();
            if(item.rotate){
                this.rotate(ctx,item);
            }
            else{
                this.drawNode(ctx,item);
            }
            ctx.restore();
        })
    }
    drawNode(ctx,item,x,y){
        if(typeof x === 'undefined') x = item.x;
        if(typeof y === 'undefined') y = item.y;
        ctx.globalAlpha = item.alpha;
        ctx.scale(item.scaleX,item.scaleY);
        ctx.fillStyle = item.color || 'cornflowerblue';
        ctx.fillRect(x,y,item.width,item.height);
        // ctx.font = item.font;
        // ctx.fillText(item.text ,x,y); //设置文本内容
    }
    rotate(ctx,item) {
        let mx = item.x, my = item.y;
        ctx.translate(mx, my); // 将画布的原点移动到正中央
        ctx.rotate((Math.PI / 180) * item.rotate); // 弧度 = (Math.PI/180)*角度
        this.drawNode(ctx,item,0,0);
        ctx.translate(-mx, -my); // 将画布的原点还原
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
        // this.shape = '';
        this.x = 0;
        this.y = 0;
        this.width = 35;
        this.height = 35;
        this.text = text;
        this.font = '';
        this.fontColor = '';
        this.alpha = 1;
        this.rotate = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }
    setImage(url){

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



