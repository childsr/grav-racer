use std::ops::{Add,Sub};

#[derive(Debug, PartialEq, Copy, Clone, Serialize, Deserialize)]
pub struct Vec2(pub f32, pub f32);

impl Add for Vec2 {
  type Output = Vec2;

  fn add(self, other: Vec2) -> Vec2 {
    Vec2 (self.0 + other.0, self.1 + other.1)
  }
}
impl Sub for Vec2 {
  type Output = Vec2;

  fn sub(self, other: Vec2) -> Vec2 {
    Vec2 (self.0 - other.0, self.1 - other.1)
  }
}

impl Vec2 {
  pub fn scale(&self, s: f32) -> Vec2 {
    Vec2 (self.0*s, self.1*s)
  }
}

impl Vec2 {
  pub fn mag(self) -> f32 {
    self.0.hypot(self.1)
  }
  pub fn dist(self, other: Vec2) -> f32 {
    Vec2::mag(self - other)
  }
}