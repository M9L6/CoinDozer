/**
 * Created by ILEOU on 17/11/8.
 */
define(['../../../plugins/three.min'],function(THREE){

    var staticmachine = {};
    var movebox,canmove = true;
    var limitzmin = -3,limitzmax = 2,movedir = 1,movespeed = 1;
    var raybox;
    function init(world,scene){

        var boxgeom = new THREE.BoxBufferGeometry(1,1,1,1,1,1),
            boxmat = new THREE.MeshStandardMaterial({color:"#ffffff"});
        var staticgroup = new THREE.Object3D();
        scene.add(staticgroup);
        var box = new THREE.Mesh(boxgeom,boxmat);
        raybox = box;
        var pos = new THREE.Vector3(0,6.5,0.5),
            scale = new THREE.Vector3(10,10,1);
        box.position.copy(pos);
        box.scale.copy(scale);
        staticgroup.add(box);
        world.addBody(box,{type:'box',pos:[pos.x,pos.y,pos.z],size:[scale.x,scale.y,scale.z],move:false,friction:0.8,restitution:0.1});

        box = new THREE.Mesh(boxgeom,boxmat);
        pos.set(0,0,5);
        scale.set(10,1,10);
        box.position.copy(pos);
        box.scale.copy(scale);
        staticgroup.add(box);
        world.addBody(box,{type:'box',pos:[pos.x,pos.y,pos.z],size:[scale.x,scale.y,scale.z],move:false,friction:0.8,restitution:0.1});



        box = new THREE.Mesh(boxgeom,boxmat);
        pos.set(-5.5,1.5,5);
        scale.set(1,4,10);
        box.position.copy(pos);
        box.scale.copy(scale);
        staticgroup.add(box);
        world.addBody(box,{type:'box',pos:[pos.x,pos.y,pos.z],size:[scale.x,scale.y,scale.z],move:false,friction:0.8,restitution:0.1});

        box = new THREE.Mesh(boxgeom,boxmat);
        pos.set(5.5,1.5,5);
        scale.set(1,4,10);
        box.position.copy(pos);
        box.scale.copy(scale);
        staticgroup.add(box);
        world.addBody(box,{type:'box',pos:[pos.x,pos.y,pos.z],size:[scale.x,scale.y,scale.z],move:false,friction:0.8,restitution:0.1});

        movebox = new THREE.Mesh(boxgeom,boxmat);
        pos.set(0,1,1);
        scale.set(10,1,8);
        movebox.position.copy(pos);
        movebox.scale.copy(scale);
        staticgroup.add(movebox);
        world.addBody(movebox,{type:'box',mass:0,pos:[pos.x,pos.y,pos.z],size:[scale.x,scale.y,scale.z],move:true,kinematic:true,friction:0.8,restitution:0.1});
    }
    function enablemove(){
        canmove = !canmove;
    }

    function update(dt){

        if(canmove){
            var z = movebox.position.z;
            movedir = z>limitzmax?-1:(z<limitzmin?1:movedir);
            movebox.position.z += movedir*movespeed*dt;
            movebox.body.setPosition(movebox.position);
        }
    }
    function getRayBox(){
        return raybox;
    }
    return  staticmachine.init = init,
            staticmachine.update = update,
            staticmachine.enablemove = enablemove,
            staticmachine.raybox = getRayBox,
            staticmachine;
});