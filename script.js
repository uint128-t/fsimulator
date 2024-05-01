import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


function shape(x,y,z,px,py,pz,c){
   let geometry = new THREE.BoxGeometry( x, y, z );
   let material = new THREE.MeshBasicMaterial( { color: c } );
   let cube = new THREE.Mesh( geometry, material );
   scene.add( cube );
   cube.position.x = px
   cube.position.y = py
   cube.position.z = pz
   return cube
}
let bd = shape(4,20,4,0,0,-100,0xaaaadd)


const g = new THREE.PlaneGeometry( 10000, 10000 );
const m = new THREE.MeshBasicMaterial( {color: 0xccffcc, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( g, m );
plane.rotation.x = 3.141592653589793238/2
scene.add( plane );


camera.position.y = 1;


const veld = document.getElementById("v")
const altd = document.getElementById("a")
const velb = document.getElementById("velb")
const altb = document.getElementById("altb")


var lt = 0
var hd = 0
var vd = 0
var speed = 0
var dir = 0
document.onmousemove = (p)=>{
   hd = p.pageX-window.innerWidth/2
   vd = p.pageY-window.innerHeight/2
}
function mainloop(time) {
   let tick = time-lt
   lt = time
   if (Number.isNaN(tick)){
       tick = 0
   }
   document.getElementById("inf").innerText=`FPS: ${Math.round(1000/tick)} Velocity: ${Math.round(speed*100)}   Tilt: ${Math.round(camera.rotation.z*180/3.1415926535)} Heading: ${Math.round(dir)} Height:${Math.round(camera.position.y)}`
   // camera.position.z-=tick/100
   camera.rotation.z-=hd*tick/1000000
   camera.rotation.x-=vd*tick/1000000


   dir+=camera.rotation.z*tick/1000


   camera.rotation.y = dir


   camera.position.z-=speed*Math.cos(dir)*tick/1000
   camera.position.x-=speed*Math.sin(dir)*tick/50


   speed = speed+tick/3000
   speed*=Math.pow(0.9995,tick/16)*(Math.max(0,1-Math.sin(camera.rotation.x/100)))


   camera.position.y+=speed*Math.sin(camera.rotation.x)*tick/100


   altd.innerText = Math.round(camera.position.y*10)
   veld.innerText = Math.round(speed*100)


   let ds = document.querySelectorAll(".hb")
   ds[0].setAttribute("text",speed*100-((speed*100)%10)+20)
   ds[1].setAttribute("text",speed*100-((speed*100)%10)+10)
   ds[2].setAttribute("text",speed*100-((speed*100)%10))
   ds[3].setAttribute("text",speed*100-((speed*100)%10)-10)
   velb.style.marginTop = `${4*((speed*100)%10)-5}px`
   ds[4].setAttribute("text",camera.position.y*10-((camera.position.y*10)%10)+20)
   ds[5].setAttribute("text",camera.position.y*10-((camera.position.y*10)%10)+10)
   ds[6].setAttribute("text",camera.position.y*10-((camera.position.y*10)%10))
   ds[7].setAttribute("text",camera.position.y*10-((camera.position.y*10)%10)-10)
   altb.style.marginTop = `${4*((camera.position.y*10)%10)-5}px`


   // you just phase through it thats so sad - gary


   renderer.render(scene,camera);
   requestAnimationFrame(mainloop);
}
mainloop();