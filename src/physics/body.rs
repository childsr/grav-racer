use vec2::Vec2;

// const PI: f32 = 3.14159;
const TAU: f32 = 6.28319;

fn angle_to(pt: &Vec2) -> f32 {
  (TAU + pt.1.atan2(pt.0)) % TAU
}
fn find_interval(thetas: &Vec<f32>, angle: f32) -> (usize, usize) {
  let last = thetas.len() - 1;
  if angle > thetas[last] {
    (last, 0)
  }
  else {
    let i0;
    let mut i1 = 0;
    loop {
      if angle <= thetas[i1] {
        i0 = if i1 == 0 {
          last
        } else {
          i1 - 1
        };
        break;
      }
      if i1 == last {
        i0 = last - 1;
        break;
      }
      i1 = i1 + 1;
    };
    (i0, i1)
  }
}
fn p_function(vertices: &Vec<Vec2>, theta: f32) -> f32 {
  let thetas: Vec<f32> = vertices.iter().map(|v| angle_to(v)).collect();
  let interval = find_interval(&thetas, theta);
  let Vec2 (x1, y1) = vertices[interval.0];
  let Vec2 (x2, y2) = vertices[interval.1];
  if x1 == x2 {
    x1 / theta.cos()
  } else {
    let m = (y1 - y2) / (x1 - x2);
    (y1 - m * x1) / (theta.sin() - m * theta.cos())
  }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Body {
  pub radius: f32,
  pub vertices: Vec<Vec2>,
}
impl Body {
  /*
    pub fn new(verts: Vec<Vec2>) -> Body {
      let vertices: Vec<Vec2> = verts.iter().cloned().collect();
      let radius = vertices.iter().cloned().map(|v| v.0.hypot(v.1)).fold(0.0, f32::max);
      Body {
        radius,
        vertices
      }
    }
  */
  pub fn test(&self, pt: Vec2) -> bool {
    let theta = angle_to(&pt);
    let dist = pt.0.hypot(pt.1);
    p_function(&self.vertices, theta) > dist
  }
}