class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width + 100, Phaser.Math.Between(190, 260), 'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);
        this.setFriction(0);                   
        this.body.onCollide = true;
        this.newBullet = true;                 // custom property to control bullet spawning
        this.scene = scene;
        this.velocity = velocity;
        this.body.setAllowGravity(false);
    }

    update(){
        super.update();

        if(this.newBullet && this.x < -150) {
            this.newBullet = false;
            // call parent scene method from this context
            this.scene.addBullet(this.parent, this.velocity);
        }

        // destroy bullet if it reaches the left edge of the screen
        if(this.x < -151) {
            this.destroy();
        }
    }
}