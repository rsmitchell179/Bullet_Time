class BinaryNumbers extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width + 60, Phaser.Math.Between(190, 230), 'binarynumbers').setOrigin(0,0);
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

        // destroy BinaryNumbers if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}