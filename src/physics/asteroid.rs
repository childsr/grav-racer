use physics::{PhysicsObject, PhysicsData, Vec2};

#[derive(Serialize, Deserialize, Clone)]
pub struct Asteroid {
  pub physics_data: PhysicsData,
  pub id: usize,
}
impl PhysicsObject for Asteroid {
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

impl Asteroid {
  pub fn update(&mut self, dt: f32) {
    self.physics_data.inertia.pos = self.pos() + self.vel().scale(dt);
  }
}