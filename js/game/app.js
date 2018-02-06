define(['../plugins/three.min','./control/Control','../plugins/hammer.min','../plugins/stats'],function(THREE, Control, Hammer, Stats){

    var renderer,scene,camera,light;
    var hammer,stats;
    function init(){
        initrender();
        initInput();
        Control.init(scene,hammer,camera);

    }
    function initrender(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
        camera.position.set(0,10,30);
        camera.rotation.set(THREE.Math.degToRad(-10),0,0);
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio === 1 ? 1:2);
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.setClearColor('#ffffff',1.0);
        document.body.appendChild(renderer.domElement);

        light = new THREE.DirectionalLight('#ffffff',1.0);
        light.position.set(3,10,5);
        light.target.position.set(0,0,0);
        scene.add(light);

        stats = new Stats();
        document.body.appendChild(stats.dom);

    }
    function initInput(){
        var options = {
            recognizers:[
                [Hammer.Tap]
            ]
        };
        hammer = new Hammer(renderer.domElement,options);
        window.addEventListener('resize',resize,false);

    }

    var clock = new THREE.Clock();
    function loop(){
        stats.begin();

        var dt = clock.getDelta();
        dt = THREE.Math.clamp(dt,0,0.1);
        update(dt);

        stats.end();

        requestAnimationFrame(loop);
    }

    function update(dt){
        Control.update(dt);
        renderer.render(scene,camera);
    }

    function resize(){

        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(window.devicePixelRatio === 1 ? 1:2);
        renderer.setSize(window.innerWidth,window.innerHeight);
    }

    init();
    loop();

});
