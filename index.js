const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
function DrawCanvas(){
    ctx.fillStyle = 'rgba(0,0,0,0.20)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
clicked = false
posX = canvas.width / 2, posY = canvas.height / 2
class Object {
    constructor({position,velocity,size,radius,radians,color,lastMouse}){
        this.position = position
        this.velocity = velocity
        this.size = size
        this.radius = radius
        this.radians = radians
        this.color = color
        this.lastMouse = {x: this.position.x, y: this.position.y}
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }
    
    move(){
        this.radians += this.velocity
        this.lastMouse.x += (posX - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (posY - this.lastMouse.y) * 0.05;
        this.position.x = this.lastMouse.x + Math.cos(this.radians) * this.radius
        this.position.y = this.lastMouse.y + Math.sin(this.radians) * this.radius
    }
}
window.addEventListener("mousemove", (e)=>{
    if (e.clientX >= canvas.offsetLeft
        && e.clientX <= canvas.offsetLeft + canvas.offsetWidth
        && e.clientY >= canvas.offsetTop
        && e.clientY <= canvas.offsetTop + canvas.offsetHeight) {
            posX = e.clientX
            posY = e.clientY
    }
})
var objects = []
function spawnMeteor() {
    objects.push(moon = new Object({
        position: {
            x:posX,
            y:posY
        },
        velocity:0.04,
        size:Math.random() * 5 + 5,
        radius: Math.random() * 50 + 100,
        radians:0,
        color:`rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`
    }))
}
window.addEventListener("mousedown", ()=>{
    
    spawnMeteor()
})
const planet = new Object({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    velocity:0.04,
        size:10,
        radius: Math.random() * 10 + 100,
        radians:0,
        color:'rgba(150,50,50,1)'
})
function animate(){
    window.requestAnimationFrame(animate)
    DrawCanvas()
    planet.move()
    planet.draw()
    objects.forEach((element)=>{
        element.move()
        element.draw()
    })

}
animate()