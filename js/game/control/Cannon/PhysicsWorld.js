/**
 * Created by ILEOU on 17/11/8.
 */
define(['../../../plugins/cannon.min'],function(CANNON){

    var physicsworld = {};
    var world;
    function createworld(opts){
        console.log(CANNON);
        world = new CANNON.World();
        var gravity = opts.gravity || [0,0,0],
            iterations = opts.iterations || 10;
        world.gravity.set(gravity[0],gravity[1],gravity[2]);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = iterations;
        world.defaultContactMaterial.contactEquationStiffness = 1e7;
        world.defaultContactMaterial.contactEquationRelaxation = 10;
    }
    function addBody(mesh,opts){
        if(mesh.body){
            world.add(mesh.body);
            return;
        }
        var pos = opts.pos || [0,0,0],
            rot = opts.rot || [0,0,0];
        var body = new CANNON.Body({position:new CANNON.Vec3(pos[0],pos[1],pos[2]),quaternion:new CANNON.Quaternion().setFromEuler(rot[0],rot[1],rot[2])});
        var move = opts.move || false,
            kinematic = opts.kinematic || false;
        body.type = kinematic?CANNON.Body.KINEMATIC:(move?CANNON.Body.DYNAMIC:CANNON.Body.STATIC);
        body.mass = opts.mass || 0;

        var shape;
        var type = opts.type || 'box';

        switch(type){
                case 'box':
                    var size =  opts.size || [1,1,1],
                        halfExtents = new CANNON.Vec3(size[0]/2,size[1]/2,size[2]/2);
                    shape = new CANNON.Box(halfExtents);
                    break;
                case 'sphere':
                    var radius = opts.radius || 1;
                    shape = new CANNON.Sphere(radius);
                    break;
                case 'cylinder':
                    var size = opts.size || [1,1,1],segments = 10;
                    shape = new CANNON.Cylinder(size[0],size[1],size[2],segments);
                    var q = new CANNON.Quaternion();
                    q.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI / 2);
                    shape.transformAllPoints(new CANNON.Vec3(),q);
                    break;
        }
        body.addShape(shape);
        world.add(body);
        mesh.body = body;
        //console.log(body);
    }
    function removeBody(mesh){
        world.remove(mesh.body);
    }

    function init(opts){
        createworld(opts);
    }

    function update(dt){
        //dt = 1/60;
        world.step(dt);
    }
    return  physicsworld.init = init,
        physicsworld.addBody = addBody,
        physicsworld.removeBody = removeBody,
        physicsworld.update = update,
        physicsworld;
});