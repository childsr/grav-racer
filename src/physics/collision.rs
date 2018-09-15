use physics::{PhysicsObject,Vec2};
use std::rc::Rc;

pub fn test_collision(body1: Rc<PhysicsObject>, body2: Rc<PhysicsObject>) -> bool {
  //broad phase
  let broad = {
    let dist = Vec2::dist(body1.pos(), body2.pos());
    dist < body1.radius() + body2.radius()
  };
  if broad {
    let mut colliding = false;
    for pt in body1.vertices() {
      if body2.test(pt) {
        colliding = true;
        break;
      }
    }
    if !colliding {
      for pt in body2.vertices() {
        if body1.test(pt) {
          colliding = true;
          break;
        }
      }
    }

    colliding
  } else {
    false
  }
}