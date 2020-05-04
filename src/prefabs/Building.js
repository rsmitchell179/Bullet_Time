class Building extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width +  Phaser.Math.Between(850, 900), Phaser.Math.Between(430, 500), 'building');
        scene.add.existing(this);
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        this.setFriction(0);                   
        this.newBuilding = true;                 // custom property to control bullet spawning
        this.scene = scene;
        this.velocity = velocity;
        this.body.setAllowGravity(false);
    }

    update(){
        super.update();

        if(this.newBuilding && this.x < centerX) {
            this.newBuilding = false;
            // call parent scene method from this context
            this.scene.addBuilding(this.parent, this.velocity);
        }

        // destroy building if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}