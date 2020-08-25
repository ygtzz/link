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
        node._stage = this.stage;
        node._ctx = this.stage.ctx;
        this.nodes.push(node);
        //TODO debounce操作
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
            item.draw(ctx);
        })
    }
    clean(){
        let ctx = this.stage.ctx;
        ctx.clearRect(0,0,this.stage.width,this.stage.height);
    }
}

//NodeBase
class Shape{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 35;
        this.height = 35;
        this.color = 'cornflowerblue';
        this.alpha = 1;
        this.rotate = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }
    setLoc(x,y){
        this.x = x;
        this.y = y;
    }
    getLoc(){
        return [this.x,this.y];
    }
    draw(){
        console.log('draw shape');
    }
}

//Node
class Node{
    constructor(text){
        this.word = text;
    }
    setLoc(x,y){
        this.x = x;
        this.y = y;
    }
    setImage(url){
        this.url = url;
    }
    draw(ctx){
        ctx.save();
        if(this.rotate){
            this.rotate(ctx);
        }
        else{
            this.drawNode(ctx,x,y);
        }
        ctx.restore();
    }
    rotate(ctx) {
        let mx = this.x, my = this.y;
        ctx.translate(mx, my); // 将画布的原点移动到正中央
        ctx.rotate((Math.PI / 180) * this.rotate); // 弧度 = (Math.PI/180)*角度
        this.drawNode(ctx,0,0);
        ctx.translate(-mx, -my); // 将画布的原点还原
    }
    drawNode(ctx,x,y){
        if(typeof x === 'undefined') x = this.x;
        if(typeof y === 'undefined') y = this.y;
        ctx.globalAlpha = this.alpha;
        ctx.scale(this.scaleX,this.scaleY);
        
        this.shape = new NodeShape({
            _node: this,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            color: this.color,
            alpha: this.alpha,
            rotate: this.rotate,
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            url: this.url
        });
        this.text = new Text({
            _node: this,
            text: this.word,
            font: this.font,
            fontColor: this.fontColor
        });
        this.shape.draw(ctx,x,y);
        this.text.draw(ctx,x,y);
    }
}

class NodeShape extends Shape{
    constructor(opts){
        super();
        this._node = opts._node;
        //属性赋值
        nodeAssign(opts,this);
    }
    draw(ctx,x,y){
        //绘制图片
        if(this.url){
            this.drawImage(ctx,this.url);
        }
        else{
            //绘制矩形
            ctx.fillStyle = this.color;
            ctx.fillRect(x,y,this.width,this.height);
        }
    }
    drawImage(ctx,url){
        let self = this;
        let img = new Image();
        img.onload = function(){
            //绘制图片，并缩放至和shape一样大小
            ctx.drawImage(img,self.x,self.y,self.width,self.height);
        }
        img.src = url;
    }
}

//Link
class Link extends Shape{
    constructor(){

    }
}

//Text
class Text extends Shape{
    constructor(opts){
        super();
        this.text = 'defalut';
        this.font = '12px';
        this.fontColor = '#333';
        //属性赋值
        nodeAssign(opts,this);
    }
    draw(ctx,x,y){
        ctx.fillStyle = this.fontColor;
        ctx.font = this.font;
        let font = parseInt(this.font);
        if(isNaN(font)){
            font = 12;
        }
        let fontOffset = this.height + parseInt(this.font);
        ctx.fillText(this.text, x, y + fontOffset);
    }
}

//Group
class Group{
    constructor(){
        this.node = null;
        this.text = null;
    }
}
//Animate


function nodeAssign(opts,target){
     //属性赋值
     Object.keys(opts).forEach(k => {
        if(typeof opts[k] !== 'undefined'){
            target[k] = opts[k];
        }
    })
}

