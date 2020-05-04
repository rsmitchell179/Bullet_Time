class SunGlasses extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width + 100, Phaser.Math.Between(190, 250), 'sunglasses').setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        //this.setImmovable();
        //this.setFriction(0);                   
        this.body.onCollide = true;
        //this.scene = scene;
        this.velocity = velocity;
        this.body.setAllowGravity(false);
    }

    update(){
        super.update();

        // destroy SunGlasses if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}