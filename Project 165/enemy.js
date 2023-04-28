AFRAME.registerComponent("enemy-fireballs", {
    init: function () {
        setInterval(this.shootEnemyFireballs, 5000)
    },
    shootEnemyFireballs: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //enemyFireballs entity
            var enemyFireballs = document.createElement("a-entity");

            enemyFireballs.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.9,
            });

            enemyFireballs.setAttribute("material", "color", "orange");

            var position = els[i].getAttribute("position")

            enemyFireballs.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyFireballs);

            //Three.js Vector Variables
            var position1=new THREE.Vector3();
            var position2=new THREE.Vector3();

            //Get enemey and player position using Three.js methods
            var enemy=els[i].object3D;
            var player=document.querySelector("#weapon").object3D; 
            player.getWorldPosition(position1);       
            enemy.getWorldPosition(position2);            

            //set the velocity and it's direction
            var direction=new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();
            
            //Set dynamic-body attribute
            enemyFireballs.setAttribute("velocity",direction.multiplyScalar(10))
            enemyFireballs.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0"
            });

            //Get text attribute
            var element=document.querySelector("#countLife");
            var playerLife=parseInt(element.getAttribute("text").value)

            //collide event on enemy fireballs
            enemyFireballs.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {
                    if(playerLife>0){
                        playerLife -= 1;
                        element.setAttribute("text",{
                            value:playerLife
                        });
                    };
                    if(playerLife<=0){
                        var text=document.querySelector("#over");
                        text.setAttribute("visible",true);
                        var tankEl=document.querySelectorAll(".enemy");
                        for (var i=0; i<tankEl.length; i++){
                            scene.removeChild(tankEl[i])
                        };
                    };                
                };
            });

        }
    },

});