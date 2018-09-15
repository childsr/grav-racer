use vec2::Vec2;
// use physics::{};

pub trait PhysicsObject {
  fn test(&self, pt: Vec2) -> bool;
  fn radius(&self) -> f32;
  fn pos(&self) -> Vec2;
  fn vel(&self) -> Vec2;
  fn vertices(&self) -> Vec<Vec2>;
}