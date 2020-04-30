class SunGlasses extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width, Phaser.Math.Between(50, 200), 'sunglasses').setOrigin(0,0);
        scene.add.existing(this);
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        this.setFriction(0);                   
        this.body.onCollide = true;
        this.newGlasses = true;                 // custom property to control bullet spawning
        this.scene = scene;
        this.velocity = velocity;
        this.body.setAllowGravity(false);
    }

    update(){
        super.update();

        // if(this.newGlasses && this.x < 0) {
        //     this.newGlasses = false;
        //     // call parent scene method from this context
        //     this.scene.addSunGlasses(this.parent, this.velocity);
        // }

        // destroy bullet if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}