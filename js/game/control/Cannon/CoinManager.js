/**
 * Created by ILEOU on 17/11/8.
 */
define(['../../../plugins/three.min'],function (THREE) {
    var coinmanager = {};

    var physicsworld,renderworld,coins =[],unusedcoins = [],coincount = 0;
    var toRad = Math.PI/180;
    var prefabradius = 0.8,prefabheight = 0.3,resetheight = -5,
        prefabgeom = new THREE.CylinderBufferGeometry(prefabradius,prefabradius,prefabheight,20,1),
        prefabmat = new THREE.MeshStandardMaterial({color:'#0000ff',map: new THREE.TextureLoader().load('assets/coin.png')});
    var getcoincallback = null;
    function init(world,scene,count){
        physicsworld = world;
        renderworld = scene;

        var spancoin = function(){
            if(count <= 0){return;}
            var x = THREE.Math.randFloat(-4,4),
                y = THREE.Math.randFloat(5,10),
                z = THREE.Math.randFloat(2,4),
                pos = {x:x,y:y,z:z},
                rotx = THREE.Math.randFloat(0,360),
                roty = THREE.Math.randFloat(0,360),
                rotz = THREE.Math.randFloat(0,360),
                rot = {x:rotx,y:roty,z:rotz};
            addCoin(pos,rot);
            count --;
            setTimeout(spancoin,100);
        }
        spancoin();
    }

    function addCoin(pos,rot){
        if(unusedcoins.length > 0){
            var coin = unusedcoins.pop();
            coin.position.copy(pos);
            coin.rotation.set(rot.x*toRad,rot.y*toRad,rot.z*toRad);
            physicsworld.addBody(coin);
            coin.body.position.set(pos.x,pos.y,pos.z);
            var q = coin.quaternion;
            coin.body.quaternion.set(q.x,q.y,q.z, q.w);

            coin.visible = true;
            coins.push(coin);
            coincount++;
            return;
        }
        var coin = new THREE.Mesh(prefabgeom,prefabmat);
        coin.position.copy(pos);
        coin.rotation.set(rot.x*toRad,rot.y*toRad,rot.z*toRad);
        renderworld.add(coin);
        coins.push(coin);
        physicsworld.addBody(coin,{type:'cylinder',mass:1,pos:[pos.x,pos.y,pos.z],rot:[rot.x*toRad,rot.y*toRad,rot.z*toRad],size:[prefabradius,prefabradius,prefabheight],move:true});
        coincount ++;
    }
    function getCoin(mesh){
        mesh.visible = false;
        unusedcoins.push(mesh);
        physicsworld.removeBody(mesh);
        for(var i = 0;i<coincount;i++){
            if(coins[i] === mesh){
                coins.splice(i,1);
                break;
            }
        }

        coincount --;
        if(getcoincallback){
           getcoincallback();
        }
    }

    function clearCoins(){
        for(var i =0;i<coincount;i++){
            var mesh = coins[i];
            mesh.visible = false;
            unusedcoins.push(mesh);
            physicsworld.removeBody(mesh);
        }
        coins = [];
        coincount = 0;
    }

    function reset(count){
        var spancoin = function(){
            if(count <= 0){return;}
            var x = THREE.Math.randFloat(-4,4),
                y = THREE.Math.randFloat(5,10),
                z = THREE.Math.randFloat(2,4),
                pos = {x:x,y:y,z:z},
                rotx = THREE.Math.randFloat(0,360),
                roty = THREE.Math.randFloat(0,360),
                rotz = THREE.Math.randFloat(0,360),
                rot = {x:rotx,y:roty,z:rotz};
            addCoin(pos,rot);
            count --;
            setTimeout(spancoin,100);
        }
        spancoin();
    }
    function update(dt){

        var i = coincount;
        while(i > 0){
            var coin = coins[coincount-i];
            ///cannon
            if(isNaN(coin.body.position.x )){
                console.log(coin.body.id);
                i--;
                pause = true;
                continue;
            }
            coin.position.copy(coin.body.position);
            coin.quaternion.copy(coin.body.quaternion);
            if(coin.position.y < resetheight){
                getCoin(coin);
            }


            i--;
        }
        //console.log(coins[0].body.position.toString());
    }
    function setcoincallback(callback){
        getcoincallback = callback;
    }

    return  coinmanager.init = init,
            coinmanager.addCoin = addCoin,
            coinmanager.update = update,
            coinmanager.clearCoins = clearCoins,
            coinmanager.reset = reset,
            coinmanager.getcoin = setcoincallback,
            coinmanager;
});