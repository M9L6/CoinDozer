/**
 * Created by ILEOU on 17/11/8.
 */
//define(['./Oimo/CoinManager','./Oimo/PhysicsWorld','./Oimo/StaticMachine','../../plugins/three.min'],function(CoinManager, PhysicsWorld, StaticMachine, THREE){
define(['./Cannon/CoinManager','./Cannon/PhysicsWorld','./Cannon/StaticMachine','../../plugins/three.min'],function(CoinManager, PhysicsWorld, StaticMachine, THREE){

        var control = {};
        var coincounts = 60;
        var input,raycamera,ray = new THREE.Raycaster(),clickpoint = new THREE.Vector2();
        var divinfo;
        function init(scene,hammer,camera){
            PhysicsWorld.init({worldscale:1,gravity:[0,-9.8,0],iterations:20,info:true});
            StaticMachine.init(PhysicsWorld,scene);
            CoinManager.init(PhysicsWorld,scene,30);
            CoinManager.getcoin(getCoin);

            hammer.on('tap',function(e){
                rayTest(e);
            });
            input = hammer;
            raycamera = camera;


        }

        function rayTest(e){
            if(coincounts <= 0)return;

            clickpoint.x = (e.center.x/window.innerWidth)*2-1;
            clickpoint.y = -(e.center.y/window.innerHeight)*2+1;
            console.log(clickpoint);
            ray.setFromCamera(clickpoint,raycamera);
            var intersects = ray.intersectObject(StaticMachine.raybox(),false);
            if ( intersects.length) {
                var rotx = THREE.Math.randFloat(0,360),
                    roty = THREE.Math.randFloat(0,360),
                    rotz = THREE.Math.randFloat(0,360),
                    rot = {x:rotx,y:roty,z:rotz};
                CoinManager.addCoin( intersects[0].point.add(new THREE.Vector3( 0, 0, 1.5 )),rot);
                coincounts --;
            }
        }

        function update(dt){
            PhysicsWorld.update(dt);
            StaticMachine.update(dt);
            CoinManager.update(dt);

        }

        function getCoin(){
            coincounts ++;
        }
        function getCoincount(){
            return coincounts;
        }

        return  control.coincounts = getCoincount,
            control.init = init,
            control.update = update,
            control;
})