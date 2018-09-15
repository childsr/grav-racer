use physics::{PhysicsObject, PhysicsData, Vec2};
use game::{G,THRUST,Input};

#[derive(Serialize, Deserialize, Clone)]
pub struct Ship {
  pub physics_data: PhysicsData,
  pub acc: f32,
}
impl PhysicsObject for Ship {
  fn test(&self, pt: Vec2) -> bool {
    self.physics_data.body.test(pt)
  }
  fn radius(&self) -> f32 {
    self.physics_data.body.radius
  }
  fn pos(&self) -> Vec2 {
    self.physics_data.inertia.pos
  }
  fn vel(&self) -> Vec2 {
    self.physics_data.inertia.vel
  }
  fn vertices(&self) -> Vec<Vec2> {
    self.physics_data.body.vertices.iter().cloned().collect()
  }
}
impl Ship {
  pub fn update(&mut self, dt: f32, input: Input) {
    let acc = {
      let thrust = if input.up { THRUST } else { 0.0 };
      Vec2 (0.0, thrust - G)
    };
    self.acc = acc.1;
    let vx = if input.right { 20.0 } else { 0.0 } - if input.left { 20.0 } else { 0.0 };
    self.physics_data.inertia.vel = Vec2 ( vx, self.vel().1 + self.acc * dt );
    self.physics_data.inertia.pos = self.pos() + self.vel().scale(dt) + acc.scale(0.5*dt*dt);
  }
  pub fn update_finished(&mut self, dt: f32, _input: Input) {
    self.physics_data.inertia.pos = self.pos() + self.vel().scale(dt);
  }
}