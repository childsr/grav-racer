use vec2::Vec2;

#[derive(Serialize, Deserialize, Clone, Copy)]
pub struct Inertia {
  pub pos: Vec2,
  pub vel: Vec2,
}