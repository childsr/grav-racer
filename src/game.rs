#![allow(unused_imports)]

use std::rc::Rc;
use vec2::Vec2;
use physics::{Ship, Asteroid, PhysicsObject, PhysicsData, test_collision};

pub const G: f32 = 15.0;
pub const TWR: f32 = 4.0;
pub const THRUST: f32 = G * TWR;
pub const CAMXMAX: f32 = 0.75;
pub const CAMXK: f32 = 0.5*CAMXMAX;
pub const CAMY_MAXD: f32 = 5.0;

pub type Camera = Vec2;

#[derive(Serialize, Deserialize)]
pub struct State {
  pub ship: Ship,
  pub level: Level,
  pub end: bool,
  pub time: f32,
  pub time0: f32,
  pub input: Input,
  pub cam: Camera,
  pub started: bool,
  pub finished: bool,
}
impl State {
  pub fn update(mut self, t: f32, dt: f32) -> State {
    if !self.started {
      if self.input.up {
        self.started = true;
        self.time0 = t;
        self.time = t;
      }
      self
    }
    else if self.finished {
      // if t - self.time0 > self.time + 3.0 { self.end = true; }
      self.update_ship_finished(dt).update_level(dt).update_cam()
    }
    else {
      self.time = t - self.time0;
      self.end = {
        let ship = self.ship.clone();
        let bound_collision = (ship.pos().0 - 3.0 < -self.level.width/2.0) ||
          (ship.pos().0 + 3.0 > self.level.width/2.0) ||
          (ship.pos().1 - 2.0 < 0.0);
        if bound_collision { true }
        else {
          let mut collision = false;
          for asteroid in self.level.asteroids.iter() {
            collision = test_collision(Rc::new(ship.clone()), Rc::new(asteroid.clone()));
            if collision { break; }
          }
          collision
        }
      };
      if self.ship.pos().1 + 3.0 > self.level.length {
        self.finished = true;
      }
      if self.end { self }
      else {
        self.update_ship(dt).update_level(dt).update_cam()
      }
    }
  }
  fn cam_pos(&self) -> Vec2 {
    Vec2 (
      self.camx(self.ship.pos().0),
      State::camy(self.ship.pos().1, self.ship.vel().1)
    )
  }
  fn camx(&self, ship_x: f32) -> f32 {
    sigmoid(CAMXK * self.level.width, ship_x)
  }
  fn camy(ship_y: f32, ship_vy: f32) -> f32 {
    // ship_y - sigmoid(CAMY_MAXD, ship_vy)
    ship_y - CAMY_MAXD *
      (2.0 / (1.0 + f32::powf(2.71828,-2.0*ship_vy/(8.0*CAMY_MAXD))) - 1.0) + 15.0
  }
  fn update_level(mut self, dt: f32) -> State {
      self.level.update(dt);
      self
  }
  fn update_ship(mut self, dt: f32) -> State {
    self.ship.update(dt, self.input);
    self
  }
  fn update_ship_finished(mut self, dt: f32) -> State {
    self.ship.update_finished(dt, self.input);
    self
  }
  fn update_cam(mut self) -> State {
    self.cam = self.cam_pos();
    self
  }
}

#[derive(Serialize, Deserialize)]
pub struct Level {
  pub asteroids: Vec<Asteroid>,
  pub length: f32,
  pub width: f32,
}
impl Level {
  fn update(&mut self, dt: f32) {
    for mut asteroid in &mut self.asteroids {
      if asteroid.pos().0 - asteroid.radius() <= -self.width / 2.0 ||
         asteroid.pos().0 + asteroid.radius() >= self.width / 2.0 {
        asteroid.physics_data.inertia.vel.0 = -asteroid.vel().0
      }
      asteroid.update(dt);
    }
  }
}

#[derive(Serialize, Deserialize, Copy, Clone)]
pub struct Input {
  pub left: bool,
  pub right: bool,
  pub up: bool,
  pub mouse_pos: Vec2
}

pub fn sigmoid(max_range: f32, x: f32) -> f32 {
  max_range * (2.0 / (1.0 + f32::powf(2.71828,-2.0*x/max_range)) - 1.0)
}
