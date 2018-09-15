use physics::{Body, Inertia};

#[derive(Serialize, Deserialize, Clone)]
pub struct PhysicsData {
  pub inertia: Inertia,
  pub body: Body,
}