/**
 * Created by ILEOU on 17/11/8.
 */
define(['../../../plugins/oimo.min'],function(OIMO){

    var physicsworld = {};
    var world;
    var divinfo;
    function createworld(opts){
        world = new OIMO.World(opts);

        divinfo = document.createElement('div');
        divinfo.style.position = "absolute";
        divinfo.style.right = '0%';
        divinfo.style.top = '0%';
        divinfo.style.display = 'none';
        document.body.appendChild(divinfo);
    }
    function addBody(mesh,opts){
        if(mesh.body){
            world.addRigidBody(mesh.body);
            return;
        }
        var body = world.add(opts);
        mesh.body = body;
    }
    function removeBody(mesh){
        world.removeRigidBody(mesh.body);
    }

    function init(opts){
        createworld(opts);
    }

    function update(dt){
        world.step();
        divinfo.innerHTML = world.getInfo();
    }
    return  physicsworld.init = init,
            physicsworld.addBody = addBody,
            physicsworld.removeBody = removeBody,
            physicsworld.update = update,
            physicsworld;
});